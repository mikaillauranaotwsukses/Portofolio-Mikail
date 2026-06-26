<template>
  <div class="space-y-16">
    <SectionsProfileSection :data="data" />
    <SectionsSkillsSection :data="data" />
    <SectionsTechStackSection :data="data" />
    <SectionsEducationSection :data="data" />

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
import { ref, computed, onMounted } from 'vue'
import { portfolioData as defaultData } from '~/data/portfolio.js'

// Ambil data dari API, fallback ke defaultData
const { data: _apiData } = await useAsyncData('portfolio-about', () => $fetch('/api/portfolio'))
const data = computed(() => _apiData.value || defaultData)

const terminalText = ref('')

onMounted(() => {
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
</script>
