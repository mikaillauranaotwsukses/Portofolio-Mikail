<template>
  <div class="crt-flicker">

    <!-- =====================================================
         JUDUL HALAMAN KONTAK
         ===================================================== -->
    <div class="text-center mb-12">
      <h1 class="text-display-lg font-display-lg text-primary mb-2 uppercase tracking-widest">
        Hubungi Saya
      </h1>
      <p class="text-on-surface-variant font-body-md text-sm">Kirim pesan langsung via formulir atau kontak email saya</p>
    </div>


    <!-- =====================================================
         LAYOUT UTAMA: FORM + SIDEBAR
         ===================================================== -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

      <!-- ---- FORM KONTAK (kiri) ---- -->
      <div class="md:col-span-8">
        <div class="bg-surface-container-low border-4 border-black shadow-[8px_8px_0px_0px_#701c8e] p-8 relative overflow-hidden">
          <!-- Judul Bar Form -->
          <div class="absolute top-0 left-0 w-full bg-secondary-container px-4 py-1 text-on-secondary font-bold text-label-sm uppercase flex items-center justify-between">
            <span>FORM KONTAK // EMAIL.JS</span>
            <span class="text-[10px] opacity-80 font-mono hidden sm:inline">STATUS: {{ isEmailjsReady ? 'READY' : 'STANDBY' }}</span>
          </div>
          
          <form class="mt-6 space-y-6" @submit.prevent="handleSubmit">

            <!-- Notifikasi Sukses -->
            <div v-if="submitState === 'success'" class="bg-green-950/70 border-4 border-green-500 p-4 text-green-300 space-y-2 font-mono text-xs">
              <div class="flex items-center gap-2 font-bold text-sm">
                <span class="material-symbols-outlined text-green-400">check_circle</span>
                PESAN BERHASIL TERKIRIM KE INBOX!
              </div>
              <p class="font-body-md">Terima kasih atas pesan Anda. Email telah diteruskan ke {{ ownerEmail }}. Saya akan segera membalasnya.</p>
            </div>

            <!-- Notifikasi Belum Dikonfigurasi -->
            <div v-else-if="submitState === 'not_configured'" class="bg-amber-950/70 border-4 border-amber-500 p-4 text-amber-200 space-y-3 font-mono text-xs">
              <div class="flex items-center gap-2 font-bold text-sm text-amber-400">
                <span class="material-symbols-outlined">warning</span>
                KREDENSIAL EMAILJS BELUM DIATUR
              </div>
              <p class="font-body-md text-on-surface-variant">
                Layanan EmailJS belum diaktifkan di Admin Panel (<code class="text-amber-300">Admin &gt; Kontak</code>) atau di <code class="text-amber-300">.env</code>.
                Anda dapat langsung membuka aplikasi email Anda untuk mengirim pesan ini sekarang:
              </p>
              <div class="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  class="bg-amber-500 text-black px-4 py-2 font-bold uppercase hover:bg-amber-400 transition-colors flex items-center gap-2 cursor-pointer"
                  @click="openDirectMailWithForm"
                >
                  <span class="material-symbols-outlined text-sm">mail</span>
                  Kirim Pesan Ini Lewat Email Client
                </button>
                <button
                  type="button"
                  class="border border-amber-500/60 text-amber-300 px-3 py-2 uppercase hover:bg-amber-500/20 transition-colors cursor-pointer"
                  @click="submitState = 'idle'"
                >
                  Kembali
                </button>
              </div>
            </div>

            <!-- Notifikasi Error -->
            <div v-else-if="submitState === 'error'" class="bg-red-950/70 border-4 border-red-500 p-4 text-red-200 space-y-3 font-mono text-xs">
              <div class="flex items-center gap-2 font-bold text-sm text-red-400">
                <span class="material-symbols-outlined">error</span>
                GAGAL MENGIRIM PESAN
              </div>
              <p class="font-body-md">{{ errorMessage }}</p>
              <div class="flex flex-wrap gap-2 pt-1">
                <button
                  type="button"
                  class="bg-red-500 text-black px-4 py-2 font-bold uppercase hover:bg-red-400 transition-colors flex items-center gap-2 cursor-pointer"
                  @click="openDirectMailWithForm"
                >
                  <span class="material-symbols-outlined text-sm">mail</span>
                  Kirim Pesan Ini Lewat Email Client
                </button>
                <button
                  type="button"
                  class="border border-red-500/60 text-red-300 px-3 py-2 uppercase hover:bg-red-500/20 transition-colors cursor-pointer"
                  @click="submitState = 'idle'"
                >
                  Coba Lagi
                </button>
              </div>
            </div>

            <!-- Field: Nama -->
            <div class="space-y-2">
              <label 
                class="block uppercase font-bold text-label-sm transition-colors duration-200"
                :class="focusedField === 'name' ? 'text-tertiary' : 'text-primary'"
              >
                Nama Anda
              </label>
              <input 
                v-model="form.name"
                class="w-full bg-background border-4 border-primary-container text-on-background px-4 py-3 focus:outline-none focus:border-tertiary placeholder:text-surface-container-highest font-body-md" 
                placeholder="MASUKKAN NAMA..." 
                type="text"
                required
                :disabled="submitState === 'loading'"
                @focus="focusedField = 'name'"
                @blur="focusedField = null"
              />
            </div>

            <!-- Field: Email -->
            <div class="space-y-2">
              <label 
                class="block uppercase font-bold text-label-sm transition-colors duration-200"
                :class="focusedField === 'email' ? 'text-tertiary' : 'text-primary'"
              >
                Email Anda
              </label>
              <input 
                v-model="form.email"
                class="w-full bg-background border-4 border-primary-container text-on-background px-4 py-3 focus:outline-none focus:border-tertiary placeholder:text-surface-container-highest font-body-md" 
                placeholder="EMAIL@DOMAIN.COM" 
                type="email"
                required
                :disabled="submitState === 'loading'"
                @focus="focusedField = 'email'"
                @blur="focusedField = null"
              />
            </div>

            <!-- Field: Pesan -->
            <div class="space-y-2">
              <label 
                class="block uppercase font-bold text-label-sm transition-colors duration-200"
                :class="focusedField === 'message' ? 'text-tertiary' : 'text-primary'"
              >
                Pesan
              </label>
              <textarea 
                v-model="form.message"
                class="w-full bg-background border-4 border-primary-container text-on-background px-4 py-3 focus:outline-none focus:border-tertiary placeholder:text-surface-container-highest font-body-md resize-none" 
                placeholder="KETIK PESAN ANDA DI SINI..." 
                rows="5"
                required
                :disabled="submitState === 'loading'"
                @focus="focusedField = 'message'"
                @blur="focusedField = null"
              ></textarea>
            </div>

            <!-- Tombol Submit dengan State -->
            <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <div class="relative inline-block">
                <!-- Score Pop Notification -->
                <div
                  v-if="showScorePop"
                  class="score-pop absolute -top-3 left-1/2 -translate-x-1/2 text-tertiary font-bold text-label-sm uppercase whitespace-nowrap z-10 pointer-events-none"
                >
                  +100 PESAN TERKIRIM!
                </div>

                <button
                  class="w-full sm:w-auto bg-primary-container text-on-primary-container px-10 py-4 border-4 border-black shadow-[4px_4px_0px_0px_#701c8e] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold uppercase flex items-center justify-center gap-4 cursor-pointer select-none"
                  type="submit"
                  :disabled="submitState === 'loading'"
                  :class="{
                    'opacity-60 cursor-not-allowed translate-x-1 translate-y-1 shadow-none': submitState === 'loading',
                    'bg-green-500 text-black border-green-700': submitState === 'success'
                  }"
                >
                  <span v-if="submitState === 'idle' || submitState === 'not_configured' || submitState === 'error'" class="flex items-center gap-2">
                    <span class="material-symbols-outlined">send</span> KIRIM_PESAN
                  </span>
                  <span v-else-if="submitState === 'loading'" class="flex items-center gap-2">
                    <span class="material-symbols-outlined animate-spin">refresh</span> MENGIRIM VIA EMAILJS...
                  </span>
                  <span v-else-if="submitState === 'success'" class="flex items-center gap-2">
                    <span class="material-symbols-outlined">check_circle</span> TERKIRIM
                  </span>
                </button>
              </div>

              <!-- Quick Mailto link option -->
              <a
                :href="directMailtoLink"
                class="text-xs text-on-surface-variant hover:text-primary transition-colors flex items-center justify-center gap-1 py-2 font-mono uppercase cursor-pointer"
                :title="'Tulis langsung ke ' + ownerEmail"
              >
                <span class="material-symbols-outlined text-sm">open_in_new</span>
                Atau tulis via Email Client
              </a>
            </div>

          </form>
        </div>
      </div>


      <!-- ---- SIDEBAR (kanan) ---- -->
      <div class="md:col-span-4 space-y-8">

        <!-- KARTU EMAIL LANGSUNG (MAILTO) -->
        <div class="bg-surface-container-low border-4 border-black shadow-[8px_8px_0px_0px_#ffc485] p-6 space-y-4">
          <div class="bg-primary text-on-primary px-4 py-1 text-label-sm font-bold uppercase inline-flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">mail</span>
            Email Langsung
          </div>
          
          <p class="text-on-surface-variant text-sm font-body-md leading-relaxed">
            Ingin mengirim email langsung tanpa mengisi formulir? Tekan tombol di bawah untuk langsung membuka aplikasi email Anda:
          </p>

          <div class="bg-background border-2 border-surface-container-highest p-3 break-all font-mono text-xs text-primary">
            {{ ownerEmail }}
          </div>

          <div class="space-y-2">
            <!-- Tombol mailto yang langsung membuka aplikasi email client -->
            <a
              :href="directMailtoLink"
              class="w-full bg-primary-container text-on-primary-container py-3 px-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold uppercase text-label-sm flex items-center justify-center gap-2 cursor-pointer text-center select-none"
              :title="'Tulis email ke ' + ownerEmail"
            >
              <span class="material-symbols-outlined text-base">outgoing_mail</span>
              TULIS EMAIL KE SAYA
            </a>

            <!-- Tombol Salin Email -->
            <button
              type="button"
              class="w-full bg-surface-container text-on-surface py-2 px-4 border-2 border-surface-container-highest hover:border-primary transition-colors font-label-sm text-xs uppercase flex items-center justify-center gap-2 cursor-pointer"
              @click="copyEmail"
            >
              <span class="material-symbols-outlined text-sm">{{ isCopied ? 'check' : 'content_copy' }}</span>
              <span>{{ isCopied ? '✓ ALAMAT EMAIL TERSALIN' : 'SALIN ALAMAT EMAIL' }}</span>
            </button>
          </div>
        </div>

        <!-- Social Links -->
        <SectionsSocialSection :data="data" />

        <!-- Pesan Motivasi / Status Singkat -->
        <div class="bg-surface-container-low border-4 border-black p-6 space-y-3 shadow-[8px_8px_0px_0px_#00e5f4]">
          <div class="text-label-sm text-primary uppercase font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">info</span>
            Status Ketersediaan
          </div>
          <p class="text-on-surface-variant text-sm font-body-md leading-relaxed">
            Saat ini saya <span class="text-primary font-bold">TERSEDIA</span> untuk magang, kolaborasi proyek, dan kerja sama.
          </p>
          <div class="flex items-center gap-2 text-tertiary text-label-sm font-bold uppercase mt-2">
            <span class="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
            Merespons dalam 24 jam
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import emailjs from '@emailjs/browser'
import { portfolioData as defaultData } from '~/data/portfolio.js'

