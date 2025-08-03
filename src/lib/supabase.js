import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lziarqkobgwrzejpzlcj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Helper functions for common operations
export const auth = supabase.auth
export const storage = supabase.storage
