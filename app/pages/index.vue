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

      <!-- Bio + Tech Stack -->
      <div class="md:col-span-8 flex flex-col gap-gutter">
        <div class="bg-surface-container-high border-4 border-black p-8 shadow-[8px_8px_0px_0px_#00e5f4] slide-in-up" style="animation-delay:0.15s">
          <p class="text-on-background text-body-md font-body-md leading-relaxed">
            {{ data.personal.bio }}
          </p>
        </div>

        <SectionsTechStackSection :data="data" />
      </div>
    </section>

    <!-- PREVIEW PROYEK -->
    <section>
      <div class="mb-8 flex justify-between items-end slide-in-up">
        <h2 class="text-headline-lg font-headline-lg text-secondary flex items-center gap-4 uppercase">
          <span class="bg-secondary text-on-secondary px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#53006f]">02</span>
          PROYEK TERBARU
        </h2>
        <NuxtLink
          to="/projects"
          class="text-label-sm font-label-sm text-on-surface-variant hover:text-primary uppercase flex items-center gap-2 transition-colors"
        >
          Lihat Semua <span class="material-symbols-outlined">trending_flat</span>
        </NuxtLink>
      </div>

      <SectionsProjectsGrid :projects="data.projects.slice(0, 2)" />
    </section>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { portfolioData as defaultData } from '~/data/portfolio.js'

// Ambil data dari API, fallback ke defaultData
const { data: _apiData } = await useAsyncData('portfolio-index', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)
</script>
