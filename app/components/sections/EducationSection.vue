<template>
  <!-- =====================================================
       SECTION 4: PENDIDIKAN — Staggered Timeline
       Animasi: tiap item masuk bergantian
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
          boxShadow: '4px 4px 0px 0px ' + (colorMap[item.color] || '#ffc485'),
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
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})

// Peta warna hex untuk shadow pendidikan
const colorMap = {
  primary: '#ffc485',
  secondary: '#eeb1ff',
  tertiary: '#00e5f4',
}
</script>
