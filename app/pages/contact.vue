<template>
  <div class="crt-flicker">

    <!-- =====================================================
         JUDUL HALAMAN KONTAK
         ===================================================== -->
    <div class="text-center mb-12">
      <h1 class="text-display-lg font-display-lg text-primary mb-2 uppercase tracking-widest">
        Hubungi Saya
      </h1>
      <p class="text-on-surface-variant font-body-md text-sm">Kirim pesan dan saya akan membalas secepatnya</p>
    </div>


    <!-- =====================================================
         LAYOUT UTAMA: FORM + SIDEBAR
         ===================================================== -->
    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">

      <!-- ---- FORM KONTAK (kiri) ---- -->
      <div class="md:col-span-8">
        <div class="bg-surface-container-low border-4 border-black shadow-[8px_8px_0px_0px_#701c8e] p-8 relative overflow-hidden">
          <!-- Judul Bar Form -->
          <div class="absolute top-0 left-0 w-full bg-secondary-container px-4 py-1 text-on-secondary font-bold text-label-sm uppercase">
            FORM KONTAK
          </div>
          
          <form class="mt-6 space-y-6" @submit.prevent="handleSubmit">

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
                @focus="focusedField = 'message'"
                @blur="focusedField = null"
              ></textarea>
            </div>

            <!-- Tombol Submit dengan 3 State -->
            <div class="relative inline-block">
              <!-- Score Pop Notification -->
              <div
                v-if="showScorePop"
                class="score-pop absolute -top-2 left-1/2 -translate-x-1/2 text-tertiary font-bold text-label-sm uppercase whitespace-nowrap z-10"
              >
                +100 PESAN TERKIRIM!
              </div>

              <button
                class="w-full md:w-auto bg-primary-container text-on-primary-container px-10 py-4 border-4 border-black shadow-[4px_4px_0px_0px_#701c8e] hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold uppercase flex items-center justify-center gap-4 cursor-pointer select-none"
                type="submit"
                :disabled="submitState !== 'idle'"
                @mousedown="onSubmitClick"
              >
                <!-- State: Diam -->
                <template v-if="submitState === 'idle'">
                  <span class="material-symbols-outlined">send</span>
                  KIRIM PESAN
                </template>
                <!-- State: Uploading -->
                <template v-else-if="submitState === 'uploading'">
                  <span class="material-symbols-outlined animate-spin">sync</span>
                  MENGIRIM...
                </template>
                <!-- State: Sukses -->
                <template v-else-if="submitState === 'success'">
                  <span class="material-symbols-outlined text-green-400">check_circle</span>
                  BERHASIL TERKIRIM!
                </template>
              </button>
            </div>
          </form>
        </div>
      </div>


      <!-- ---- SIDEBAR (kanan) ---- -->
      <div class="md:col-span-4 space-y-8">

        <!-- Link Sosial Media -->
        <div class="bg-surface-container-low border-4 border-black shadow-[8px_8px_0px_0px_#00e5f4] p-6">
          <div class="bg-tertiary text-on-tertiary px-4 py-1 text-label-sm font-bold uppercase mb-4 inline-block">
            Social Links
          </div>
          <div class="flex flex-col gap-4">
            <!-- GitHub -->
            <a 
              :href="data.social.github" 
              target="_blank"
              class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-primary transition-colors cursor-pointer"
            >
              <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-primary transition-colors">
                <span class="material-symbols-outlined text-on-background group-hover:text-on-primary">terminal</span>
              </div>
              <div>
                <div class="text-label-sm font-bold text-tertiary uppercase">GitHub</div>
                <div class="text-label-sm text-surface-variant truncate">{{ data.social.github }}</div>
              </div>
            </a>

            <!-- LinkedIn -->
            <a 
              :href="data.social.linkedin" 
              target="_blank"
              class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-secondary transition-colors cursor-pointer"
            >
              <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-secondary transition-colors">
                <span class="material-symbols-outlined text-on-background group-hover:text-on-secondary">share</span>
              </div>
              <div>
                <div class="text-label-sm font-bold text-tertiary uppercase">LinkedIn</div>
                <div class="text-label-sm text-surface-variant truncate">{{ data.social.linkedin }}</div>
              </div>
            </a>

            <!-- Email -->
            <a 
              :href="'mailto:' + data.social.email"
              class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-tertiary transition-colors cursor-pointer"
            >
              <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-tertiary transition-colors">
                <span class="material-symbols-outlined text-on-background group-hover:text-on-tertiary">mail</span>
              </div>
              <div>
                <div class="text-label-sm font-bold text-tertiary uppercase">Email</div>
                <div class="text-label-sm text-surface-variant truncate">{{ data.social.email }}</div>
              </div>
            </a>
          </div>
        </div>

        <!-- Pesan Motivasi / Bio Singkat -->
        <div class="bg-surface-container-low border-4 border-black p-6 space-y-3">
          <div class="text-label-sm text-primary uppercase font-bold flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">info</span>
            Status
          </div>
          <p class="text-on-surface-variant text-sm font-body-md">
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
import { portfolioData as defaultData } from '~/data/portfolio.js'

// Ambil data dari API, fallback ke defaultData
const { data: _apiData } = await useAsyncData('portfolio', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)

// State form dan field aktif
const focusedField = ref(null)
const form = ref({ name: '', email: '', message: '' })
const submitState = ref('idle') // 'idle' | 'uploading' | 'success'
const showScorePop = ref(false)

// Shake effect saat klik tombol
const onSubmitClick = (e) => {
  const btn = e.currentTarget
  btn.classList.add('shake')
  setTimeout(() => btn.classList.remove('shake'), 400)
}

// Simulasi pengiriman form
const handleSubmit = () => {
  if (submitState.value !== 'idle') return

  submitState.value = 'uploading'

  setTimeout(() => {
    submitState.value = 'success'
    // Tampilkan score pop!
    showScorePop.value = true
    setTimeout(() => { showScorePop.value = false }, 1600)

    // Reset form setelah 2 detik
    setTimeout(() => {
      submitState.value = 'idle'
      form.value = { name: '', email: '', message: '' }
    }, 2000)
  }, 1500)
}
</script>
