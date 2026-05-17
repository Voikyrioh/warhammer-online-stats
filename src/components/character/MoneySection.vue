<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import SectionPanel from '../ui/SectionPanel.vue'

const store = useCharacterStore()
const { character } = store
</script>

<template>
  <SectionPanel title="Bourse">
    <div class="grid grid-cols-3 gap-3 text-center">
      <div class="flex flex-col items-center gap-1">
        <div class="w-8 h-8 rounded-full bg-wh-gold border-2 border-yellow-600 flex items-center justify-center text-xs font-bold text-wh-text">Or</div>
        <input type="number" v-model.number="character.money.gold" min="0"
          class="w-14 h-8 text-center font-bold border border-wh-gold rounded bg-parchment text-wh-text focus:outline-none" />
      </div>
      <div class="flex flex-col items-center gap-1">
        <div class="w-8 h-8 rounded-full bg-gray-300 border-2 border-gray-500 flex items-center justify-center text-xs font-bold text-wh-text">Arg</div>
        <input type="number" v-model.number="character.money.silver" min="0"
          class="w-14 h-8 text-center font-bold border border-gray-400 rounded bg-parchment text-wh-text focus:outline-none" />
      </div>
      <div class="flex flex-col items-center gap-1">
        <div class="w-8 h-8 rounded-full bg-amber-700 border-2 border-amber-900 flex items-center justify-center text-xs font-bold text-parchment">Cu</div>
        <input type="number" v-model.number="character.money.brass" min="0"
          class="w-14 h-8 text-center font-bold border border-amber-700 rounded bg-parchment text-wh-text focus:outline-none" />
      </div>
    </div>
  </SectionPanel>
</template>
