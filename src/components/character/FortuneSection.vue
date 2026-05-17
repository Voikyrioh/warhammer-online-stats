<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import SectionPanel from '../ui/SectionPanel.vue'

const store = useCharacterStore()
const { character } = store
</script>

<template>
  <SectionPanel title="Fortune & Destin">
    <div class="grid grid-cols-2 gap-3 text-center">
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs font-medieval text-wh-brown uppercase">PF Max</span>
        <input type="number" v-model.number="character.secondaryProfile.pf" min="0" max="9"
          class="w-12 h-8 text-center font-bold border border-wh-mid rounded bg-parchment text-wh-text focus:outline-none" />
      </div>
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs font-medieval text-wh-brown uppercase">PF Actuels</span>
        <input type="number" v-model.number="character.currentFortune" min="0" :max="character.secondaryProfile.pf"
          class="w-12 h-8 text-center font-bold border border-wh-gold rounded bg-parchment text-wh-gold focus:outline-none" />
      </div>
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs font-medieval text-wh-brown uppercase">PD Permanents</span>
        <input type="number" v-model.number="character.secondaryProfile.pd" min="0" max="9"
          class="w-12 h-8 text-center font-bold border border-wh-mid rounded bg-parchment text-wh-text focus:outline-none" />
      </div>
      <div class="flex flex-col items-center gap-1">
        <span class="text-xs font-medieval text-wh-brown uppercase">Cases Fortune</span>
        <div class="flex gap-1">
          <button
            v-for="i in character.secondaryProfile.pf"
            :key="i"
            @click="character.currentFortune = i <= character.currentFortune ? character.currentFortune - 1 : i"
            :class="[
              'w-5 h-5 rounded-full border text-xs',
              i <= character.currentFortune ? 'bg-wh-gold border-wh-gold' : 'bg-parchment border-wh-mid'
            ]"
          />
        </div>
      </div>
    </div>
  </SectionPanel>
</template>
