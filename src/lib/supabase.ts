import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Utility function to get public URL with cache busting
export const getPublicUrl = (filePath: string) => {
  const { data } = supabase.storage
    .from('wish-images')
    .getPublicUrl(filePath)
  
  // Add cache busting parameter
  const url = new URL(data.publicUrl)
  url.searchParams.set('t', Date.now().toString())
  
  return url.toString()
}

export interface Wish {
  id: string
  name: string
  message: string
  headline?: string
  theme: string
  image_url?: string
  sender_name?: string
  sender_number?: string
  sender_image_url?: string
  signature?: string
  signature_number?: string
  message_type?: string
  created_at: string
}
