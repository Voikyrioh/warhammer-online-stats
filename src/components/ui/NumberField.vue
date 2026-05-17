<script setup lang="ts">
const model = defineModel<number>({ required: true })

defineProps<{
  label?: string
  min?: number
  max?: number
  small?: boolean
}>()
</script>

<template>
  <div class="flex flex-col items-center gap-0.5">
    <span v-if="label" class="text-xs font-medieval text-wh-brown uppercase tracking-wide leading-none">
      {{ label }}
    </span>
    <input
      type="number"
      v-model.number="model"
      :min="min ?? 0"
      :max="max"
      :class="[
        'border border-wh-mid rounded text-center font-body text-wh-text bg-parchment focus:outline-none focus:ring-1 focus:ring-wh-gold',
        small ? 'w-10 h-7 text-sm' : 'w-14 h-8 text-base'
      ]"
    />
  </div>
</template>
