import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// GET /api/portfolio
// Membaca data portfolio dari file JSON
export default defineEventHandler(() => {
  const dataPath    = resolve(process.cwd(), 'server/data/portfolio.json')
  const defaultPath = resolve(process.cwd(), 'server/data/portfolio.default.json')

  try {
    // Gunakan data utama jika ada, jika tidak pakai default
    const filePath = existsSync(dataPath) ? dataPath : defaultPath
    return JSON.parse(readFileSync(filePath, 'utf-8'))
  } catch (e) {
    console.error('[API] Gagal membaca portfolio.json:', e)
    throw createError({ statusCode: 500, statusMessage: 'Gagal membaca data portfolio' })
  }
})
