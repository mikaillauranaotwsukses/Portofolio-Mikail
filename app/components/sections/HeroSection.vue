<template>
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
        {{ data.hero?.subtitle }}
      </p>

      <!-- Judul dengan Glitch Effect -->
      <h1
        class="text-display-lg font-display-lg text-primary uppercase leading-tight glitch bounce-in"
        :data-text="data.hero?.title"
        style="animation-delay:0.2s"
      >
        {{ data.hero?.title }}
      </h1>

      <!-- Deskripsi -->
      <p class="text-on-surface-variant font-body-md max-w-xl mx-auto text-sm leading-relaxed bounce-in" style="animation-delay:0.3s">
        {{ data.hero?.description }}
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
            {{ data.hero?.ctaPrimary }}
          </span>
        </NuxtLink>
        <NuxtLink
          to="/about"
          class="text-on-background hover:text-tertiary font-label-sm text-label-sm uppercase flex items-center gap-2 transition-colors border-2 border-surface-container-highest px-6 py-4 hover:border-tertiary"
        >
          <span class="material-symbols-outlined">person</span>
          {{ data.hero?.ctaSecondary }}
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
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})

// Shake effect saat klik tombol CTA
const onBtnClick = (e) => {
  const el = e.currentTarget
  el.classList.add('shake')
  setTimeout(() => el.classList.remove('shake'), 400)
}
</script>
