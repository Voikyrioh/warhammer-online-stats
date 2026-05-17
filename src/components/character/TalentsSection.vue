<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import SectionPanel from '../ui/SectionPanel.vue'

const store = useCharacterStore()
const { character } = store

function addTalent() {
  character.talents.push({
    id: crypto.randomUUID(),
    name: 'Nouveau talent',
    description: '',
    timesAcquired: 1,
  })
}

function removeTalent(id: string) {
  character.talents = character.talents.filter(t => t.id !== id)
}
</script>

<template>
  <SectionPanel title="Talents">
    <div class="max-h-64 overflow-y-auto">
      <div v-for="talent in character.talents" :key="talent.id"
        class="border-b border-wh-mid/20 py-1.5 flex gap-2 items-start">
        <div class="flex-1 flex flex-col gap-1">
          <div class="flex items-center gap-2">
            <input v-model="talent.name"
              class="flex-1 bg-transparent border-b border-wh-mid/50 text-sm font-medieval text-wh-brown focus:outline-none" />
            <input type="number" v-model.number="talent.timesAcquired" min="1" max="9"
              class="w-7 text-center border border-wh-mid/50 rounded bg-parchment/60 text-xs focus:outline-none"
              title="Fois acquis" />
          </div>
          <input v-model="talent.description"
            class="w-full bg-transparent border-b border-wh-mid/30 text-xs text-wh-text focus:outline-none"
            placeholder="Description du talent…" />
        </div>
        <button @click="removeTalent(talent.id)" class="text-wh-red hover:opacity-70 text-xs mt-1">✕</button>
      </div>
    </div>
    <button @click="addTalent"
      class="mt-2 px-3 py-1 bg-wh-brown text-parchment rounded text-xs font-medieval hover:bg-wh-mid transition-colors">
      + Ajouter un talent
    </button>
  </SectionPanel>
</template>
