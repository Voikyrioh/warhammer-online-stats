<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import SectionPanel from '../ui/SectionPanel.vue'
import type { BodyLocation } from '../../types/character'

const store = useCharacterStore()
const { character } = store

const ALL_LOCATIONS: BodyLocation[] = ['tete', 'brasD', 'brasG', 'corps', 'jambeD', 'jambeG']

function addArmor() {
  character.armor.push({
    id: crypto.randomUUID(),
    name: 'Nouvelle armure',
    enc: 1,
    ap: 1,
    locations: ['corps'],
  })
}

function removeArmor(id: string) {
  character.armor = character.armor.filter(a => a.id !== id)
}

function toggleLocation(piece: typeof character.armor[0], loc: BodyLocation) {
  const idx = piece.locations.indexOf(loc)
  if (idx >= 0) {
    piece.locations.splice(idx, 1)
  } else {
    piece.locations.push(loc)
  }
}
</script>

<template>
  <SectionPanel title="Armures">
    <div class="overflow-x-auto">
      <table class="w-full text-xs font-body text-wh-text">
        <thead>
          <tr class="bg-wh-mid/20 font-medieval uppercase text-wh-brown text-xs">
            <th class="px-1 py-1 text-left">Nom</th>
            <th class="px-1 py-1">Enc</th>
            <th class="px-1 py-1">PA</th>
            <th class="px-1 py-1">Zones</th>
            <th class="px-1 py-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="a in character.armor" :key="a.id" class="border-b border-wh-mid/20">
            <td class="px-1 py-0.5">
              <input v-model="a.name" class="w-24 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input type="number" v-model.number="a.enc" min="0" max="9"
                class="w-8 text-center bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input type="number" v-model.number="a.ap" min="0" max="9"
                class="w-8 text-center bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <div class="flex flex-wrap gap-0.5">
                <button
                  v-for="loc in ALL_LOCATIONS" :key="loc"
                  @click="toggleLocation(a, loc)"
                  :class="[
                    'px-1 py-0.5 rounded text-xs border',
                    a.locations.includes(loc)
                      ? 'bg-wh-brown text-parchment border-wh-brown'
                      : 'bg-parchment text-wh-mid border-wh-mid/50'
                  ]"
                >
                  {{ loc === 'tete' ? 'T' : loc === 'brasD' ? 'BD' : loc === 'brasG' ? 'BG' : loc === 'corps' ? 'C' : loc === 'jambeD' ? 'JD' : 'JG' }}
                </button>
              </div>
            </td>
            <td class="px-1 py-0.5">
              <button @click="removeArmor(a.id)" class="text-wh-red hover:opacity-70 text-xs">✕</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="addArmor"
      class="mt-2 px-3 py-1 bg-wh-brown text-parchment rounded text-xs font-medieval hover:bg-wh-mid transition-colors">
      + Ajouter une armure
    </button>
  </SectionPanel>
</template>
