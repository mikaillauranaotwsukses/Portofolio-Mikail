<template>
  <div class="pixel-grid min-h-screen space-y-16">

    <!-- =====================================================
         SECTION 1: HERO HEADER PRESTASI
         ===================================================== -->
    <section class="mb-12 slide-in-up">
      <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b-4 border-black">
        <div>
          <div class="flex items-center gap-3 mb-3">
            <span class="bg-primary text-black px-3 py-1 border-2 border-black font-mono font-bold text-xs shadow-[3px_3px_0px_0px_#701c8e] uppercase">
              REKOR &amp; PENCAPAIAN
            </span>
            <span class="text-xs text-on-surface-variant font-mono">RESMI TERVERIFIKASI</span>
          </div>
          <h1 class="font-display-lg text-display-lg text-primary uppercase leading-none tracking-tight">
            Prestasi &amp; Penghargaan
          </h1>
          <p class="max-w-2xl text-on-surface-variant font-body-md text-sm mt-3 border-l-4 border-secondary pl-4">
            Daftar rekam jejak kompetisi sains, teknologi, olimpiade nasional, serta beasiswa prestisius yang diraih oleh Muhammad Mikail Laurana.
          </p>
        </div>

        <!-- Counter Badge -->
        <div class="shrink-0">
          <div class="bg-surface-container border-4 border-black p-4 text-center shadow-[6px_6px_0px_0px_#ff9d00]">
            <p class="font-headline-lg text-3xl font-extrabold text-primary flex items-center justify-center gap-2">
              <span class="material-symbols-outlined text-3xl" style="font-variation-settings: 'FILL' 1;">emoji_events</span>
              {{ achievements.length }}
            </p>
            <p class="text-[11px] font-label-sm uppercase font-bold text-on-surface-variant mt-1">Penghargaan Resmi</p>
          </div>
        </div>
      </div>
    </section>

    <!-- =====================================================
         SECTION 2: FILTER KATEGORI PRESTASI
         ===================================================== -->
    <section class="slide-in-up">
      <div class="flex flex-wrap items-center gap-3">
        <button
          v-for="cat in filterCategories"
          :key="cat.id"
          type="button"
          class="px-4 py-2 border-2 font-label-sm text-xs font-bold uppercase transition-all select-none flex items-center gap-2"
          :class="selectedFilter === cat.id
            ? 'bg-primary text-black border-black shadow-[4px_4px_0px_0px_#701c8e] -translate-y-0.5'
            : 'bg-surface-container border-surface-container-highest text-on-surface-variant hover:border-primary hover:text-primary'"
          @click="selectedFilter = cat.id"
        >
          <span class="material-symbols-outlined text-base">{{ cat.icon }}</span>
          {{ cat.label }} ({{ getCountForFilter(cat.id) }})
        </button>
      </div>
    </section>

    <!-- =====================================================
         SECTION 3: GRID PRESTASI (9 KARTU PRESTASI RESMI)
         ===================================================== -->
    <section class="slide-in-up">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(item, i) in filteredAchievements"
          :key="item.id"
          class="bg-surface-container border-4 border-black p-6 flex flex-col justify-between transition-all hover:-translate-y-1.5 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group slide-in-up relative overflow-hidden"
          :style="{
            boxShadow: '5px 5px 0px 0px ' + (colorMap[item.color] || '#ffc485'),
            animationDelay: (i * 0.07) + 's'
          }"
        >
          <!-- Top Tag & Icon -->
          <div>
            <div class="flex items-start justify-between gap-3 mb-4">
              <!-- Icon Container -->
              <div
                class="w-12 h-12 border-2 border-black flex items-center justify-center shrink-0 shadow-[2px_2px_0px_0px_#000]"
                :class="'bg-' + item.color"
              >
                <span
                  class="material-symbols-outlined text-2xl text-black"
                  style="font-variation-settings: 'FILL' 1;"
                >
                  {{ item.icon }}
                </span>
              </div>

              <!-- Year Badge -->
              <span
                class="text-xs font-bold font-mono border-2 px-2.5 py-1 uppercase bg-surface-container-lowest"
                :class="['text-' + item.color, 'border-' + item.color]"
              >
                {{ item.year }}
              </span>
            </div>

            <!-- Title -->
            <h3 class="font-headline-lg text-base text-white uppercase leading-snug group-hover:text-primary transition-colors mb-1.5">
              {{ item.title }}
            </h3>

            <!-- Event / Penyelenggara -->
            <p class="text-xs font-label-sm uppercase font-bold tracking-wider mb-3" :class="'text-' + item.color">
              {{ item.event }}
            </p>

            <!-- Description -->
            <p class="text-on-surface-variant font-body-md text-sm leading-relaxed mb-6">
              {{ item.description }}
            </p>
          </div>

          <!-- Bottom Card Stamp -->
          <div class="pt-3 border-t-2 border-dashed border-surface-container-highest flex items-center justify-between text-[11px] font-mono text-on-surface-variant">
            <span>VERIFIED_AWARD</span>
            <span class="flex items-center gap-1 text-emerald-400 font-bold">
              <span class="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
              VALID
            </span>
          </div>
        </div>
      </div>

      <div
        v-if="filteredAchievements.length === 0"
        class="text-center py-16 border-4 border-dashed border-surface-container-highest text-on-surface-variant font-mono"
      >
        [ Tidak ada prestasi yang cocok dengan filter yang dipilih ]
      </div>
    </section>

    <!-- =====================================================
         SECTION 4: CALL TO ACTION DOKUMEN CV & HUBUNGI
         ===================================================== -->
    <section class="bg-surface-container-high border-4 border-black p-8 shadow-[10px_10px_0px_0px_#701c8e] slide-in-up">
      <div class="flex flex-col md:flex-row items-center justify-between gap-6">
        <div class="space-y-2 text-center md:text-left">
          <h3 class="font-headline-lg text-xl md:text-2xl text-primary uppercase font-bold">
            Butuh Berkas Sertifikat atau Portofolio Lengkap?
          </h3>
          <p class="text-on-surface-variant font-body-md text-sm max-w-xl">
            Seluruh data sertifikasi, riwayat pendidikan, dan proyek dapat ditinjau lebih lanjut melalui dokumen CV resmi atau melalui diskusi langsung.
          </p>
        </div>

        <div class="flex flex-wrap gap-4 shrink-0">
          <a
            :href="data.cvUrl || '/CV_Muhammad Mikail Laurana_5027261053.docx'"
            download
            class="inline-flex items-center gap-2 bg-primary text-black px-6 py-3 border-4 border-black font-label-sm text-xs font-bold uppercase shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            <span class="material-symbols-outlined text-lg" style="font-variation-settings: 'FILL' 1;">download</span>
            Download CV (.docx)
          </a>

          <NuxtLink
            to="/contact"
            class="inline-flex items-center gap-2 bg-secondary text-black px-6 py-3 border-4 border-black font-label-sm text-xs font-bold uppercase shadow-[4px_4px_0px_0px_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-none transition-all"
          >
            <span class="material-symbols-outlined text-lg">mail</span>
            Hubungi Saya
          </NuxtLink>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { portfolioData as defaultData } from '~/data/portfolio.js'

