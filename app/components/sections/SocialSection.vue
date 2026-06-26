<template>
  <!-- Link Sosial Media -->
  <div class="bg-surface-container-low border-4 border-black shadow-[8px_8px_0px_0px_#00e5f4] p-6">
    <div class="bg-tertiary text-on-tertiary px-4 py-1 text-label-sm font-bold uppercase mb-4 inline-block">
      Social Links
    </div>
    <div class="flex flex-col gap-4">
      <!-- GitHub -->
      <a 
        :href="data.social?.github" 
        target="_blank"
        class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-primary transition-colors cursor-pointer"
      >
        <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-primary transition-colors">
          <span class="material-symbols-outlined text-on-background group-hover:text-on-primary">terminal</span>
        </div>
        <div>
          <div class="text-label-sm font-bold text-tertiary uppercase">GitHub</div>
          <div class="text-label-sm text-surface-variant truncate">{{ data.social?.github }}</div>
        </div>
      </a>

      <!-- LinkedIn -->
      <a 
        :href="data.social?.linkedin" 
        target="_blank"
        class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-secondary transition-colors cursor-pointer"
      >
        <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-secondary transition-colors">
          <span class="material-symbols-outlined text-on-background group-hover:text-on-secondary">share</span>
        </div>
        <div>
          <div class="text-label-sm font-bold text-tertiary uppercase">LinkedIn</div>
          <div class="text-label-sm text-surface-variant truncate">{{ data.social?.linkedin }}</div>
        </div>
      </a>

      <!-- Email -->
      <a 
        :href="'mailto:' + data.social?.email"
        class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-tertiary transition-colors cursor-pointer"
      >
        <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-tertiary transition-colors">
          <span class="material-symbols-outlined text-on-background group-hover:text-on-tertiary">mail</span>
        </div>
        <div>
          <div class="text-label-sm font-bold text-tertiary uppercase">Email</div>
          <div class="text-label-sm text-surface-variant truncate">{{ data.social?.email }}</div>
        </div>
      </a>
    </div>
  </div>
</template>

<script setup>
defineProps({
  data: {
    type: Object,
    required: true
  }
})
</script>