const runtimeConfig = useRuntimeConfig()

// Ambil data dari API, fallback ke defaultData
const { data: _apiData } = await useAsyncData('portfolio-contact', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)

// Helper resolve string / object
const resolveUrl = (item) => {
  if (!item) return ''
  return typeof item === 'string' ? item : (item.url ?? '')
}

// Alamat email pemilik portfolio (fallback: mikailcoding64@gmail.com)
const ownerEmail = computed(() => {
  const email = resolveUrl(data.value.social?.email)
  return email ? email.replace(/^mailto:/i, '').trim() : 'mikailcoding64@gmail.com'
})

// Subject default untuk email langsung
const defaultSubject = computed(() => {
  return data.value.contact?.directEmailSubject || 'Pesan dari Portfolio Website'
})

// Link mailto langsung
const directMailtoLink = computed(() => {
  return `mailto:${ownerEmail.value}?subject=${encodeURIComponent(defaultSubject.value)}`
})

// Cek apakah kredensial EmailJS tersedia
const getEmailjsCredentials = () => {
  const serviceId = data.value.contact?.emailjsServiceId || runtimeConfig.public?.emailjsServiceId || ''
  const templateId = data.value.contact?.emailjsTemplateId || runtimeConfig.public?.emailjsTemplateId || ''
  const publicKey = data.value.contact?.emailjsPublicKey || runtimeConfig.public?.emailjsPublicKey || ''
  return { serviceId, templateId, publicKey }
}