const { data: _apiData } = await useAsyncData('portfolio-prestasi', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)

const achievements = computed(() => data.value?.achievements || [])

const colorMap = {
  primary: '#ffc485',
  secondary: '#eeb1ff',
  tertiary: '#00e5f4',
}

// ---- Filter Categories ----
const filterCategories = [
  { id: 'all', label: 'Semua Prestasi', icon: 'apps' },
  { id: 'olympiad', label: 'Olimpiade & Sains', icon: 'military_tech' },
  { id: 'tech', label: 'IT & Mechatrons', icon: 'code' },
  { id: 'scholarship', label: 'Beasiswa & Akademik', icon: 'school' },
]

const selectedFilter = ref('all')

const getCountForFilter = (filterId) => {
  if (filterId === 'all') return achievements.value.length
  return achievements.value.filter(a => matchesFilter(a, filterId)).length
}

const matchesFilter = (item, filterId) => {
  if (filterId === 'all') return true
  const text = (item.title + ' ' + item.event + ' ' + item.description).toLowerCase()

  if (filterId === 'olympiad') {
    return text.includes('olimpiade') || text.includes('iysho') || text.includes('ilm') || text.includes('lomba') || text.includes('bahasa')
  }
  if (filterId === 'tech') {
    return text.includes('mechatrons') || text.includes('programming') || text.includes('official') || text.includes('informatika') || text.includes('komputer') || text.includes('osn')
  }
  if (filterId === 'scholarship') {
    return text.includes('bsi') || text.includes('beasiswa') || text.includes('snbt') || text.includes('tryout') || text.includes('its')
  }
  return true
}

const filteredAchievements = computed(() => {
  if (selectedFilter.value === 'all') return achievements.value
  return achievements.value.filter(a => matchesFilter(a, selectedFilter.value))
})

useHead({
  title: 'Prestasi & Penghargaan - Muhammad Mikail Laurana',
  meta: [
    { name: 'description', content: 'Daftar lengkap prestasi olimpiade, beasiswa BSI Unggulan, lomba nasional, dan penghargaan Muhammad Mikail Laurana.' }
  ]
})
</script>
