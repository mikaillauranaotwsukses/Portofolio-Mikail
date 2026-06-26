<template>
  <!-- =====================================================
       SECTION 1: PROFIL HERO
       Animasi: slide-in-up pada foto & teks
       ===================================================== -->
  <section class="grid grid-cols-1 md:grid-cols-12 gap-gutter items-center">
    <!-- Foto -->
    <div class="md:col-span-4 flex justify-center slide-in-up">
      <div class="relative w-64 h-64 border-4 border-black bg-surface-container-low shadow-[8px_8px_0px_0px_#701c8e] overflow-hidden group">
        <img
          :alt="data.personal?.name"
          class="w-full h-full object-cover filter contrast-125 brightness-90 group-hover:scale-105 transition-transform duration-500"
          :src="data.personal?.photoUrl"
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
        {{ data.personal?.tagline }}
      </div>
      <!-- Nama dengan glitch -->
      <h1
        class="text-display-lg font-display-lg text-primary leading-none uppercase glitch"
        :data-text="data.personal?.name"
      >
        {{ data.personal?.name }}
      </h1>
      <p class="text-secondary font-label-sm text-label-sm uppercase tracking-wider">
        {{ data.personal?.role }}
      </p>
      <p class="text-body-md font-body-md max-w-xl bg-surface-container-low border-2 border-black p-4 shadow-[4px_4px_0px_0px_#701c8e] leading-relaxed">
        {{ data.personal?.bio }}
      </p>
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
</script>
