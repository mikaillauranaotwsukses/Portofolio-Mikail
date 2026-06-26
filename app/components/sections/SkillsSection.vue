<template>
  <!-- =====================================================
       SECTION 2: KEAHLIAN — Animated Skill Bars
       Animasi: bar mengisi dari 0% ke nilai saat masuk viewport
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
                :class="category.iconColor ? category.iconColor.replace('text-', 'bg-') : 'bg-primary'"
                :style="{
                  width: (skillWidths[skill.name] || 0) + '%',
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
</template>

<script setup>
import { reactive, watch, onMounted } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

// ---- Animated Skill Bars ----
const skillWidths = reactive({})

// Inisialisasi bar ke 0 setiap kali data berubah (misal setelah admin simpan)
watch(() => props.data, (newData) => {
  if (!newData?.skills) return
  newData.skills.forEach(cat => {
    cat.items?.forEach(item => {
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
      props.data.skills?.forEach(cat => {
        cat.items?.forEach(item => {
          setTimeout(() => {
            skillWidths[item.name] = item.percentage
          }, delay)
          delay += 120
        })
      })
      observer.disconnect()
    }
  }, { threshold: 0.1 })

  observer.observe(section)
})
</script>
