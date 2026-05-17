<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import { useDiceStore } from '../../stores/dice'
import type { StatKey } from '../../types/character'

const store = useCharacterStore()
const dice = useDiceStore()
const { character } = store

const MAIN_STATS: { key: StatKey; label: string; abbr: string }[] = [
  { key: 'cc',  label: 'Capacité de Combat', abbr: 'CC' },
  { key: 'ct',  label: 'Capacité de Tir',    abbr: 'CT' },
  { key: 'f',   label: 'Force',               abbr: 'F' },
  { key: 'e',   label: 'Endurance',           abbr: 'E' },
  { key: 'ag',  label: 'Agilité',             abbr: 'Ag' },
  { key: 'int', label: 'Intelligence',        abbr: 'Int' },
  { key: 'fm',  label: 'Force Mentale',       abbr: 'FM' },
  { key: 'soc', label: 'Sociabilité',         abbr: 'Soc' },
]

function rollStat(key: StatKey, abbr: string) {
  const target = store.statCurrent(key)
  dice.characteristicTest(target, abbr)
}
</script>

<template>
  <div class="border-2 border-wh-mid rounded overflow-hidden shadow-md">
    <div class="bg-wh-brown text-parchment font-medieval uppercase tracking-widest text-sm px-3 py-1">
      ❧ Profil
    </div>
    <div class="overflow-x-auto">
      <table class="w-full text-center font-body text-wh-text text-sm">
        <thead>
          <tr class="bg-wh-mid/30">
            <th class="px-2 py-1 font-medieval text-xs uppercase">Stat</th>
            <th v-for="s in MAIN_STATS" :key="s.key" class="px-1 py-1 font-medieval text-xs uppercase text-wh-brown">
              {{ s.abbr }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-wh-mid/30">
            <td class="px-2 py-1 text-xs text-wh-mid font-medieval uppercase text-left">Initiale</td>
            <td v-for="s in MAIN_STATS" :key="s.key" class="px-1 py-0.5">
              <input
                type="number"
                v-model.number="character.mainProfile[s.key].base"
                min="1" max="99"
                class="w-10 text-center border border-wh-mid/50 rounded bg-parchment/60 focus:outline-none focus:ring-1 focus:ring-wh-gold text-sm"
              />
            </td>
          </tr>
          <tr class="border-b border-wh-mid/30">
            <td class="px-2 py-1 text-xs text-wh-mid font-medieval uppercase text-left">Avances</td>
            <td v-for="s in MAIN_STATS" :key="s.key" class="px-1 py-0.5">
              <input
                type="number"
                v-model.number="character.mainProfile[s.key].advances"
                min="0" max="99"
                class="w-10 text-center border border-wh-mid/50 rounded bg-parchment/60 focus:outline-none focus:ring-1 focus:ring-wh-gold text-sm"
              />
            </td>
          </tr>
          <tr class="bg-wh-gold/10">
            <td class="px-2 py-1 text-xs text-wh-brown font-medieval uppercase text-left font-bold">Actuel</td>
            <td v-for="s in MAIN_STATS" :key="s.key" class="px-1 py-1">
              <button
                @click="rollStat(s.key, s.abbr)"
                class="w-10 h-7 rounded border border-wh-gold bg-wh-brown text-parchment font-bold hover:bg-wh-mid transition-colors text-sm"
                :title="`Lancer ${s.abbr} (${store.statCurrent(s.key)})`"
              >
                {{ store.statCurrent(s.key) }}
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- Profil secondaire -->
    <div class="border-t border-wh-mid/50 bg-wh-mid/10 p-2">
      <div class="grid grid-cols-6 gap-2 text-center text-xs font-body">
        <div class="flex flex-col items-center gap-0.5">
          <span class="font-medieval text-wh-brown uppercase text-xs">A</span>
          <span class="font-bold text-wh-text">{{ store.attacks }}</span>
          <input type="number" v-model.number="character.secondaryProfile.a.advances" min="0" max="9"
            class="w-8 h-5 text-center border border-wh-mid/50 rounded bg-parchment/60 text-xs focus:outline-none" />
        </div>
        <div class="flex flex-col items-center gap-0.5">
          <span class="font-medieval text-wh-brown uppercase text-xs">B</span>
          <span class="font-bold text-wh-text">{{ store.totalWounds }}</span>
          <input type="number" v-model.number="character.woundsAdvances" min="0" max="99"
            class="w-8 h-5 text-center border border-wh-mid/50 rounded bg-parchment/60 text-xs focus:outline-none" />
        </div>
        <div class="flex flex-col items-center gap-0.5">
          <span class="font-medieval text-wh-brown uppercase text-xs">M</span>
          <input type="number" v-model.number="character.secondaryProfile.m" min="1" max="10"
            class="w-8 h-7 text-center border border-wh-mid/50 rounded bg-parchment/60 text-sm font-bold focus:outline-none" />
        </div>
        <div class="flex flex-col items-center gap-0.5">
          <span class="font-medieval text-wh-brown uppercase text-xs">Mag</span>
          <input type="number" v-model.number="character.secondaryProfile.mag" min="0" max="5"
            class="w-8 h-7 text-center border border-wh-mid/50 rounded bg-parchment/60 text-sm font-bold focus:outline-none" />
        </div>
        <div class="flex flex-col items-center gap-0.5">
          <span class="font-medieval text-wh-brown uppercase text-xs">PF</span>
          <input type="number" v-model.number="character.secondaryProfile.pf" min="0" max="9"
            class="w-8 h-7 text-center border border-wh-mid/50 rounded bg-parchment/60 text-sm font-bold focus:outline-none" />
        </div>
        <div class="flex flex-col items-center gap-0.5">
          <span class="font-medieval text-wh-brown uppercase text-xs">PD</span>
          <input type="number" v-model.number="character.secondaryProfile.pd" min="0" max="9"
            class="w-8 h-7 text-center border border-wh-mid/50 rounded bg-parchment/60 text-sm font-bold focus:outline-none" />
        </div>
      </div>
    </div>
  </div>
</template>
