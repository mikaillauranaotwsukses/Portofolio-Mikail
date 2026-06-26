<template>
  <div class="space-y-16">

    <!-- =====================================================
         SECTION 1: PROFIL HERO
         Animasi: slide-in-up pada foto & teks
         ===================================================== -->
    <section class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
      <!-- Foto -->
      <div class="md:col-span-4 flex justify-center slide-in-up">
        <div class="relative w-64 h-64 border-4 border-black bg-surface-container-low shadow-[8px_8px_0px_0px_#701c8e] overflow-hidden group">
          <img
            :alt="data.personal.name"
            class="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500"
            :src="data.personal.photoUrl"
          />
          <div class="absolute inset-0 bg-secondary/10 mix-blend-overlay group-hover:bg-primary/10 transition-all"></div>
          <!-- Floating decorasi di atas foto -->
          <div class="absolute top-2 right-2 w-3 h-3 bg-primary border border-black twinkle-fast opacity-70"></div>
          <div class="absolute bottom-2 left-2 w-2 h-2 bg-tertiary border border-black twinkle opacity-70" style="animation-delay:0.5s"></div>
        </div>
      </div>

      <!-- Info -->
      <div class="md:col-span-8 space-y-6 slide-in-up" style="animation-delay:0.1s">
        <div class="inline-block bg-primary text-on-primary px-4 py-1 border-2 border-black font-label-sm text-label-sm font-bold shadow-[4px_4px_0px_0px_#000] uppercase">
          {{ data.personal.tagline }}
        </div>
        <!-- Nama dengan glitch -->
        <h1
          class="text-display-lg font-display-lg text-primary leading-none uppercase glitch"
          :data-text="data.personal.name"
        >
          {{ data.personal.name }}
        </h1>
        <p class="text-secondary font-label-sm text-label-sm uppercase tracking-wider">
          {{ data.personal.role }}
        </p>
        <p class="text-body-md font-body-md max-w-xl bg-surface-container-low border-2 border-black p-4 shadow-[4px_4px_0px_0px_#701c8e] leading-relaxed">
          {{ data.personal.bio }}
        </p>
      </div>
    </section>


    <!-- =====================================================
         SECTION 2: KEAHLIAN — Animated Skill Bars
         Animasi: bar mengisi dari 0% ke nilai saat masuk viewport
         Edit di portfolio.js > skills[]
         ===================================================== -->
    <section id="skills-section" class="space-y-8">
      <h2 class="text-headline-lg font-headline-lg text-primary uppercase flex items-center gap-4 slide-in-up">
        <span class="material-symbols-outlined text-4xl float">build</span>
        KEAHLIAN
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-gutter">
        <div
          v-for="(category, ci) in data.skills"
          :key="category.category"
          class="bg-surface-container-low border-4 border-black p-6 shadow-[8px_8px_0px_0px_#000] space-y-5 slide-in-up hover:-translate-y-1 transition-transform"
          :style="{ animationDelay: (ci * 0.1) + 's' }"
        >
          <!-- Header Kategori -->
          <div class="flex items-center gap-3 pb-3 border-b-2 border-surface-container-highest">
            <span :class="['material-symbols-outlined text-3xl float', category.iconColor]" :style="{ animationDelay: (ci * 0.3) + 's' }">{{ category.icon }}</span>
            <h3 class="font-headline-lg text-base uppercase">{{ category.category }}</h3>
          </div>

          <!-- Skill Bars — mengisi secara animasi -->
          <div class="space-y-4">
            <div v-for="skill in category.items" :key="skill.name">
              <div class="flex justify-between mb-1">
                <span class="text-label-sm font-label-sm uppercase text-on-surface">{{ skill.name }}</span>
                <span class="text-label-sm font-label-sm text-on-surface-variant">{{ skill.percentage }}%</span>
              </div>
              <!-- Container bar -->
              <div class="h-5 bg-surface-container-highest border-2 border-black overflow-hidden">
                <!-- Bar yang bergerak dari 0 → percentage -->
                <div
                  class="h-full relative overflow-hidden"
                  :class="category.iconColor.replace('text-', 'bg-')"
                  :style="{
                    width: skillWidths[skill.name] + '%',
                    transition: 'width 1.2s cubic-bezier(0.17, 0.67, 0.83, 0.67)'
                  }"
                >
                  <!-- Efek shine di dalam bar -->
                  <div class="absolute inset-y-0 left-0 w-4 bg-white/30 skew-x-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- =====================================================
         SECTION 3: TECH STACK
         ===================================================== -->
    <section class="space-y-6 slide-in-up">
      <h2 class="text-headline-lg font-headline-lg text-primary uppercase flex items-center gap-4">
        <span class="material-symbols-outlined text-4xl">layers</span>
        TECH STACK
      </h2>
      <div class="bg-surface-container-low border-4 border-black p-6 shadow-[4px_4px_0px_0px_#000]">
        <div class="flex flex-wrap gap-3">
          <span
            v-for="(item, i) in data.techStack" :key="item"
            class="px-4 py-2 border-2 border-tertiary text-tertiary font-label-sm text-label-sm uppercase hover:bg-tertiary hover:text-on-tertiary cursor-default transition-all hover:-translate-y-1 hover:shadow-[2px_2px_0px_#00363a]"
            :style="{ animationDelay: (i * 0.04) + 's' }"
          >
            {{ item }}
          </span>
        </div>
      </div>
    </section>


    <!-- =====================================================
         SECTION 4: PENDIDIKAN — Staggered Timeline
         Animasi: tiap item masuk bergantian
         Edit di portfolio.js > education[]
         ===================================================== -->
    <section class="space-y-8">
      <h2 class="text-headline-lg font-headline-lg text-primary uppercase flex items-center gap-4 slide-in-up">
        <span class="material-symbols-outlined text-4xl">school</span>
        PENDIDIKAN
      </h2>

      <div class="relative ml-8 border-l-4 border-dashed border-surface-container-highest pl-12 space-y-10 py-4">
        <div
          v-for="(item, i) in data.education"
          :key="item.institution"
          class="timeline-step relative bg-surface-container p-6 border-4 border-black hover:translate-x-2 transition-transform slide-in-up"
          :style="{
            boxShadow: '4px 4px 0px 0px ' + colorMap[item.color],
            animationDelay: (i * 0.12) + 's'
          }"
        >
          <div class="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-3 gap-2">
            <span class="font-label-sm text-label-sm" :class="'text-' + item.color">{{ item.period }}</span>
            <span class="px-2 py-0.5 text-[11px] uppercase border font-bold" :class="['text-' + item.color, 'border-' + item.color]">
              {{ item.badge }}
            </span>
          </div>
          <h4 class="font-headline-lg text-lg text-white mb-2 uppercase">{{ item.institution }}</h4>
          <p class="text-on-surface-variant font-body-md text-sm leading-relaxed">{{ item.description }}</p>
        </div>
      </div>
    </section>


    <!-- =====================================================
         SECTION 5: TERMINAL
         Animasi: efek mengetik
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
import { ref, reactive, computed, watch, onMounted } from 'vue'
import { portfolioData as defaultData } from '~/data/portfolio.js'

