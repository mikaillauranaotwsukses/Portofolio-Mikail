import defaultPortfolio from '../data/portfolio.json'

// GET /api/portfolio
// Membaca data portfolio dari Supabase.
// Jika Supabase belum diset / data kosong → otomatis fallback ke defaultPortfolio lokal
export default defineEventHandler(async () => {
  const localData = defaultPortfolio
  const supabase = getSupabaseClient()

  // Jika environment variable Supabase belum diset di Vercel
  if (!supabase) {
    console.warn('[API] Supabase belum dikonfigurasi di Environment Variables. Menggunakan data lokal bawaan.')
    return localData
  }

  try {
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
