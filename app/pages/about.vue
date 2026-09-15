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

      <!-- Action Buttons -->
      <div class="mt-8 flex flex-wrap gap-4 items-center">
        <a
          :href="data.cvUrl || '/CV_Muhammad Mikail Laurana_5027261053.docx'"
          download
          class="inline-flex items-center gap-3 bg-primary-container text-on-primary-container px-8 py-4 border-4 border-black shadow-[6px_6px_0px_0px_#701c8e] hover:-translate-y-0.5 hover:shadow-[8px_8px_0px_0px_#701c8e] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all font-label-sm text-label-sm font-bold uppercase"
        >
          <span class="material-symbols-outlined" style="font-variation-settings: 'FILL' 1;">download</span>
          Download CV
          <span class="text-[10px] opacity-60">.docx</span>
        </a>

        <NuxtLink
          to="/prestasi"
          class="inline-flex items-center gap-2 border-4 border-black bg-surface-container px-6 py-4 font-label-sm text-label-sm font-bold uppercase text-primary hover:border-primary hover:-translate-y-0.5 transition-all shadow-[6px_6px_0px_0px_#ff9d00]"
        >
          <span class="material-symbols-outlined text-xl">emoji_events</span>
          Lihat Halaman Prestasi
          <span class="material-symbols-outlined text-base">arrow_forward</span>
        </NuxtLink>
      </div>
    </section>

    <!-- =====================================================
         SECTION 2: RIWAYAT KARIER & PENDIDIKAN (1 KOLOM - PEKERJAAN DIDAHULUKAN)
         ===================================================== -->
    <div class="space-y-12 max-w-4xl mx-auto">

      <!-- BLOK 1: PENGALAMAN & PEKERJAAN (DIDAHULUKAN) -->
      <section class="space-y-6">
        <div class="flex items-center justify-between pb-3 border-b-4 border-black slide-in-up">
          <h2 class="text-headline-lg font-headline-lg text-secondary uppercase flex items-center gap-3">
            <span class="bg-secondary text-on-secondary px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#53006f]">
              <span class="material-symbols-outlined text-2xl" style="vertical-align:middle">work</span>
            </span>
            Pengalaman &amp; Pekerjaan
          </h2>
          <span class="text-xs font-mono text-on-surface-variant uppercase font-bold hidden sm:inline-block">
            {{ data.experience?.length || 0 }} Riwayat
          </span>
        </div>

        <p class="text-xs text-on-surface-variant font-mono flex items-center gap-2 italic">
          <span class="material-symbols-outlined text-sm text-secondary">info</span>
          Klik pada setiap kartu untuk melihat atau menutup rincian tugas &amp; tanggung jawab ke bawah.
        </p>

        <div class="space-y-4">
          <div
            v-for="(item, i) in data.experience"
            :key="item.institution + i"
            class="timeline-card bg-surface-container border-4 border-black p-5 transition-all cursor-pointer select-none group slide-in-up"
            :class="isExpanded('exp-' + i) ? 'border-secondary' : 'hover:border-white/80'"
            :style="{
              boxShadow: isExpanded('exp-' + i)
                ? '6px 6px 0px 0px ' + (colorMap[item.color] || '#00e5f4')
                : '4px 4px 0px 0px ' + (colorMap[item.color] || '#00e5f4'),
              animationDelay: (i * 0.1) + 's'
            }"
            @click="toggleItem('exp-' + i)"
          >
            <!-- Card Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-2 py-0.5 text-[11px] uppercase border font-bold" :class="['text-' + item.color, 'border-' + item.color]">
                    {{ item.badge }}
                  </span>
                  <span class="font-label-sm text-xs font-mono text-on-surface-variant">{{ item.period }}</span>
                </div>
                <h3 class="font-headline-lg text-lg text-white uppercase group-hover:text-secondary transition-colors">
                  {{ item.institution }}
                </h3>
                <p class="text-on-surface-variant text-xs font-label-sm uppercase font-semibold text-secondary" v-if="item.subtitle">
                  {{ item.subtitle }}
                </p>
              </div>

              <!-- Accordion Action Button -->
              <div class="shrink-0 flex items-center">
                <button
                  type="button"
                  class="flex items-center gap-1.5 px-3 py-1.5 font-label-sm text-xs font-bold uppercase border transition-all pointer-events-none"
                  :class="isExpanded('exp-' + i) ? 'bg-secondary text-black border-black' : 'border-surface-container-highest text-on-surface-variant group-hover:border-secondary group-hover:text-secondary'"
                >
                  <span>{{ isExpanded('exp-' + i) ? 'Tutup Detail' : 'Buka Detail' }}</span>
                  <span class="material-symbols-outlined text-base transition-transform duration-300" :class="{ 'rotate-180': isExpanded('exp-' + i) }">
                    expand_more
                  </span>
                </button>
              </div>
            </div>

            <!-- Accordion Expandable Description -->
            <transition name="accordion">
              <div v-if="isExpanded('exp-' + i)" class="mt-4 pt-4 border-t-2 border-dashed border-surface-container-highest/80">
                <p class="text-on-surface-variant font-body-md text-sm leading-relaxed whitespace-pre-line">
                  {{ item.description }}
                </p>
              </div>
            </transition>
          </div>
        </div>
      </section>

      <!-- BLOK 2: RIWAYAT PENDIDIKAN (SETELAH PEKERJAAN) -->
      <section class="space-y-6 pt-6">
        <div class="flex items-center justify-between pb-3 border-b-4 border-black slide-in-up">
          <h2 class="text-headline-lg font-headline-lg text-primary uppercase flex items-center gap-3">
            <span class="bg-primary text-on-primary px-3 py-1 border-2 border-black shadow-[4px_4px_0px_0px_#ffc485]">
              <span class="material-symbols-outlined text-2xl" style="vertical-align:middle">school</span>
            </span>
            Riwayat Pendidikan
          </h2>
          <span class="text-xs font-mono text-on-surface-variant uppercase font-bold hidden sm:inline-block">
            {{ data.education?.length || 0 }} Riwayat
          </span>
        </div>

        <p class="text-xs text-on-surface-variant font-mono flex items-center gap-2 italic">
          <span class="material-symbols-outlined text-sm text-primary">info</span>
          Klik pada setiap kartu untuk melihat atau menutup rincian program &amp; fokus studi.
        </p>

        <div class="space-y-4">
          <div
            v-for="(item, i) in data.education"
            :key="item.institution + i"
            class="timeline-card bg-surface-container border-4 border-black p-5 transition-all cursor-pointer select-none group slide-in-up"
            :class="isExpanded('edu-' + i) ? 'border-primary' : 'hover:border-white/80'"
            :style="{
              boxShadow: isExpanded('edu-' + i)
                ? '6px 6px 0px 0px ' + (colorMap[item.color] || '#ffc485')
                : '4px 4px 0px 0px ' + (colorMap[item.color] || '#ffc485'),
              animationDelay: (i * 0.1) + 's'
            }"
            @click="toggleItem('edu-' + i)"
          >
            <!-- Card Header -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div class="space-y-1">
                <div class="flex flex-wrap items-center gap-2">
                  <span class="px-2 py-0.5 text-[11px] uppercase border font-bold" :class="['text-' + item.color, 'border-' + item.color]">
                    {{ item.badge }}
                  </span>
                  <span class="font-label-sm text-xs font-mono text-on-surface-variant">{{ item.period }}</span>
                </div>
                <h3 class="font-headline-lg text-lg text-white uppercase group-hover:text-primary transition-colors">
                  {{ item.institution }}
                </h3>
                <p class="text-on-surface-variant text-xs font-label-sm uppercase font-semibold text-primary" v-if="item.subtitle">
                  {{ item.subtitle }}
                </p>
              </div>

              <!-- Accordion Action Button -->
              <div class="shrink-0 flex items-center">
                <button
                  type="button"
                  class="flex items-center gap-1.5 px-3 py-1.5 font-label-sm text-xs font-bold uppercase border transition-all pointer-events-none"
                  :class="isExpanded('edu-' + i) ? 'bg-primary text-black border-black' : 'border-surface-container-highest text-on-surface-variant group-hover:border-primary group-hover:text-primary'"
                >
                  <span>{{ isExpanded('edu-' + i) ? 'Tutup Detail' : 'Buka Detail' }}</span>
                  <span class="material-symbols-outlined text-base transition-transform duration-300" :class="{ 'rotate-180': isExpanded('edu-' + i) }">
                    expand_more
                  </span>
                </button>
              </div>
            </div>

            <!-- Accordion Expandable Description -->
            <transition name="accordion">
              <div v-if="isExpanded('edu-' + i)" class="mt-4 pt-4 border-t-2 border-dashed border-surface-container-highest/80">
                <p class="text-on-surface-variant font-body-md text-sm leading-relaxed whitespace-pre-line">
                  {{ item.description }}
                </p>
              </div>
            </transition>
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

