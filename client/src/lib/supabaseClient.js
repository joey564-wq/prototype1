import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

let supabase = null;

if (supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('your-project')) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
} else {
  console.warn('Supabase not configured: VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY environment variables are missing or contain placeholder values. Using mock data fallback.');
}

export { supabase };
export const isSupabaseConfigured = !!supabase;
