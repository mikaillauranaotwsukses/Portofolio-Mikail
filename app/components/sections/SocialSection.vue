<template>
  <!-- Link Sosial Media -->
  <div class="bg-surface-container-low border-4 border-black shadow-[8px_8px_0px_0px_#00e5f4] p-6">
    <div class="bg-tertiary text-on-tertiary px-4 py-1 text-label-sm font-bold uppercase mb-4 inline-block">
      Social Links
    </div>
    <div class="flex flex-col gap-4">

      <!-- Helper: resolves social item yang bisa berupa string lama ATAU object baru -->
      <!-- GitHub -->
      <a
        :href="resolveUrl(data.social?.github)"
        target="_blank"
        class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-primary transition-colors cursor-pointer"
      >
        <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-primary transition-colors overflow-hidden shrink-0">
          <img
            v-if="resolveIconUrl(data.social?.github)"
            :src="resolveIconUrl(data.social?.github)"
            alt="GitHub icon"
            class="w-full h-full object-cover"
          />
          <span v-else class="material-symbols-outlined text-on-background group-hover:text-on-primary">terminal</span>
        </div>
        <div>
          <div class="text-label-sm font-bold text-primary uppercase">GitHub</div>
          <div class="text-label-sm text-on-surface-variant truncate max-w-48">{{ resolveUrl(data.social?.github) }}</div>
        </div>
      </a>

      <!-- LinkedIn -->
      <a
        :href="resolveUrl(data.social?.linkedin)"
        target="_blank"
        class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-tertiary transition-colors cursor-pointer"
      >
        <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-tertiary transition-colors overflow-hidden shrink-0">
          <img
            v-if="resolveIconUrl(data.social?.linkedin)"
            :src="resolveIconUrl(data.social?.linkedin)"
            alt="LinkedIn icon"
            class="w-full h-full object-cover"
          />
          <span v-else class="material-symbols-outlined text-on-background group-hover:text-on-tertiary">share</span>
        </div>
        <div>
          <div class="text-label-sm font-bold text-tertiary uppercase">LinkedIn</div>
          <div class="text-label-sm text-on-surface-variant truncate max-w-48">{{ resolveUrl(data.social?.linkedin) }}</div>
        </div>
      </a>

      <!-- Instagram -->
      <a
        :href="resolveUrl(data.social?.instagram)"
        target="_blank"
        class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-secondary transition-colors cursor-pointer"
      >
        <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-secondary transition-colors overflow-hidden shrink-0">
          <img
            v-if="resolveIconUrl(data.social?.instagram)"
            :src="resolveIconUrl(data.social?.instagram)"
            alt="Instagram icon"
            class="w-full h-full object-cover"
          />
          <span v-else class="material-symbols-outlined text-on-background group-hover:text-on-secondary">photo_camera</span>
        </div>
        <div>
          <div class="text-label-sm font-bold text-secondary uppercase">Instagram</div>
          <div class="text-label-sm text-on-surface-variant truncate max-w-48">{{ resolveUrl(data.social?.instagram) }}</div>
        </div>
      </a>

      <!-- Email -->
      <a
        :href="getMailtoUrl(data.social?.email)"
        class="group flex items-center gap-4 bg-background p-3 border-4 border-surface-container-highest hover:border-primary transition-colors cursor-pointer"
        :title="'Tulis email ke ' + resolveUrl(data.social?.email)"
      >
        <div class="w-12 h-12 bg-surface-container-highest flex items-center justify-center group-hover:bg-primary transition-colors overflow-hidden shrink-0">
          <img
            v-if="resolveIconUrl(data.social?.email)"
            :src="resolveIconUrl(data.social?.email)"
            alt="Email icon"
            class="w-full h-full object-cover"
          />
          <span v-else class="material-symbols-outlined text-on-background group-hover:text-on-primary">mail</span>
        </div>
        <div>
          <div class="text-label-sm font-bold text-primary uppercase">Email</div>
          <div class="text-label-sm text-on-surface-variant truncate max-w-48">{{ resolveUrl(data.social?.email) }}</div>
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

// Kompatibel dengan format lama (string) maupun baru (object { url, iconUrl })
const resolveUrl = (item) => {
  if (!item) return ''
  return typeof item === 'string' ? item : (item.url ?? '')
}

const resolveIconUrl = (item) => {
  if (!item || typeof item === 'string') return null
  return item.iconUrl || null
}

const getMailtoUrl = (item) => {
  const email = resolveUrl(item)
  if (!email) return '#'
  const cleanEmail = email.replace(/^mailto:/i, '').trim()
  return `mailto:${cleanEmail}?subject=${encodeURIComponent('Pesan dari Portfolio Website')}`
}
</script>