const { data: _apiData } = await useAsyncData('portfolio-about', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)

const terminalText = ref('')

const colorMap = {
  primary: '#ffc485',
  secondary: '#eeb1ff',
  tertiary: '#00e5f4',
}

// ---- Accordion State ----
// Buka item pengalaman pertama secara default agar pengunjung langsung tahu fitur interaktif
const expandedSet = ref(new Set(['exp-0']))

const toggleItem = (key) => {
  if (expandedSet.value.has(key)) {
    expandedSet.value.delete(key)
  } else {
    expandedSet.value.add(key)
  }
}

const isExpanded = (key) => expandedSet.value.has(key)

// ---- Animated stats ----
const statTargets = [
  { target: 10, suffix: '+', label: 'Proyek Dibangun', textColor: 'text-primary', shadowColor: '#ffc485' },
  { target: 9,  suffix: '',  label: 'Prestasi Resmi', textColor: 'text-secondary', shadowColor: '#eeb1ff' },
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

// ---- Lifecycle onMounted ----
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
  else animateStats()

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

useHead({
  title: 'About Me - Muhammad Mikail Laurana',
  meta: [
    { name: 'description', content: 'Profil lengkap, riwayat karier, pengalaman magang, organisasi, dan riwayat pendidikan Muhammad Mikail Laurana.' }
  ]
})
</script>

<style scoped>
.accordion-enter-active,
.accordion-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 500px;
  overflow: hidden;
  opacity: 1;
}

.accordion-enter-from,
.accordion-leave-to {
  max-height: 0;
  opacity: 0;
  transform: translateY(-6px);
}
</style>
