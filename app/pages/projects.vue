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


    <!-- =====================================================
         SECTION 2: GRID PROYEK
         Edit proyek di file portfolio.js > projects[]
         ===================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-12 gap-gutter">

      <!-- Loop semua proyek dari data (dengan stagger animation) -->
      <template v-for="(project, index) in data.projects" :key="project.id">

        <!-- Kartu LARGE (lebar penuh 12 kolom, layout landscape) -->
        <div
          v-if="project.size === 'large'"
          class="md:col-span-12 group bg-surface-container-low border-4 border-black hard-shadow overflow-hidden flex flex-col md:flex-row hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 slide-in-up"
          :style="{ animationDelay: (index * 0.1) + 's' }"
        >
          <!-- Gambar Proyek -->
          <div class="md:w-5/12 relative bg-surface-container-highest min-h-[220px] flex items-center justify-center overflow-hidden">
            <img
              v-if="project.imageUrl"
              :alt="project.title"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 absolute inset-0"
              :src="project.imageUrl"
            />
            <span v-if="!project.imageUrl" :class="['material-symbols-outlined text-8xl opacity-30 group-hover:opacity-60 transition-opacity float', project.iconColor]" :style="{ animationDelay: (index * 0.2) + 's' }">{{ project.icon }}</span>
          </div>

          <!-- Detail Proyek -->
          <div class="md:w-7/12 p-8 flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-3 mb-4" :class="project.iconColor">
                <span class="material-symbols-outlined text-3xl">{{ project.icon }}</span>
                <span class="font-label-sm uppercase tracking-widest">{{ project.subtitle }}</span>
              </div>
              <h2 class="font-headline-lg text-headline-lg text-on-background uppercase mb-4">{{ project.title }}</h2>
              <p class="text-on-surface-variant mb-6 text-sm">{{ project.description }}</p>
              <div class="flex flex-wrap gap-2 mb-8">
                <span 
                  v-for="tag in project.tags" :key="tag"
                  class="border-2 px-2 py-1 text-label-sm"
                  :class="['border-' + project.tagColor, 'text-' + project.tagColor]"
                >{{ tag }}</span>
              </div>
            </div>
            <button class="w-full md:w-auto border-2 border-primary text-primary py-3 px-8 font-bold uppercase hover:bg-primary hover:text-black transition-colors flex items-center justify-center gap-2">
              View_Details <span class="material-symbols-outlined">arrow_forward</span>
            </button>
          </div>
        </div>


        <!-- Kartu MEDIUM (6 kolom, layout portrait) -->
        <div
          v-else-if="project.size === 'medium'"
          class="md:col-span-6 group bg-surface-container-low border-4 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 flex flex-col slide-in-up"
          :style="{ animationDelay: (index * 0.1) + 's' }"
        >
          <!-- Gambar atau Ikon Header -->
          <div class="h-48 relative bg-surface-container-highest overflow-hidden flex items-center justify-center">
            <img
              v-if="project.imageUrl"
              :alt="project.title"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 absolute inset-0"
              :src="project.imageUrl"
            />
            <span :class="['material-symbols-outlined text-8xl opacity-30 group-hover:opacity-60 transition-opacity relative z-10 float', project.iconColor]" :style="{ animationDelay: (index * 0.15) + 's' }">{{ project.icon }}</span>
          </div>

          <!-- Detail Proyek -->
          <div class="p-6 flex-grow flex flex-col justify-between">
            <div>
              <div class="flex items-center gap-2 mb-2" :class="project.iconColor">
                <span class="material-symbols-outlined">{{ project.icon }}</span>
                <span class="text-label-sm uppercase">{{ project.subtitle }}</span>
              </div>
              <h3 class="font-headline-lg text-xl text-on-background uppercase mb-2">{{ project.title }}</h3>
              <p class="text-on-surface-variant text-sm mb-4 font-body-md">{{ project.description }}</p>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span 
                v-for="tag in project.tags" :key="tag"
                class="border-2 px-2 py-1 text-label-sm"
                :class="['border-' + project.tagColor, 'text-' + project.tagColor]"
              >{{ tag }}</span>
            </div>
          </div>
        </div>


        <!-- Kartu SMALL (4 kolom, layout compact) -->
        <div
          v-else
          class="md:col-span-4 group bg-surface-container-low border-4 border-black hard-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-75 p-6 flex flex-col justify-between slide-in-up"
          :style="{ animationDelay: (index * 0.1) + 's' }"
        >
          <div>
            <div class="flex items-center justify-between mb-4">
              <span class="material-symbols-outlined text-4xl group-hover:rotate-12 transition-transform duration-300" :class="project.iconColor">{{ project.icon }}</span>
              <span class="text-label-sm font-label-sm uppercase" :class="project.iconColor">{{ project.subtitle }}</span>
            </div>
            <h3 class="font-headline-lg text-xl text-on-background uppercase mb-2">{{ project.title }}</h3>
            <p class="text-on-surface-variant text-sm mb-6">{{ project.description }}</p>
          </div>
          <div class="flex flex-wrap gap-2">
            <span 
              v-for="tag in project.tags" :key="tag"
              class="bg-surface-container-highest px-2 py-1 text-label-sm"
            >{{ tag }}</span>
          </div>
        </div>

      </template>
    </section>


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
const { data: _apiData } = await useAsyncData('portfolio', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)

// ---- Logika Terminal Overlay ----
const isTerminalOpen = ref(false)
const terminalLines = ref([])
const terminalTyping = ref(false)

const openTerminal = () => {
  if (terminalTyping.value) return
  isTerminalOpen.value = true
  terminalTyping.value = true
  terminalLines.value = []
  
  // Teks yang muncul di terminal satu per satu
  const scriptText = [
    "> INITIALIZING_TERMINAL_SESSION...",
    "> ACCESSING_SECURE_PROTOCOLS...",
    "> ERROR: ACCESS_DENIED",
    "> REDIRECTING_TO_STAGING...",
    "> SYSTEM_HALT."
  ]
  
  let lineIndex = 0
  const typeNextLine = () => {
    if (lineIndex < scriptText.length) {
      terminalLines.value.push(scriptText[lineIndex])
      lineIndex++
      setTimeout(typeNextLine, 500)
    } else {
      setTimeout(() => {
        isTerminalOpen.value = false
        terminalTyping.value = false
      }, 1500)
    }
  }
  typeNextLine()
}
</script>
