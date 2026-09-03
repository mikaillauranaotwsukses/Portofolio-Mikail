import defaultPortfolio from '../data/portfolio.json'

// POST /api/portfolio
// Menyimpan atau mereset data portfolio ke Supabase
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body   = await readBody(event)

  const { password, action, ...portfolioData } = body

  // --- Cek Password Admin ---
  if (!password || password !== config.adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Password salah! Akses ditolak.' })
  }

  // --- Aksi Verifikasi Password (Login) ---
  if (action === 'verify') {
    return { success: true, message: 'Password benar!' }
  }

  // --- Dapatkan Supabase Client (dengan auto-sanitasi key/url) ---
  const supabase = getSupabaseClient()
  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'NUXT_SUPABASE_URL dan NUXT_SUPABASE_SERVICE_KEY belum diset dengan benar di Environment Variables!'
    })
  }

  // --- Aksi Reset ke Default ---
  if (action === 'reset') {
    const { error } = await supabase
      .from('portfolio')
      .upsert({ id: 1, data: defaultPortfolio, updated_at: new Date().toISOString() })

    if (error) {
      console.error('[API] Gagal reset ke Supabase:', error.message)
      throw createError({ statusCode: 500, statusMessage: 'Gagal mereset data: ' + error.message })
    }

    return { success: true, message: 'Data berhasil direset ke default!' }
  }

  // --- Simpan Data Baru ---
  const { error } = await supabase
    .from('portfolio')
    .upsert({ id: 1, data: portfolioData, updated_at: new Date().toISOString() })

  if (error) {
    console.error('[API] Gagal menyimpan ke Supabase:', error.message)
    throw createError({ statusCode: 500, statusMessage: 'Gagal menyimpan data: ' + error.message })
  }

  return { success: true, message: 'Data berhasil disimpan!' }
})
