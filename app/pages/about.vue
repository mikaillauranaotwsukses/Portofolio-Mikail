<template>
  <div class="space-y-16">

    <!-- =====================================================
         SECTION 1: PROFIL + QUOTE
         ===================================================== -->
    <section class="bg-surface-container-high border-4 border-black p-8 shadow-[8px_8px_0px_0px_#00e5f4] slide-in-up">
      <blockquote class="text-primary font-headline-lg text-xl md:text-2xl uppercase mb-6 leading-tight">
        "You don't have to be great to start, but you have to start to be great."
      </blockquote>
      <p class="text-on-background font-body-md leading-relaxed">
        {{ data.personal.bio }} Selama perjalanan praktis dan akademis, saya telah mengeksplorasi Web &amp; Mobile App Development, UI/UX Design, hingga Internet of Things (IoT).
      </p>

      <!-- Stats -->
      <div class="flex gap-6 mt-8 flex-wrap">
        <div class="bg-surface-container border-4 border-black p-4 shadow-[4px_4px_0px_0px_#ffc485] text-center min-w-28">
          <p class="text-primary font-headline-lg text-3xl font-bold">10+</p>
          <p class="text-on-surface-variant text-label-sm font-label-sm uppercase mt-1">Proyek Dibangun</p>
        </div>
        <div class="bg-surface-container border-4 border-black p-4 shadow-[4px_4px_0px_0px_#eeb1ff] text-center min-w-28">
          <p class="text-secondary font-headline-lg text-3xl font-bold">3+</p>
          <p class="text-on-surface-variant text-label-sm font-label-sm uppercase mt-1">Tahun Belajar</p>
        </div>
      </div>
    </section>

    <!-- =====================================================
         SECTION 2: RIWAYAT PENDIDIKAN & PENGALAMAN
         Grid 2 kolom di layar besar
         ===================================================== -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">

      <!-- Kolom Kiri: Pendidikan -->
      <section class="space-y-6">
        <h2 class="text-headline-lg font-headline-lg text-primary uppercase flex items-center gap-3 slide-in-up">
          <span class="material-symbols-outlined text-3xl">school</span>
          Riwayat Pendidikan
        </h2>

        <div class="relative ml-4 border-l-4 border-dashed border-surface-container-highest pl-8 space-y-8 py-2">
          <div
            v-for="(item, i) in data.education"
            :key="item.institution"
            class="timeline-step relative bg-surface-container p-5 border-4 border-black hover:translate-x-2 transition-transform slide-in-up"
            :style="{
              boxShadow: '4px 4px 0px 0px ' + (colorMap[item.color] || '#ffc485'),
              animationDelay: (i * 0.12) + 's'
            }"
          >
            <!-- Dot on timeline -->
            <div
              class="absolute -left-12 top-5 w-4 h-4 border-4 border-black"
              :class="'bg-' + item.color"
            ></div>

            <div class="flex flex-wrap justify-between items-start gap-2 mb-2">
              <span class="font-label-sm text-label-sm text-on-surface-variant">{{ item.period }}</span>
              <span class="px-2 py-0.5 text-[11px] uppercase border font-bold" :class="['text-' + item.color, 'border-' + item.color]">
                {{ item.badge }}
              </span>
            </div>
            <h4 class="font-headline-lg text-base text-white uppercase mb-0.5">{{ item.institution }}</h4>
            <p class="text-on-surface-variant text-xs font-label-sm uppercase mb-2" v-if="item.subtitle">{{ item.subtitle }}</p>
            <p class="text-on-surface-variant font-body-md text-sm leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </section>

      <!-- Kolom Kanan: Pengalaman -->
      <section class="space-y-6">
        <h2 class="text-headline-lg font-headline-lg text-secondary uppercase flex items-center gap-3 slide-in-up">
          <span class="material-symbols-outlined text-3xl">work</span>
          Pengalaman & Organisasi
        </h2>

        <div class="relative ml-4 border-l-4 border-dashed border-surface-container-highest pl-8 space-y-8 py-2">
          <div
            v-for="(item, i) in data.experience"
            :key="item.institution + i"
            class="timeline-step relative bg-surface-container p-5 border-4 border-black hover:translate-x-2 transition-transform slide-in-up"
            :style="{
              boxShadow: '4px 4px 0px 0px ' + (colorMap[item.color] || '#00e5f4'),
              animationDelay: (i * 0.12) + 's'
            }"
          >
            <!-- Dot on timeline -->
            <div
              class="absolute -left-12 top-5 w-4 h-4 border-4 border-black"
              :class="'bg-' + item.color"
            ></div>

            <div class="flex flex-wrap justify-between items-start gap-2 mb-2">
              <span class="font-label-sm text-label-sm text-on-surface-variant">{{ item.period }}</span>
              <span class="px-2 py-0.5 text-[11px] uppercase border font-bold" :class="['text-' + item.color, 'border-' + item.color]">
                {{ item.badge }}
              </span>
            </div>
            <h4 class="font-headline-lg text-base text-white uppercase mb-0.5">{{ item.institution }}</h4>
            <p class="text-on-surface-variant text-xs font-label-sm uppercase mb-2" v-if="item.subtitle">{{ item.subtitle }}</p>
            <p class="text-on-surface-variant font-body-md text-sm leading-relaxed">{{ item.description }}</p>
          </div>
        </div>
      </section>

    </div>

    <!-- =====================================================
         SECTION 3: TERMINAL ANIMASI
         ===================================================== -->
    <section class="bg-black border-4 border-primary p-6 shadow-[12px_12px_0px_0px_#000] slide-in-up">
      <div class="flex gap-2 mb-4 border-b border-primary/30 pb-2">
        <div class="w-3 h-3 bg-red-500 rounded-full float-slow" style="animation-delay:0s"></div>
        <div class="w-3 h-3 bg-yellow-500 rounded-full float-slow" style="animation-delay:0.3s"></div>
        <div class="w-3 h-3 bg-green-500 rounded-full float-slow" style="animation-delay:0.6s"></div>
        <span class="text-[10px] text-primary/50 ml-4 font-label-sm">contact_me.sh</span>
      </div>
      <div class="space-y-2 text-primary font-body-md min-h-[80px]">
        <p><span class="text-green-400">guest@portfolio:~$</span> ./hubungi_saya.sh</p>
        <p class="flex items-center">
          <span class="text-white text-sm">{{ terminalText }}</span>
          <span class="w-2 h-5 bg-primary ml-1 blink shrink-0"></span>
        </p>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { portfolioData as defaultData } from '~/data/portfolio.js'

// Ambil data dari API, fallback ke defaultData
const { data: _apiData } = await useAsyncData('portfolio-about', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)

const terminalText = ref('')

// Peta warna hex untuk shadow
const colorMap = {
  primary: '#ffc485',
  secondary: '#eeb1ff',
  tertiary: '#00e5f4',
}

onMounted(() => {
  const message = `Halo! Saya ${data.value.personal?.name ?? 'Mikail'}. Terbuka untuk kolaborasi proyek dan kesempatan magang.`
  let index = 0
  const timer = setInterval(() => {
    if (index < message.length) {
      terminalText.value += message.charAt(index)
      index++
    } else {
      clearInterval(timer)
    }
  }, 45)
})
</script>
