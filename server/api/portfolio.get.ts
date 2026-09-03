import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// GET /api/portfolio
// Membaca data portfolio dari Supabase.
// Jika data kosong atau Supabase belum diset → otomatis fallback ke portfolio.json lokal
export default defineEventHandler(async () => {
  const config = useRuntimeConfig()

  // Baca file JSON lokal sebagai fallback/default
  const jsonPath  = resolve(process.cwd(), 'server/data/portfolio.json')
  const localData = existsSync(jsonPath)
    ? JSON.parse(readFileSync(jsonPath, 'utf-8'))
    : null

  // Jika environment variable Supabase belum diset di Vercel
  if (!config.supabaseUrl || !config.supabaseServiceKey) {
    console.warn('[API] NUXT_SUPABASE_URL atau NUXT_SUPABASE_SERVICE_KEY belum diset di Vercel Environment Variables. Menggunakan data lokal.')
    return localData
  }

  try {
    const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)

    const { data, error } = await supabase
      .from('portfolio')
      .select('data')
      .eq('id', 1)
      .single()

    if (error) {
      console.error('[API] Gagal membaca dari Supabase:', error.message)
      return localData
    }

    const isEmpty = !data?.data || Object.keys(data.data).length === 0

    if (isEmpty && localData) {
      console.log('[API] Data Supabase kosong, mengisi dengan data default...')
      await supabase
        .from('portfolio')
        .upsert({ id: 1, data: localData, updated_at: new Date().toISOString() })

      return localData
    }

    return data.data
  } catch (err: any) {
    console.error('[API] Error saat fetch Supabase:', err.message)
    return localData
  }
})
