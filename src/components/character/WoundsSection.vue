<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import SectionPanel from '../ui/SectionPanel.vue'

const store = useCharacterStore()
const { character } = store
</script>

<template>
  <SectionPanel title="Blessures">
    <div class="flex flex-col gap-3">
      <div class="flex justify-around text-center">
        <div class="flex flex-col items-center gap-1">
          <span class="text-xs font-medieval text-wh-brown uppercase">Total</span>
          <span class="text-2xl font-bold text-wh-red font-medieval">{{ store.totalWounds }}</span>
        </div>
        <div class="flex flex-col items-center gap-1">
          <span class="text-xs font-medieval text-wh-brown uppercase">Actuelles</span>
          <input
            type="number"
            v-model.number="character.currentWounds"
            :min="0"
            :max="store.totalWounds"
            class="w-14 h-9 text-center text-xl font-bold border-2 border-wh-red rounded bg-parchment text-wh-red focus:outline-none focus:ring-1 focus:ring-wh-red"
          />
        </div>
      </div>
      <!-- Barre de blessures -->
      <div class="flex flex-wrap gap-1 justify-center">
        <button
          v-for="i in store.totalWounds"
          :key="i"
          @click="character.currentWounds = i <= character.currentWounds ? character.currentWounds - 1 : i"
          :class="[
            'w-5 h-5 rounded border text-xs',
            i <= character.currentWounds
              ? 'bg-wh-red border-wh-red text-parchment'
              : 'bg-parchment border-wh-mid'
          ]"
          :title="`Blessure ${i}`"
        />
      </div>
    </div>
  </SectionPanel>
</template>
