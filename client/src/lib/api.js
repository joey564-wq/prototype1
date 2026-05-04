import { supabase } from './supabaseClient.js';

// Listings API - using Supabase directly
export const listingsAPI = {
  getAll: async () => {
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
    const { data, error } = await supabase
      .from('listings')
      .insert([listingData])
      .select()
      .single();
    
    if (error) throw error;
    return data;
  },
  
  update: async (id, listingData) => {
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
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
    return { success: true };
  },
};
