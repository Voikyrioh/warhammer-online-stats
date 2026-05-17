<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import { useDiceStore } from '../../stores/dice'
import SectionPanel from '../ui/SectionPanel.vue'
import type { Spell } from '../../types/character'

const store = useCharacterStore()
const dice = useDiceStore()
const { character } = store

function addSpell() {
  character.spells.push({
    id: crypto.randomUUID(),
    name: 'Nouveau sort',
    cn: 5,
    type: 'Petite Magie',
    duration: '1 round',
    range: 'Vue',
    description: '',
  })
}

function removeSpell(id: string) {
  character.spells = character.spells.filter(s => s.id !== id)
}

function castSpell(spell: Spell) {
  const mag = character.secondaryProfile.mag
  dice.magicCastRoll(mag, spell.cn, spell.name)
}
</script>

<template>
  <SectionPanel title="Sorts & Magie">
    <div class="mb-2 flex items-center gap-2">
      <span class="text-xs font-medieval text-wh-brown uppercase">Mag :</span>
      <span class="font-bold text-wh-text">{{ character.secondaryProfile.mag }}</span>
    </div>
    <div class="overflow-x-auto max-h-72 overflow-y-auto">
      <table class="w-full text-xs font-body text-wh-text">
        <thead class="sticky top-0">
          <tr class="bg-wh-mid/20 font-medieval uppercase text-wh-brown text-xs">
            <th class="px-1 py-1 text-left">Sort</th>
            <th class="px-1 py-1">CN</th>
            <th class="px-1 py-1">Type</th>
            <th class="px-1 py-1">Durée</th>
            <th class="px-1 py-1">Portée</th>
            <th class="px-1 py-1">Description</th>
            <th class="px-1 py-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="spell in character.spells" :key="spell.id" class="border-b border-wh-mid/20 hover:bg-wh-mid/10">
            <td class="px-1 py-0.5">
              <input v-model="spell.name" class="w-28 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input type="number" v-model.number="spell.cn" min="0" max="30"
                class="w-8 text-center bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input v-model="spell.type" class="w-20 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input v-model="spell.duration" class="w-16 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input v-model="spell.range" class="w-14 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input v-model="spell.description" class="w-32 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <div class="flex gap-1">
                <button @click="castSpell(spell)"
                  class="px-1.5 py-0.5 bg-wh-brown text-parchment rounded text-xs hover:bg-wh-mid"
                  :title="`Incanter ${spell.name} (2d10 + ${character.secondaryProfile.mag} vs CN ${spell.cn})`">
                  ✦ Cast
                </button>
                <button @click="removeSpell(spell.id)" class="text-wh-red hover:opacity-70 text-xs">✕</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="addSpell"
      class="mt-2 px-3 py-1 bg-wh-brown text-parchment rounded text-xs font-medieval hover:bg-wh-mid transition-colors">
      + Ajouter un sort
    </button>
  </SectionPanel>
</template>
