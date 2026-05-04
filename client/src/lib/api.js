import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { listings as mockListings, users as mockUsers, categories as mockCategories, favorites as mockFavorites, messages as mockMessages, conversations as mockConversations } from './mockData.js';

// Helper to enrich mock listings with user/category data
function enrichMockListings(listings) {
  return listings.map(listing => {
    const user = mockUsers.find(u => u.id === listing.seller_id);
    const category = mockCategories.find(c => c.id === listing.category_id);
    return {
      ...listing,
      users: user ? {
        full_name: user.full_name,
        major: user.major || '',
        graduation_year: user.graduation_year || '',
        avg_rating: user.avg_rating || 4.8
      } : null,
      categories: category ? { name: category.name } : null
    };
  });
}

// Listings API - uses Supabase when configured, falls back to mock data
// Messages API
export const favoritesAPI = {
  getByUser: async (userId) => {
    if (!isSupabaseConfigured) {
      const userFavs = mockFavorites.filter(f => f.user_id === parseInt(userId));
      const enriched = userFavs.map(f => {
        const listing = mockListings.find(l => l.id === f.listing_id);
        return { ...f, listings: listing ? enrichMockListings([listing])[0] : null };
      });
      return enriched;
    }

    const { data, error } = await supabase
      .from('favorites')
      .select('*, listings (*, users!listings_seller_id_fkey (*), categories (*))')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  },

  toggleFavorite: async (userId, listingId) => {
    if (!isSupabaseConfigured) {
      const exists = mockFavorites.find(f => f.user_id === parseInt(userId) && f.listing_id === parseInt(listingId));
      if (exists) {
        const idx = mockFavorites.indexOf(exists);
        if (idx > -1) mockFavorites.splice(idx, 1);
        return { favorited: false };
      }
      mockFavorites.push({ id: Date.now(), user_id: parseInt(userId), listing_id: parseInt(listingId), created_at: new Date().toISOString() });
      return { favorited: true };
    }

    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('listing_id', listingId)
      .maybeSingle();

    if (existing) {
      const { error } = await supabase.from('favorites').delete().eq('id', existing.id);
      if (error) throw error;
      return { favorited: false };
    }

    const { data, error } = await supabase
      .from('favorites')
      .insert([{ user_id: userId, listing_id: listingId }])
      .select()
      .single();

    if (error) throw error;
    return { favorited: true, ...data };
  },
};

// Messages API - conversations are derived from the messages table (no separate conversations table)
function makeConversationId(listingId, userA, userB) {
  const minId = Math.min(parseInt(userA), parseInt(userB));
  const maxId = Math.max(parseInt(userA), parseInt(userB));
  return `conv-${listingId}-${minId}-${maxId}`;
}

function parseConversationId(convId) {
  const parts = convId.split('-');
  if (parts.length !== 4 || parts[0] !== 'conv') return null;
  return { listingId: parseInt(parts[1]), userA: parseInt(parts[2]), userB: parseInt(parts[3]) };
}