const isEmailjsReady = computed(() => {
  const { serviceId, templateId, publicKey } = getEmailjsCredentials()
  return Boolean(serviceId && templateId && publicKey)
})

// State Form
const focusedField = ref(null)
const submitState = ref('idle') // idle | loading | success | not_configured | error
const errorMessage = ref('')
const showScorePop = ref(false)
const isCopied = ref(false)

const form = ref({
  name: '',
  email: '',
  message: ''
})

// Salin email ke clipboard
const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText(ownerEmail.value)
    isCopied.value = true
    setTimeout(() => {
      isCopied.value = false
    }, 2500)
  } catch (err) {
    console.warn('Gagal menyalin:', err)
  }
}

// Buka email client dengan isi form yang sudah diketik
const openDirectMailWithForm = () => {
  const subject = encodeURIComponent(`Pesan dari ${form.value.name || 'Pengunjung Portfolio'}`)
  const bodyText = `${form.value.message || ''}\n\n---\nNama: ${form.value.name || '-'}\nEmail: ${form.value.email || '-'}`
  const body = encodeURIComponent(bodyText)
  window.location.href = `mailto:${ownerEmail.value}?subject=${subject}&body=${body}`
}

// Handler submit form via EmailJS
const handleSubmit = async () => {
  if (submitState.value === 'loading') return

  const { serviceId, templateId, publicKey } = getEmailjsCredentials()

  // Jika kredensial belum ada, arahkan ke opsi email client
  if (!serviceId || !templateId || !publicKey) {
    submitState.value = 'not_configured'
    return
  }

  submitState.value = 'loading'
  errorMessage.value = ''

  try {
    const templateParams = {
      name: form.value.name,
      from_name: form.value.name,
      user_name: form.value.name,
      email: form.value.email,
      from_email: form.value.email,
      user_email: form.value.email,
      reply_to: form.value.email,
      message: form.value.message,
      title: form.value.name ? `Pesan dari ${form.value.name}` : 'Pesan Baru Portfolio',
      subject: form.value.name ? `Pesan dari ${form.value.name}` : 'Pesan Baru Portfolio',
      time: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      date: new Date().toLocaleString('id-ID', { dateStyle: 'medium', timeStyle: 'short' }),
      to_name: data.value.personal?.name || 'Mikail',
      to_email: ownerEmail.value,
    }

    await emailjs.send(serviceId, templateId, templateParams, publicKey)

    submitState.value = 'success'
    showScorePop.value = true

    // Reset setelah sukses
    setTimeout(() => {
      submitState.value = 'idle'
      showScorePop.value = false
      form.value = { name: '', email: '', message: '' }
    }, 4000)

  } catch (err) {
    console.error('[EmailJS] Pengiriman gagal:', err)
    submitState.value = 'error'
    errorMessage.value = err?.text || err?.message || 'Terjadi kesalahan saat menghubungi layanan EmailJS.'
  }
}
</script>

<style scoped>
/* Animasi pop-up skor ala game */
.score-pop {
  animation: floatUpFade 1.5s ease-out forwards;
}

@keyframes floatUpFade {
  0% {
    opacity: 1;
    transform: translate(-50%, 0) scale(1);
  }
  50% {
    opacity: 1;
    transform: translate(-50%, -20px) scale(1.1);
  }
  100% {
    opacity: 0;
    transform: translate(-50%, -40px) scale(1);
  }
}
</style>
