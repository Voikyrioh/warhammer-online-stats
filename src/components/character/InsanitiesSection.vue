<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import SectionPanel from '../ui/SectionPanel.vue'

const store = useCharacterStore()
const { character } = store

function addInsanity() {
  character.insanities.push('')
}

function removeInsanity(idx: number) {
  character.insanities.splice(idx, 1)
}
</script>

<template>
  <SectionPanel title="Folie & Notes">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
      <div>
        <div class="text-xs font-medieval text-wh-brown uppercase mb-1">Folies</div>
        <div class="flex flex-col gap-1 max-h-32 overflow-y-auto">
          <div v-for="(_insanity, idx) in character.insanities" :key="idx" class="flex items-center gap-1">
            <input v-model="character.insanities[idx]"
              class="flex-1 border-b border-wh-mid/50 bg-transparent text-xs focus:outline-none text-wh-text"
              placeholder="Description de la folie…" />
            <button @click="removeInsanity(idx)" class="text-wh-red hover:opacity-70 text-xs">✕</button>
          </div>
        </div>
        <button @click="addInsanity"
          class="mt-1 px-2 py-0.5 bg-wh-red text-parchment rounded text-xs font-medieval hover:opacity-80">
          + Folie
        </button>
      </div>
      <div>
        <div class="text-xs font-medieval text-wh-brown uppercase mb-1">Notes</div>
        <textarea
          v-model="character.notes"
          rows="5"
          class="w-full border border-wh-mid/50 rounded bg-parchment/60 text-xs text-wh-text p-1 focus:outline-none resize-none"
          placeholder="Notes diverses…"
        />
      </div>
    </div>
  </SectionPanel>
</template>
