<template>
  <div>
    <label class="block text-label-sm font-label-sm text-on-surface-variant uppercase mb-2">{{ label }}</label>
    <slot />
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  }
})
</script>
