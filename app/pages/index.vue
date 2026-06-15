<template>
  <div class="space-y-24">

    <!-- =====================================================
         SECTION 1: HERO
         Animasi: glitch title, floating pixel decorations,
                  bouncing scroll arrow
         ===================================================== -->
    <section class="relative min-h-[500px] md:min-h-[580px] flex flex-col items-center justify-center text-center border-4 border-black bg-surface-container-low pulse-glow p-8 overflow-hidden">

      <!-- Latar belakang grid dekorasi -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <div class="grid grid-cols-12 h-full w-full">
          <div v-for="n in 24" :key="n" class="border-r border-b border-primary"></div>
        </div>
      </div>

      <!-- Floating Pixel Decorations (elemen melayang bergaya game) -->
      <div class="absolute top-6  left-8  w-5 h-5 bg-primary    border-2 border-black float"          style="animation-delay:0s"></div>
      <div class="absolute top-10 right-10 w-3 h-3 bg-secondary  border-2 border-black twinkle"        style="animation-delay:0.3s"></div>
      <div class="absolute top-24 left-16 w-4 h-4 bg-tertiary   border-2 border-black float-slow"     style="animation-delay:0.8s"></div>
      <div class="absolute bottom-16 right-8  w-5 h-5 bg-primary    border-2 border-black float-diagonal" style="animation-delay:1.2s"></div>
      <div class="absolute bottom-8  left-12  w-3 h-3 bg-tertiary   border-2 border-black twinkle-slow"   style="animation-delay:0.6s"></div>
      <div class="absolute top-32 right-24 w-2 h-2 bg-secondary  border-2 border-black float-reverse" style="animation-delay:1.5s"></div>
      <!-- Diamond shapes (rotated squares) -->
      <div class="absolute top-14  left-1/4  w-3 h-3 bg-primary/50  rotate-45 twinkle-fast"  style="animation-delay:0.2s"></div>
      <div class="absolute bottom-20 right-1/4 w-3 h-3 bg-tertiary/50 rotate-45 twinkle"     style="animation-delay:0.9s"></div>
      <div class="absolute top-1/2  left-6    w-2 h-2 bg-secondary/60 rotate-45 float"       style="animation-delay:2s"></div>

      <!-- Isi Hero -->
      <div class="relative z-10 space-y-6">
        <!-- Tagline -->
        <p class="text-tertiary font-label-sm text-label-sm uppercase tracking-widest bounce-in" style="animation-delay:0.1s">
          {{ data.hero.subtitle }}
        </p>

        <!-- Judul dengan Glitch Effect -->
        <h1
          class="text-display-lg font-display-lg text-primary uppercase leading-tight glitch bounce-in"
          :data-text="data.hero.title"
          style="animation-delay:0.2s"
        >
          {{ data.hero.title }}
        </h1>

        <!-- Deskripsi -->
        <p class="text-on-surface-variant font-body-md max-w-xl mx-auto text-sm leading-relaxed bounce-in" style="animation-delay:0.3s">
          {{ data.hero.description }}
        </p>

        <!-- Tombol CTA -->
        <div class="flex flex-col md:flex-row items-center justify-center gap-gutter pt-4 bounce-in" style="animation-delay:0.4s">
          <NuxtLink
            to="/projects"
            class="bg-primary-container text-on-primary-container px-10 py-4 border-4 border-black shadow-[6px_6px_0px_0px_#701c8e] hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#701c8e] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all inline-block font-headline-lg uppercase"
            @mousedown="onBtnClick"
          >
            <span class="flex items-center gap-2">
              <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">folder_open</span>
              {{ data.hero.ctaPrimary }}
            </span>
          </NuxtLink>
          <NuxtLink
            to="/about"
            class="text-on-background hover:text-tertiary font-label-sm text-label-sm uppercase flex items-center gap-2 transition-colors border-2 border-surface-container-highest px-6 py-4 hover:border-tertiary"
          >
            <span class="material-symbols-outlined">person</span>
            {{ data.hero.ctaSecondary }}
          </NuxtLink>
        </div>

        <!-- Blinking text -->
        <p class="pt-6 text-primary font-label-sm text-label-sm uppercase tracking-[0.5em] blink">
          ▼ Scroll to Continue ▼
        </p>
      </div>

      <!-- Bouncing scroll arrow di bawah -->
      <div class="absolute bottom-4 left-1/2 -translate-x-1/2 text-primary bounce-arrow">
        <span class="material-symbols-outlined text-3xl">keyboard_arrow_down</span>
      </div>
    </section>


    <!-- =====================================================
         SECTION 2: PROFIL SINGKAT
         Animasi: slide-in-up per kartu
         ===================================================== -->
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

        <div class="bg-surface-container-low border-4 border-black p-6 slide-in-up" style="animation-delay:0.2s">
          <h3 class="text-label-sm font-label-sm text-primary uppercase mb-4 flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">build</span>
            Teknologi yang Dikuasai
          </h3>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="(item, i) in data.techStack" :key="item"
              class="px-3 py-2 border-2 border-tertiary text-tertiary font-label-sm text-label-sm uppercase hover:bg-tertiary hover:text-on-tertiary cursor-default transition-all hover:-translate-y-1 hover:shadow-[2px_2px_0px_#00363a]"
              :style="{ animationDelay: (i * 0.05) + 's' }"
            >
              {{ item }}
            </span>
          </div>
        </div>
      </div>
    </section>


    <!-- =====================================================
         SECTION 3: PREVIEW PROYEK
         Animasi: slide-in-up stagger per kartu
         ===================================================== -->
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

      <div class="grid grid-cols-1 md:grid-cols-2 gap-gutter">
        <div
          v-for="(project, i) in data.projects.slice(0, 2)"
          :key="project.id"
          class="group bg-surface-container-low border-4 border-black hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all shadow-[8px_8px_0px_0px_#701c8e] overflow-hidden slide-in-up"
          :style="{ animationDelay: (i * 0.12) + 's' }"
        >
          <!-- Header -->
          <div class="bg-secondary-container p-3 border-b-4 border-black flex justify-between items-center">
            <div class="flex items-center gap-2">
              <span class="material-symbols-outlined text-on-secondary-container text-sm">{{ project.icon }}</span>
              <span class="text-on-secondary-container font-bold uppercase text-sm">{{ project.title }}</span>
            </div>
            <span class="text-on-secondary-container text-label-sm opacity-70">{{ project.subtitle }}</span>
          </div>
          <!-- Body -->
          <div class="p-6 space-y-4">
            <div class="h-40 bg-black border-2 border-surface-container-highest relative overflow-hidden flex items-center justify-center">
              <img
                v-if="project.imageUrl"
                :alt="project.title"
                class="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                :src="project.imageUrl"
              />
              <span v-else :class="['material-symbols-outlined text-6xl opacity-30 group-hover:opacity-70 transition-opacity float', project.iconColor]">{{ project.icon }}</span>
            </div>
            <p class="text-on-surface-variant text-sm font-body-md">{{ project.description }}</p>
            <div class="flex flex-wrap gap-2">
              <span
                v-for="tag in project.tags" :key="tag"
                class="text-[11px] px-2 py-1 border hover:scale-105 transition-transform cursor-default"
                :class="['border-' + project.tagColor, 'text-' + project.tagColor]"
              >{{ tag }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { portfolioData as data } from '~/data/portfolio.js'

// Shake effect saat klik tombol CTA
const onBtnClick = (e) => {
  const el = e.currentTarget
  el.classList.add('shake')
  setTimeout(() => el.classList.remove('shake'), 400)
}
</script>
