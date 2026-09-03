// POST /api/upload
// Upload file gambar ke Supabase Storage (bucket: uploads)
export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)

  if (!formData) {
    throw createError({ statusCode: 400, statusMessage: 'Tidak ada file yang dikirim.' })
  }

  // Cari field bernama 'file'
  const file = formData.find(part => part.name === 'file')

  if (!file || !file.filename || !file.data) {
    throw createError({ statusCode: 400, statusMessage: 'Data file tidak ditemukan.' })
  }

  // Cek ketersediaan config Supabase dengan auto-sanitasi
  const supabase = getSupabaseClient()
  if (!supabase) {
    throw createError({
      statusCode: 500,
      statusMessage: 'NUXT_SUPABASE_URL dan NUXT_SUPABASE_SERVICE_KEY belum diset dengan benar di Environment Variables!'
    })
  }

  const timestamp = Date.now()
  // Buat nama file aman dan unik
  const safeName = `${timestamp}-${file.filename.replace(/[^a-zA-Z0-9.-]/g, '_')}`

  // Upload ke Supabase Storage bucket 'uploads'
  const { error } = await supabase.storage
    .from('uploads')
    .upload(safeName, file.data, {
      contentType: file.type || 'image/jpeg',
      upsert: false,
    })

  if (error) {
    console.error('[API] Gagal upload ke Supabase Storage:', error.message)
    throw createError({ statusCode: 500, statusMessage: 'Gagal mengupload file: ' + error.message })
  }

  // Dapatkan URL publik gambar
  const { data: publicUrlData } = supabase.storage
    .from('uploads')
    .getPublicUrl(safeName)

  return {
    success: true,
    url: publicUrlData.publicUrl,
  }
})
