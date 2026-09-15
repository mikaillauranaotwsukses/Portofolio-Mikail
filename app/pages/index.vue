<template>
  <div class="space-y-24">

    <!-- HERO SECTION -->
    <SectionsHeroSection :data="data" />

    <!-- PROFIL SINGKAT -->
    <section class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-start">
      <div class="md:col-span-12 mb-2 slide-in-up" style="animation-delay:0s">
        <h2 class="text-headline-lg font-headline-lg text-tertiary flex items-center gap-4 uppercase">
          <span class="bg-tertiary text-on-tertiary px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#00363a]">01</span>
          TENTANG SAYA
        </h2>
      </div>

      <!-- Foto -->
      <div class="md:col-span-4 bg-surface-container-high border-4 border-black p-6 shadow-[8px_8px_0px_0px_#701c8e] slide-in-up" style="animation-delay:0.1s">
        <div class="aspect-square bg-surface-container-low border-4 border-black mb-6 relative overflow-hidden group">
          <img
            :alt="data.personal.name"
            class="w-full h-full object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-500"
            :src="data.personal.photoUrl"
          />
          <!-- Hover border flash -->
          <div class="absolute inset-0 border-4 border-transparent group-hover:border-primary transition-all pointer-events-none"></div>
        </div>
        <div class="space-y-3">
          <div class="border-b-2 border-surface-container-highest pb-3">
            <p class="text-label-sm font-label-sm text-on-surface-variant uppercase mb-1">Nama</p>
            <p class="text-primary font-bold uppercase text-lg">{{ data.personal.name }}</p>
          </div>
          <div class="border-b-2 border-surface-container-highest pb-3">
            <p class="text-label-sm font-label-sm text-on-surface-variant uppercase mb-1">Role</p>
            <p class="text-secondary font-bold">{{ data.personal.role }}</p>
          </div>
          <div>
            <p class="text-label-sm font-label-sm text-on-surface-variant uppercase mb-1">Status</p>
            <div class="flex items-center gap-2 text-tertiary font-bold text-label-sm">
              <span class="w-2 h-2 bg-tertiary rounded-full animate-pulse"></span>
              Tersedia
            </div>
          </div>
        </div>
      </div>

      <!-- Bio -->
      <div class="md:col-span-8 flex flex-col gap-gutter">
        <div class="bg-surface-container-high border-4 border-black p-8 shadow-[8px_8px_0px_0px_#00e5f4] slide-in-up" style="animation-delay:0.15s">
          <p class="text-on-background text-body-md font-body-md leading-relaxed">
            {{ data.personal.bio }}
          </p>
          <NuxtLink
            to="/about"
            class="inline-flex items-center gap-2 mt-6 text-label-sm font-label-sm text-tertiary border-2 border-tertiary px-4 py-2 hover:bg-tertiary hover:text-on-tertiary transition-all uppercase"
          >
            Selengkapnya <span class="material-symbols-outlined text-base">trending_flat</span>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- =====================================================
         SECTION 02: KEAHLIAN & TEKNOLOGI
         ===================================================== -->
    <section class="space-y-8" v-if="skillGroups.length > 0">
      <div class="mb-6 flex justify-between items-end slide-in-up">
        <h2 class="text-headline-lg font-headline-lg text-primary flex items-center gap-4 uppercase">
          <span class="bg-primary text-on-primary px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#ffc485]">02</span>
          KEAHLIAN &amp; TEKNOLOGI
        </h2>
        <span class="hidden sm:flex text-label-sm font-label-sm text-on-surface-variant font-mono items-center gap-2">
          <span class="w-2 h-2 bg-primary rounded-full animate-ping"></span>
          STACK_VERIFIED
        </span>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div
          v-for="group in skillGroups"
          :key="group.key"
          class="bg-surface-container border-4 border-black p-6 slide-in-up transition-all hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
          :style="{ boxShadow: '4px 4px 0px 0px ' + group.shadowColor }"
        >
          <!-- Category Header -->
          <div class="flex items-center justify-between mb-4 pb-3 border-b-2 border-surface-container-highest">
            <div class="flex items-center gap-3">
              <span
                class="w-8 h-8 border-2 border-black flex items-center justify-center font-bold text-xs"
                :class="group.badgeBg"
              >
                <span class="material-symbols-outlined text-base text-black">{{ group.icon }}</span>
              </span>
              <h3 class="font-headline-lg text-sm text-white uppercase tracking-wider font-bold">
                {{ group.label }}
              </h3>
            </div>
            <span class="text-[11px] font-mono px-2 py-0.5 border font-bold uppercase" :class="group.countClass">
              {{ group.items.length }} Skill
            </span>
          </div>

          <!-- Badges -->
          <div class="flex flex-wrap gap-2.5">
            <span
              v-for="item in group.items"
              :key="item"
              class="px-3 py-1.5 border-2 font-label-sm text-xs font-bold uppercase transition-all hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] cursor-default select-none"
              :class="group.tagClass"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- PREVIEW PROYEK -->
    <section>
      <div class="mb-8 flex justify-between items-end slide-in-up">
        <h2 class="text-headline-lg font-headline-lg text-secondary flex items-center gap-4 uppercase">
          <span class="bg-secondary text-on-secondary px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#53006f]">03</span>
          PROYEK TERBARU
        </h2>
        <NuxtLink
          to="/projects"
          class="text-label-sm font-label-sm text-on-surface-variant hover:text-primary uppercase flex items-center gap-2 transition-colors"
        >
          Lihat Semua <span class="material-symbols-outlined">trending_flat</span>
        </NuxtLink>
      </div>

      <SectionsProjectsGrid v-if="featuredProjects.length > 0" :projects="featuredProjects" />
      <div v-else class="text-center py-12 border-4 border-dashed border-surface-container-highest text-on-surface-variant font-mono">
        [ Belum ada proyek yang dipilih untuk ditampilkan di beranda ]
      </div>
    </section>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { portfolioData as defaultData } from '~/data/portfolio.js'

