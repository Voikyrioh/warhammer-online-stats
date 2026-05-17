<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import SectionPanel from '../ui/SectionPanel.vue'

const store = useCharacterStore()
const { character } = store

function addItem() {
  character.equipment.push({
    id: crypto.randomUUID(),
    name: 'Nouvel objet',
    qty: 1,
    enc: 0,
    notes: '',
  })
}

function removeItem(id: string) {
  character.equipment = character.equipment.filter(e => e.id !== id)
}
</script>

<template>
  <SectionPanel title="Équipement">
    <div class="overflow-x-auto max-h-64 overflow-y-auto">
      <table class="w-full text-xs font-body text-wh-text">
        <thead class="sticky top-0">
          <tr class="bg-wh-mid/20 font-medieval uppercase text-wh-brown text-xs">
            <th class="px-1 py-1 text-left">Objet</th>
            <th class="px-1 py-1">Qté</th>
            <th class="px-1 py-1">Enc</th>
            <th class="px-1 py-1 text-left">Notes</th>
            <th class="px-1 py-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in character.equipment" :key="item.id" class="border-b border-wh-mid/20">
            <td class="px-1 py-0.5">
              <input v-model="item.name" class="w-28 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input type="number" v-model.number="item.qty" min="0" max="999"
                class="w-10 text-center bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input type="number" v-model.number="item.enc" min="0" max="99"
                class="w-10 text-center bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input v-model="item.notes" class="w-32 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <button @click="removeItem(item.id)" class="text-wh-red hover:opacity-70 text-xs">✕</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="addItem"
      class="mt-2 px-3 py-1 bg-wh-brown text-parchment rounded text-xs font-medieval hover:bg-wh-mid transition-colors">
      + Ajouter un objet
    </button>
  </SectionPanel>
</template>