// Ambil data dari API, fallback ke defaultData
const { data: _apiData } = await useAsyncData('portfolio', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)

// Peta warna hex untuk shadow pendidikan
const colorMap = {
  primary: '#ffc485',
  secondary: '#eeb1ff',
  tertiary: '#00e5f4',
}

// ---- Animated Skill Bars ----
const skillWidths = reactive({})

// Inisialisasi bar ke 0 setiap kali data berubah (misal setelah admin simpan)
watch(data, (newData) => {
  if (!newData?.skills) return
  newData.skills.forEach(cat => {
    cat.items.forEach(item => {
      if (skillWidths[item.name] === undefined) skillWidths[item.name] = 0
    })
  })
}, { immediate: true })

onMounted(() => {
  // IntersectionObserver: aktifkan animasi saat section skills masuk layar
  const section = document.getElementById('skills-section')
  if (!section) return

  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      // Isi bar dengan stagger per item
      let delay = 0
      data.value.skills.forEach(cat => {
        cat.items.forEach(item => {
          setTimeout(() => {
            skillWidths[item.name] = item.percentage
          }, delay)
          delay += 120
        })
      })
      observer.disconnect()
    }
  }, { threshold: 0.2 })

  observer.observe(section)

  // ---- Terminal typing animation ----
  const message = `Halo! Saya ${data.value.personal?.name ?? 'saya'}. Terbuka untuk kolaborasi proyek dan kesempatan magang.`
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

const terminalText = ref('')
</script>
