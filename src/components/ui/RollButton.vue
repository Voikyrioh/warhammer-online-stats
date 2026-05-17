<script setup lang="ts">
defineProps<{
  label?: string
  small?: boolean
}>()
const emit = defineEmits<{ roll: [] }>()
</script>

<template>
  <button
    @click="emit('roll')"
    :title="label ? `Lancer pour ${label}` : 'Lancer les dés'"
    :class="[
      'inline-flex items-center justify-center rounded border border-wh-gold bg-wh-brown text-parchment hover:bg-wh-mid transition-colors',
      small ? 'w-6 h-6 text-xs' : 'w-7 h-7 text-sm'
    ]"
  >
    🎲
  </button>
</template>
