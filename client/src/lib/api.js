import { supabase, isSupabaseConfigured } from './supabaseClient.js';
import { listings as mockListings, users as mockUsers, categories as mockCategories } from './mockData.js';

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
        users!listings_seller_id_fkey (full_name, major, graduation_year, avg_rating),
        categories (name)
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
        users!listings_seller_id_fkey (full_name, major, graduation_year, avg_rating),
        categories (name)
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
        categories (name)
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