export const messagesAPI = {
  sendMessage: async (senderId, recipientId, listingId, messageText) => {
    if (!isSupabaseConfigured) {
      console.log('Mock send message:', { senderId, recipientId, listingId, messageText });
      const newMsg = {
        id: Date.now(),
        sender_id: parseInt(senderId),
        recipient_id: parseInt(recipientId),
        listing_id: parseInt(listingId),
        message_text: messageText,
        created_at: new Date().toISOString()
      };
      mockMessages.push(newMsg);
      return newMsg;
    }

    const { data, error } = await supabase
      .from('messages')
      .insert([{ sender_id: senderId, recipient_id: recipientId, listing_id: listingId, message_text: messageText }])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  getConversations: async (userId) => {
    if (!isSupabaseConfigured) {
      const userConvs = mockConversations.filter(
        c => c.buyer_id === parseInt(userId) || c.seller_id === parseInt(userId)
      );
      return userConvs.map(c => {
        const otherId = c.buyer_id === parseInt(userId) ? c.seller_id : c.buyer_id;
        const otherUser = mockUsers.find(u => u.id === otherId);
        const listing = mockListings.find(l => l.id === c.listing_id);
        const convMessages = mockMessages.filter(m => m.conversation_id === c.id);
        const lastMessage = convMessages[convMessages.length - 1];
        return {
          id: c.id,
          conversation_id: `conv-${c.listing_id}-${Math.min(otherId, parseInt(userId))}-${Math.max(otherId, parseInt(userId))}`,
          listing_id: c.listing_id,
          other_user: otherUser || null,
          listing: listing ? enrichMockListings([listing])[0] : null,
          last_message: lastMessage || null,
          unread_count: 0,
        };
      });
    }

    const { data: msgs, error } = await supabase
      .from('messages')
      .select('*')
      .or(`sender_id.eq.${userId},recipient_id.eq.${userId}`)
      .order('created_at', { ascending: false });

    if (error) throw error;

    // Group by (listing_id, other_user)
    const groups = {};
    (msgs || []).forEach(m => {
      const otherId = m.sender_id === parseInt(userId) ? m.recipient_id : m.sender_id;
      const key = `${m.listing_id}-${Math.min(otherId, parseInt(userId))}-${Math.max(otherId, parseInt(userId))}`;
      if (!groups[key]) {
        groups[key] = { listing_id: m.listing_id, other_id: otherId, messages: [], last_message: m };
      }
      groups[key].messages.push(m);
    });

    const result = await Promise.all(
      Object.values(groups).map(async (g) => {
        const [{ data: users }, { data: listings }] = await Promise.all([
          supabase.from('users').select('id, full_name').eq('id', g.other_id).maybeSingle(),
          supabase.from('listings').select('*, users!listings_seller_id_fkey (*), categories (*)').eq('id', g.listing_id).maybeSingle(),
        ]);
        return {
          id: g.listing_id + '-' + g.other_id,
          conversation_id: makeConversationId(g.listing_id, userId, g.other_id),
          listing_id: g.listing_id,
          other_user: users || null,
          listing: listings || null,
          last_message: g.last_message,
          unread_count: 0,
        };
      })
    );

    return result;
  },

  getMessages: async (conversationId) => {
    if (!isSupabaseConfigured) {
      const parsed = parseConversationId(conversationId);
      if (!parsed) {
        // fallback: try to find by mock conversation id
        const mockConv = mockConversations.find(c => c.id === parseInt(conversationId));
        if (!mockConv) return [];
        return mockMessages
          .filter(m => m.conversation_id === mockConv.id)
          .sort((a, b) => new Date(a.sent_at || a.created_at) - new Date(b.sent_at || b.created_at));
      }
      const { listingId, userA, userB } = parsed;
      return mockMessages
        .filter(m => {
          const sid = parseInt(m.sender_id);
          const rid = parseInt(m.recipient_id || m.receiver_id);
          const lid = parseInt(m.listing_id);
          return lid === listingId && ((sid === userA && rid === userB) || (sid === userB && rid === userA));
        })
        .sort((a, b) => new Date(a.sent_at || a.created_at) - new Date(b.sent_at || b.created_at));
    }

    const parsed = parseConversationId(conversationId);
    if (!parsed) return [];
    const { listingId, userA, userB } = parsed;

    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('listing_id', listingId)
      .or(`and(sender_id.eq.${userA},recipient_id.eq.${userB}),and(sender_id.eq.${userB},recipient_id.eq.${userA})`)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data || [];
  },

  startConversation: async (buyerId, sellerId, listingId, initialMessage) => {
    const convId = makeConversationId(listingId, buyerId, sellerId);
    if (!isSupabaseConfigured) {
      // Check if mock conversation exists
      let mockConv = mockConversations.find(
        c => c.listing_id === parseInt(listingId) &&
          ((c.buyer_id === parseInt(buyerId) && c.seller_id === parseInt(sellerId)) ||
           (c.buyer_id === parseInt(sellerId) && c.seller_id === parseInt(buyerId)))
      );
      if (!mockConv) {
        mockConv = {
          id: mockConversations.length + 1,
          listing_id: parseInt(listingId),
          buyer_id: parseInt(buyerId),
          seller_id: parseInt(sellerId),
          created_at: new Date().toISOString()
        };
        mockConversations.push(mockConv);
      }
      if (initialMessage) {
        mockMessages.push({
          id: Date.now(),
          conversation_id: mockConv.id,
          sender_id: parseInt(buyerId),
          recipient_id: parseInt(sellerId),
          receiver_id: parseInt(sellerId),
          listing_id: parseInt(listingId),
          message_text: initialMessage,
          sent_at: new Date().toISOString(),
          created_at: new Date().toISOString()
        });
      }
      return { conversationId: convId, isNew: true };
    }

    const { data: existing } = await supabase
      .from('messages')
      .select('id')
      .eq('listing_id', listingId)
      .or(`and(sender_id.eq.${buyerId},recipient_id.eq.${sellerId}),and(sender_id.eq.${sellerId},recipient_id.eq.${buyerId})`)
      .maybeSingle();

    if (!existing && initialMessage) {
      await messagesAPI.sendMessage(buyerId, sellerId, listingId, initialMessage);
    }

    return { conversationId: convId, isNew: !existing };
  },
};

export const listingsAPI = {
  getAll: async () => {
    if (!isSupabaseConfigured) {
      console.log('Using mock data for getAll listings');
      const enriched = enrichMockListings(mockListings.filter(l => l.status === 'available'));
      return { listings: enriched };
    }
    
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        users!listings_seller_id_fkey (*),
        categories (*)
      `)
      .eq('status', 'available')
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { listings: data };
  },
  
  getById: async (id) => {
    if (!isSupabaseConfigured) {
      console.log('Using mock data for getById listing');
      const listing = mockListings.find(l => l.id === parseInt(id));
      if (!listing) throw new Error('Listing not found');
      const enriched = enrichMockListings([listing]);
      return enriched[0];
    }
    
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        users!listings_seller_id_fkey (*),
        categories (*)
      `)
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data;
  },
  
  getByUser: async (userId) => {
    if (!isSupabaseConfigured) {
      console.log('Using mock data for getByUser listings');
      const userListings = mockListings.filter(l => l.seller_id === parseInt(userId));
      const enriched = enrichMockListings(userListings);
      return { listings: enriched };
    }
    
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        categories (*)
      `)
      .eq('seller_id', userId)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return { listings: data };
  },
  
  create: async (listingData) => {
    if (!isSupabaseConfigured) {
      console.log('Mock create listing:', listingData);
      return { id: Date.now(), ...listingData };
    }
    
    const { data, error } = await supabase
      .from('listings')
      .insert([listingData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  update: async (id, listingData) => {
    if (!isSupabaseConfigured) {
      console.log('Mock update listing:', id, listingData);
      return { id, ...listingData };
    }
    
    const { data, error } = await supabase
      .from('listings')
      .update(listingData)
      .eq('id', id)
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  delete: async (id) => {
    if (!isSupabaseConfigured) {
      console.log('Mock delete listing:', id);
      return { success: true };
    }
    
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  },
};
