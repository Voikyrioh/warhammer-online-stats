<script setup lang="ts">
defineProps<{ title: string }>()
</script>

<template>
  <div class="border-2 border-wh-mid rounded overflow-hidden shadow-md">
    <div class="bg-wh-brown text-parchment font-medieval uppercase tracking-widest text-sm px-3 py-1 flex items-center gap-2">
      <span>❧</span>
      <span>{{ title }}</span>
    </div>
    <div class="bg-parchment/80 p-3">
      <slot />
    </div>
  </div>
</template>
