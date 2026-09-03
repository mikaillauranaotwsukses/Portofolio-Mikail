import { createClient } from '@supabase/supabase-js'

/**
 * Membuat client Supabase dengan sanitasi otomatis URL dan Service Key.
 * Membersihkan newline, spasi, atau teks komentar (# ...) yang tidak sengaja ter-copy.
 */
export const getSupabaseClient = () => {
  const config = useRuntimeConfig()

  const rawUrl = config.supabaseUrl ? String(config.supabaseUrl) : ''
  const rawKey = config.supabaseServiceKey ? String(config.supabaseServiceKey) : ''

  // Ambil hanya baris pertama dan buang komentar atau spasi jika ada
  const url = rawUrl.split(/\r?\n/)[0].split('#')[0].trim()
  const key = rawKey.split(/\r?\n/)[0].split('#')[0].trim()

  if (!url || !key) {
    return null
  }

  return createClient(url, key)
}
