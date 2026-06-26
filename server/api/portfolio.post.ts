import { readFileSync, writeFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// POST /api/portfolio
// Menyimpan atau mereset data portfolio
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body   = await readBody(event)

  const { password, action, ...data } = body

  // --- Cek Password ---
  if (!password || password !== config.adminPassword) {
    throw createError({ statusCode: 401, statusMessage: 'Password salah! Akses ditolak.' })
  }

  const dataPath    = resolve(process.cwd(), 'server/data/portfolio.json')
  const defaultPath = resolve(process.cwd(), 'server/data/portfolio.default.json')

  // --- Aksi Reset ke Default ---
  if (action === 'reset') {
    if (!existsSync(defaultPath)) {
      throw createError({ statusCode: 500, statusMessage: 'File default tidak ditemukan.' })
    }
    const defaultData = readFileSync(defaultPath, 'utf-8')
    writeFileSync(dataPath, defaultData, 'utf-8')
    return { success: true, message: 'Data berhasil direset ke default!' }
  }

  // --- Simpan Data Baru ---
  try {
    writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf-8')
    return { success: true, message: 'Data berhasil disimpan!' }
  } catch (e) {
    console.error('[API] Gagal menulis portfolio.json:', e)
    throw createError({ statusCode: 500, statusMessage: 'Gagal menyimpan data.' })
  }
})
