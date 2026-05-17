<script setup lang="ts">
import { COMBAT_ACTIONS } from '../../data/actions'
import SectionPanel from '../ui/SectionPanel.vue'

const types = ['Attaque', 'Défense', 'Mouvement', 'Divers'] as const
</script>

<template>
  <SectionPanel title="Référence — Actions de Combat">
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
      <div v-for="type in types" :key="type">
        <div class="font-medieval text-wh-brown uppercase text-xs border-b border-wh-mid mb-1 pb-0.5">{{ type }}</div>
        <div v-for="action in COMBAT_ACTIONS.filter(a => a.type === type)" :key="action.name" class="mb-1.5">
          <div class="text-xs font-bold text-wh-text">{{ action.name }}</div>
          <div v-if="action.difficulty" class="text-xs text-wh-red italic">{{ action.difficulty }}</div>
          <div class="text-xs text-wh-mid leading-snug">{{ action.description }}</div>
        </div>
      </div>
    </div>
  </SectionPanel>
</template>
