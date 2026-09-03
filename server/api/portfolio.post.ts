import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

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

  const supabase = createClient(config.supabaseUrl, config.supabaseServiceKey)

  // --- Aksi Reset ke Default ---
  if (action === 'reset') {
    // Baca data default dari file portfolio.json lokal
    const defaultPath = resolve(process.cwd(), 'server/data/portfolio.json')

    if (!existsSync(defaultPath)) {
      throw createError({ statusCode: 500, statusMessage: 'File default tidak ditemukan.' })
    }

    const defaultData = JSON.parse(readFileSync(defaultPath, 'utf-8'))

    const { error } = await supabase
      .from('portfolio')
      .upsert({ id: 1, data: defaultData, updated_at: new Date().toISOString() })

    if (error) {
      console.error('[API] Gagal reset ke Supabase:', error.message)
      throw createError({ statusCode: 500, statusMessage: 'Gagal mereset data.' })
    }

    return { success: true, message: 'Data berhasil direset ke default!' }
  }

  // --- Simpan Data Baru ---
  const { error } = await supabase
    .from('portfolio')
    .upsert({ id: 1, data: portfolioData, updated_at: new Date().toISOString() })

  if (error) {
    console.error('[API] Gagal menyimpan ke Supabase:', error.message)
    throw createError({ statusCode: 500, statusMessage: 'Gagal menyimpan data.' })
  }

  return { success: true, message: 'Data berhasil disimpan!' }
})
