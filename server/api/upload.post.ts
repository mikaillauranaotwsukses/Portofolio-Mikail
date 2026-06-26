import { promises as fs } from 'fs'
import path from 'path'

export default defineEventHandler(async (event) => {
  try {
    const formData = await readMultipartFormData(event)
    
    if (!formData) {
      throw createError({ statusCode: 400, statusMessage: 'Tidak ada file yang dikirim.' })
    }

    // Temukan field dengan nama 'file'
    const file = formData.find(part => part.name === 'file')
    
    if (!file || !file.filename || !file.data) {
      throw createError({ statusCode: 400, statusMessage: 'Data file tidak ditemukan.' })
    }

    // Folder tujuan: public/uploads
    // Karena dijalankan di dalam Nitro, process.cwd() menunjuk ke root proyek nuxt
    const uploadDir = path.join(process.cwd(), 'public', 'uploads')
    
    // Pastikan folder uploads ada
    try {
      await fs.access(uploadDir)
    } catch {
      await fs.mkdir(uploadDir, { recursive: true })
    }

    // Buat nama file unik dan aman
    const timestamp = Date.now()
    const safeFilename = timestamp + '-' + file.filename.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filePath = path.join(uploadDir, safeFilename)

    // Simpan file
    await fs.writeFile(filePath, file.data)

    // Kembalikan URL path
    return {
      success: true,
      url: `/uploads/${safeFilename}`
    }

  } catch (error) {
    console.error('Error saat upload file:', error)
    throw createError({ 
      statusCode: error.statusCode || 500, 
      statusMessage: error.statusMessage || 'Gagal menyimpan file.' 
    })
  }
})
