<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import SectionPanel from '../ui/SectionPanel.vue'

const store = useCharacterStore()
const { character } = store
</script>

<template>
  <SectionPanel title="Expérience">
    <div class="grid grid-cols-2 gap-3 text-center">
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs font-medieval text-wh-brown uppercase">XP Actuel</span>
        <input type="number" v-model.number="character.experience.current" min="0"
          class="w-16 h-8 text-center font-bold border border-wh-mid rounded bg-parchment text-wh-text focus:outline-none" />
      </div>
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs font-medieval text-wh-brown uppercase">XP Total</span>
        <input type="number" v-model.number="character.experience.total" min="0"
          class="w-16 h-8 text-center font-bold border border-wh-mid rounded bg-parchment text-wh-text focus:outline-none" />
      </div>
    </div>
  </SectionPanel>
</template>
