<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import SectionPanel from '../ui/SectionPanel.vue'

const store = useCharacterStore()
</script>

<template>
  <SectionPanel title="Mouvement">
    <div class="grid grid-cols-3 gap-2 text-center">
      <div class="flex flex-col items-center">
        <span class="text-xs font-medieval text-wh-brown uppercase">Marche</span>
        <span class="text-xl font-bold font-medieval text-wh-text">{{ store.character.secondaryProfile.m }}</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-xs font-medieval text-wh-brown uppercase">Charge</span>
        <span class="text-xl font-bold font-medieval text-wh-text">{{ store.charge }}</span>
      </div>
      <div class="flex flex-col items-center">
        <span class="text-xs font-medieval text-wh-brown uppercase">Course</span>
        <span class="text-xl font-bold font-medieval text-wh-text">{{ store.run }}</span>
      </div>
    </div>
  </SectionPanel>
</template>
