<template>
  <div class="space-y-16">

    <!-- =====================================================
         SECTION 1: PROFIL + QUOTE + STATS COUNTER
         ===================================================== -->
    <section class="bg-surface-container-high border-4 border-black p-8 shadow-[8px_8px_0px_0px_#00e5f4] slide-in-up">
      <blockquote class="text-primary font-headline-lg text-xl md:text-2xl uppercase mb-6 leading-tight">
        "You don't have to be great to start, but you have to start to be great."
      </blockquote>
      <p class="text-on-background font-body-md leading-relaxed">
        {{ data.personal.bio }} Selama perjalanan praktis dan akademis, saya telah mengeksplorasi Web &amp; Mobile App Development, UI/UX Design, hingga Internet of Things (IoT).
      </p>

      <!-- Animated Stats Counter -->
      <div class="flex gap-6 mt-8 flex-wrap stats-section">
        <div
          v-for="stat in stats" :key="stat.label"
          class="bg-surface-container border-4 border-black p-4 text-center min-w-28"
          :style="{ boxShadow: '4px 4px 0px 0px ' + stat.shadowColor }"
        >
          <p class="font-headline-lg text-3xl font-bold" :class="stat.textColor">
            <span ref="statEls">{{ stat.displayed }}</span>{{ stat.suffix }}
          </p>
          <p class="text-on-surface-variant text-label-sm font-label-sm uppercase mt-1">{{ stat.label }}</p>
        </div>
      </div>

      <!-- Download CV Button -->
      <div class="mt-8">
        <a
          :href="data.cvUrl || '/CV_Muhammad_Mikail_Laurana.docx'"
          download
          class="inline-flex items-center gap-3 bg-primary-container text-on-primary-container px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_#701c8e] hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#701c8e] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all font-label-sm text-label-sm font-bold uppercase"
        >
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">download</span>
          Download CV
          <span class="text-[10px] opacity-60">.docx</span>
        </a>
      </div>
    </section>

    <!-- =====================================================
         SECTION 2: SKILLS
         ===================================================== -->
    <section class="slide-in-up">
      <h2 class="text-headline-lg font-headline-lg text-tertiary uppercase flex items-center gap-3 mb-8">
        <span class="bg-tertiary text-on-tertiary px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#00363a]">
          <span class="material-symbols-outlined text-2xl" style="vertical-align:middle">code</span>
        </span>
        SKILL &amp; TEKNOLOGI
      </h2>

      <div class="space-y-6">
        <div v-for="(group, key) in skillGroups" :key="key">
          <p class="text-label-sm font-label-sm uppercase text-on-surface-variant mb-3 flex items-center gap-2">
            <span class="w-2 h-2 border-2 border-current inline-block rotate-45"></span>
            {{ group.label }}
          </p>
          <div class="flex flex-wrap gap-3">
            <span
              v-for="skill in group.items" :key="skill"
              class="px-4 py-2 border-2 font-label-sm text-label-sm font-bold uppercase transition-all hover:-translate-y-0.5 hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] cursor-default select-none"
              :class="group.tagClass"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         SECTION 3: RIWAYAT PENDIDIKAN & PENGALAMAN
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
          Pengalaman &amp; Organisasi
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
         SECTION 4: PRESTASI & PENGHARGAAN
         ===================================================== -->
    <section class="slide-in-up" v-if="data.achievements && data.achievements.length > 0">
      <h2 class="text-headline-lg font-headline-lg text-primary uppercase flex items-center gap-3 mb-8">
        <span class="bg-primary text-on-primary px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#ffc485]">
          <span class="material-symbols-outlined text-2xl" style="vertical-align:middle; font-variation-settings: 'FILL' 1;">emoji_events</span>
        </span>
        PRESTASI &amp; PENGHARGAAN
      </h2>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <div
          v-for="(item, i) in data.achievements"
          :key="item.id"
          class="bg-surface-container border-4 border-black p-5 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all slide-in-up group"
          :style="{
            boxShadow: '4px 4px 0px 0px ' + (colorMap[item.color] || '#ffc485'),
            animationDelay: (i * 0.08) + 's'
          }"
        >
          <!-- Icon + Year -->
          <div class="flex items-start justify-between mb-3">
            <div
              class="w-10 h-10 border-2 border-black flex items-center justify-center shrink-0"
              :class="'bg-' + item.color"
            >
              <span
                class="material-symbols-outlined text-lg text-black"
                style="font-variation-settings: 'FILL' 1;"
              >{{ item.icon }}</span>
            </div>
            <span
              class="text-[11px] font-bold font-label-sm border px-2 py-0.5 uppercase"
              :class="['text-' + item.color, 'border-' + item.color]"
            >{{ item.year }}</span>
          </div>

          <!-- Title -->
          <h4 class="font-headline-lg text-sm text-white uppercase leading-tight mb-1">
            {{ item.title }}
          </h4>

          <!-- Event -->
          <p class="text-on-surface-variant text-[11px] font-label-sm uppercase mb-2" :class="'text-' + item.color">
            {{ item.event }}
          </p>

          <!-- Description -->
          <p class="text-on-surface-variant font-body-md text-xs leading-relaxed">
            {{ item.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- =====================================================
         SECTION 5: TERMINAL ANIMASI
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

const { data: _apiData } = await useAsyncData('portfolio-about', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)

const terminalText = ref('')

const colorMap = {
  primary: '#ffc485',
  secondary: '#eeb1ff',
  tertiary: '#00e5f4',
}

// ---- Skills grouped ----
const skillGroups = computed(() => {
  const s = data.value?.skills || {}
  return [
    { label: 'Bahasa Pemrograman', items: s.languages || [], tagClass: 'border-tertiary text-tertiary bg-tertiary/10 hover:bg-tertiary/20' },
    { label: 'Framework & Library', items: s.frameworks || [], tagClass: 'border-secondary text-secondary bg-secondary/10 hover:bg-secondary/20' },
    { label: 'Tools & Platform', items: s.tools || [], tagClass: 'border-primary text-primary bg-primary/10 hover:bg-primary/20' },
    { label: 'Lainnya', items: s.other || [], tagClass: 'border-surface-container-highest text-on-surface-variant bg-surface-container hover:bg-surface-container-high' },
  ].filter(g => g.items.length > 0)
})

// ---- Animated stats ----
const statTargets = [
  { target: 10, suffix: '+', label: 'Proyek Dibangun', textColor: 'text-primary', shadowColor: '#ffc485' },
  { target: 9,  suffix: '',  label: 'Prestasi & Penghargaan', textColor: 'text-secondary', shadowColor: '#eeb1ff' },
  { target: 3,  suffix: '+', label: 'Tahun Belajar', textColor: 'text-tertiary', shadowColor: '#00e5f4' },
]

const stats = ref(statTargets.map(s => ({ ...s, displayed: 0 })))

const animateStats = () => {
  stats.value.forEach((stat, idx) => {
    let current = 0
    const step = Math.ceil(stat.target / 30)
    const timer = setInterval(() => {
      current = Math.min(current + step, stat.target)
      stats.value[idx].displayed = current
      if (current >= stat.target) clearInterval(timer)
    }, 40)
  })
}

// ---- Terminal typing ----
onMounted(() => {
  // Stats counter trigger on scroll
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      animateStats()
      observer.disconnect()
    }
  }, { threshold: 0.3 })

  const statsEl = document.querySelector('.stats-section')
  if (statsEl) observer.observe(statsEl)
  else animateStats() // fallback: run immediately

  // Terminal typing
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