// Ambil data dari API, fallback ke defaultData
const { data: _apiData } = await useAsyncData('portfolio-index', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)

// Skills terstruktur dari database / CV
const skillGroups = computed(() => {
  const s = data.value?.skills || {}
  return [
    {
      key: 'languages',
      label: 'Bahasa Pemrograman',
      icon: 'terminal',
      badgeBg: 'bg-primary',
      shadowColor: '#ff9d00',
      countClass: 'border-primary text-primary',
      tagClass: 'border-primary text-primary bg-primary/10 hover:bg-primary/20',
      items: s.languages || []
    },
    {
      key: 'frameworks',
      label: 'Framework & Library',
      icon: 'code',
      badgeBg: 'bg-secondary',
      shadowColor: '#a855f7',
      countClass: 'border-secondary text-secondary',
      tagClass: 'border-secondary text-secondary bg-secondary/10 hover:bg-secondary/20',
      items: s.frameworks || []
    },
    {
      key: 'tools',
      label: 'Tools & Platform',
      icon: 'construction',
      badgeBg: 'bg-tertiary',
      shadowColor: '#00e5f4',
      countClass: 'border-tertiary text-tertiary',
      tagClass: 'border-tertiary text-tertiary bg-tertiary/10 hover:bg-tertiary/20',
      items: s.tools || []
    },
    {
      key: 'other',
      label: 'Keahlian Lainnya',
      icon: 'psychology',
      badgeBg: 'bg-emerald-400',
      shadowColor: '#22c55e',
      countClass: 'border-emerald-400 text-emerald-400',
      tagClass: 'border-emerald-400 text-emerald-300 bg-emerald-500/10 hover:bg-emerald-500/20',
      items: s.other || []
    }
  ].filter(g => g.items.length > 0)
})

// Filter proyek yang dipilih untuk ditampilkan di halaman beranda
const featuredProjects = computed(() => {
  const allProjects = data.value?.projects || []
  const hasConfig = allProjects.some(p => typeof p.showOnHome === 'boolean')
  if (hasConfig) {
    return allProjects.filter(p => p.showOnHome)
  }
  return allProjects.slice(0, 2)
})
</script>
