import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// GET /api/portfolio
// Membaca data portfolio dari Supabase.
// Jika data kosong → otomatis seed dari portfolio.json lokal
export default defineEventHandler(async () => {
  const config   = useRuntimeConfig()
  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)

  // Baca file JSON lokal sebagai fallback/default
  const jsonPath   = resolve(process.cwd(), 'server/data/portfolio.json')
  const localData  = existsSync(jsonPath)
    ? JSON.parse(readFileSync(jsonPath, 'utf-8'))
    : null

  const { data, error } = await supabase
    .from('portfolio')
    .select('data')
    .eq('id', 1)
    .single()

  if (error) {
    console.error('[API] Gagal membaca dari Supabase:', error.message)
    // Fallback ke data lokal agar website tidak crash
    return localData
  }

  // Cek apakah data masih kosong (baru pertama kali / belum di-seed)
  const isEmpty = !data?.data || Object.keys(data.data).length === 0

  if (isEmpty && localData) {
    console.log('[API] Data Supabase kosong, mengisi dengan data default...')

    // Otomatis simpan data default ke Supabase (auto-seed)
    await supabase
      .from('portfolio')
      .upsert({ id: 1, data: localData, updated_at: new Date().toISOString() })

    return localData
  }

  return data.data
})
