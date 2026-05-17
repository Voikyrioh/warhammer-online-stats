<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'
import SectionPanel from '../ui/SectionPanel.vue'
import type { BodyLocation } from '../../types/character'

const store = useCharacterStore()
const { character } = store

const LOCATIONS: { key: BodyLocation; label: string }[] = [
  { key: 'tete',   label: 'Tête' },
  { key: 'brasD',  label: 'Bras D.' },
  { key: 'brasG',  label: 'Bras G.' },
  { key: 'corps',  label: 'Corps' },
  { key: 'jambeD', label: 'Jambe D.' },
  { key: 'jambeG', label: 'Jambe G.' },
]
</script>

<template>
  <SectionPanel title="Localisation & Armure">
    <div class="flex gap-3">
      <!-- SVG silhouette -->
      <div class="flex-shrink-0">
        <svg viewBox="0 0 60 120" width="70" height="140" class="text-wh-brown">
          <!-- Tête -->
          <circle cx="30" cy="10" r="8" fill="none" stroke="currentColor" stroke-width="1.5" />
          <!-- Corps -->
          <rect x="18" y="22" width="24" height="32" rx="3" fill="none" stroke="currentColor" stroke-width="1.5" />
          <!-- Bras D -->
          <rect x="5" y="23" width="10" height="26" rx="3" fill="none" stroke="currentColor" stroke-width="1.5" />
          <!-- Bras G -->
          <rect x="45" y="23" width="10" height="26" rx="3" fill="none" stroke="currentColor" stroke-width="1.5" />
          <!-- Jambe D -->
          <rect x="18" y="57" width="10" height="36" rx="3" fill="none" stroke="currentColor" stroke-width="1.5" />
          <!-- Jambe G -->
          <rect x="32" y="57" width="10" height="36" rx="3" fill="none" stroke="currentColor" stroke-width="1.5" />
          <!-- Localisation table indicators -->
          <text x="30" y="11.5" text-anchor="middle" font-size="5" fill="currentColor">01-15</text>
          <text x="30" y="37" text-anchor="middle" font-size="5" fill="currentColor">36-80</text>
          <text x="9" y="34" text-anchor="middle" font-size="4" fill="currentColor">16-35</text>
          <text x="50" y="34" text-anchor="middle" font-size="4" fill="currentColor">36-55</text>
          <text x="22.5" y="74" text-anchor="middle" font-size="4" fill="currentColor">81-90</text>
          <text x="37.5" y="74" text-anchor="middle" font-size="4" fill="currentColor">91+</text>
        </svg>
      </div>
      <!-- PA par localisation -->
      <div class="flex-1">
        <div class="grid grid-cols-2 gap-1.5">
          <div v-for="loc in LOCATIONS" :key="loc.key" class="flex items-center gap-1">
            <span class="text-xs text-wh-brown font-medieval w-14">{{ loc.label }}</span>
            <input
              type="number"
              v-model.number="character.armorByLocation[loc.key]"
              min="0" max="9"
              class="w-10 h-6 text-center border border-wh-mid rounded bg-parchment/60 text-xs font-bold focus:outline-none"
            />
            <span class="text-xs text-wh-mid">PA</span>
          </div>
        </div>
      </div>
    </div>
  </SectionPanel>
</template>
