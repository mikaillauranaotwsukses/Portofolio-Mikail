<template>
  <div class="pixel-grid min-h-screen">

    <!-- =====================================================
         SECTION 1: JUDUL HALAMAN PROYEK
         ===================================================== -->
    <section class="mb-16">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 class="font-display-lg text-display-lg text-primary uppercase mb-4">
            Proyek Saya
          </h1>
          <p class="max-w-2xl text-on-surface-variant font-body-md border-l-4 border-secondary-container pl-6 text-sm">
            Kumpulan proyek yang telah saya kerjakan selama masa studi.
          </p>
        </div>
        <div>
          <span class="bg-surface-container-high border-2 border-primary-container px-4 py-2 font-label-sm text-label-sm text-primary uppercase flex items-center gap-2">
            <span class="w-2 h-2 bg-primary animate-pulse"></span>
            {{ data.projects.length }} Proyek
          </span>
        </div>
      </div>
    </section>

    <!-- GRID PROYEK -->
    <SectionsProjectsGrid :projects="data.projects" />

    <!-- =====================================================
         TOMBOL TERMINAL MENGAMBANG (klik untuk efek terminal)
         ===================================================== -->
    <div 
      class="fixed bottom-8 right-8 w-16 h-16 bg-primary-container border-4 border-black hard-shadow flex items-center justify-center cursor-pointer hover:translate-x-1 hover:translate-y-1 hover:shadow-none active:translate-x-1 active:translate-y-1 active:shadow-none transition-all group z-50"
      @click="openTerminal"
    >
      <span class="material-symbols-outlined text-black text-3xl group-hover:rotate-12 transition-transform">terminal</span>
    </div>

    <!-- Modal Overlay Terminal -->
    <div 
      v-if="isTerminalOpen" 
      class="fixed inset-0 z-[110] bg-black flex items-center justify-center font-mono text-primary p-10 overflow-hidden cursor-pointer"
      @click="isTerminalOpen = false"
    >
      <div class="max-w-xl w-full space-y-3">
        <p class="text-xs text-primary/50 mb-4">[Klik di mana saja untuk menutup]</p>
        <div v-for="(line, index) in terminalLines" :key="index" class="text-lg font-bold">
          {{ line }}
        </div>
        <div v-if="terminalLines.length < 5" class="flex items-center">
          <span class="w-2.5 h-6 bg-primary blink ml-1 shrink-0"></span>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { portfolioData as defaultData } from '~/data/portfolio.js'

// Ambil data dari API, fallback ke defaultData
const { data: _apiData } = await useAsyncData('portfolio-projects', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)

// ---- Logika Terminal Overlay ----
const isTerminalOpen = ref(false)
const terminalLines = ref([])
const fullLines = [
  "> INITIALIZING PROJECT DATABASE...",
  "> LOADING ASSETS [OK]",
  "> CONNECTING TO MAINFRAME [OK]",
  "> DECRYPTING FILES...",
  "> ACCESS GRANTED."
]

const openTerminal = () => {
  isTerminalOpen.value = true
  terminalLines.value = []
  
  let i = 0
  const timer = setInterval(() => {
    if (i < fullLines.length) {
      terminalLines.value.push(fullLines[i])
      i++
    } else {
      clearInterval(timer)
    }
  }, 400)
}
</script>
