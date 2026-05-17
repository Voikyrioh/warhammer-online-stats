<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import { useDiceStore } from '../../stores/dice'
import SectionPanel from '../ui/SectionPanel.vue'
import type { Weapon } from '../../types/character'

const store = useCharacterStore()
const dice = useDiceStore()
const { character } = store

function addWeapon() {
  character.weapons.push({
    id: crypto.randomUUID(),
    name: 'Nouvelle arme',
    enc: 1,
    group: 'Corps à corps',
    damage: 'BF+3',
    range: 'CàC',
    reload: '-',
    qualities: '',
  })
}

function removeWeapon(id: string) {
  character.weapons = character.weapons.filter(w => w.id !== id)
}

function rollAttack(weapon: Weapon) {
  const cc = store.statCurrent('cc')
  dice.weaponAttackTest(cc, `Attaque: ${weapon.name}`)
}

function rollRanged(weapon: Weapon) {
  const ct = store.statCurrent('ct')
  dice.weaponAttackTest(ct, `Tir: ${weapon.name}`)
}
</script>

<template>
  <SectionPanel title="Armes">
    <div class="overflow-x-auto">
      <table class="w-full text-xs font-body text-wh-text">
        <thead>
          <tr class="bg-wh-mid/20 font-medieval uppercase text-wh-brown text-xs">
            <th class="px-1 py-1 text-left">Nom</th>
            <th class="px-1 py-1">Enc</th>
            <th class="px-1 py-1">Groupe</th>
            <th class="px-1 py-1">Dégâts</th>
            <th class="px-1 py-1">Portée</th>
            <th class="px-1 py-1">Qualités</th>
            <th class="px-1 py-1">Jets</th>
            <th class="px-1 py-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="w in character.weapons" :key="w.id" class="border-b border-wh-mid/20">
            <td class="px-1 py-0.5">
              <input v-model="w.name" class="w-24 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input type="number" v-model.number="w.enc" min="0" max="9"
                class="w-8 text-center bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input v-model="w.group" class="w-20 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5 text-center">
              <input v-model="w.damage" class="w-14 text-center bg-transparent border-b border-wh-mid/50 focus:outline-none" />
              <div class="text-wh-green font-bold text-xs">={{ store.weaponDamage(w) }}</div>
            </td>
            <td class="px-1 py-0.5">
              <input v-model="w.range" class="w-12 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <input v-model="w.qualities" class="w-20 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5">
              <div class="flex gap-1">
                <button @click="rollAttack(w)"
                  class="px-1.5 py-0.5 bg-wh-brown text-parchment rounded text-xs hover:bg-wh-mid" title="Jet CC">
                  CC
                </button>
                <button @click="rollRanged(w)"
                  class="px-1.5 py-0.5 bg-wh-mid text-parchment rounded text-xs hover:bg-wh-brown" title="Jet CT">
                  CT
                </button>
              </div>
            </td>
            <td class="px-1 py-0.5">
              <button @click="removeWeapon(w.id)" class="text-wh-red hover:opacity-70 text-xs">✕</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <button @click="addWeapon"
      class="mt-2 px-3 py-1 bg-wh-brown text-parchment rounded text-xs font-medieval hover:bg-wh-mid transition-colors">
      + Ajouter une arme
    </button>
  </SectionPanel>
</template>
