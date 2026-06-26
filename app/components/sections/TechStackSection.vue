<template>
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
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
