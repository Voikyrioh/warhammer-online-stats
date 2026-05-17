<script setup lang="ts">
import { ref } from 'vue'
import { useDiceStore } from '../../stores/dice'

const dice = useDiceStore()
const open = ref(false)

const LOCATION_LABELS: Record<string, string> = {
  tete: 'Tête', brasD: 'Bras D.', brasG: 'Bras G.',
  corps: 'Corps', jambeD: 'Jambe D.', jambeG: 'Jambe G.',
}
</script>

<template>
  <!-- Bouton flottant -->
  <button
    @click="open = !open"
    class="fixed bottom-4 right-4 z-40 w-12 h-12 rounded-full bg-wh-brown border-2 border-wh-gold text-parchment text-xl shadow-xl hover:bg-wh-mid transition-colors flex items-center justify-center"
    title="Historique des jets"
  >
    🎲
  </button>

  <!-- Panel coulissant -->
  <Teleport to="body">
    <Transition name="slide">
      <div v-if="open"
        class="fixed bottom-0 right-0 z-40 w-80 max-h-[60vh] bg-parchment border-t-2 border-l-2 border-wh-gold rounded-tl-lg shadow-2xl flex flex-col"
      >
        <div class="bg-wh-brown text-parchment font-medieval uppercase tracking-widest text-sm px-3 py-2 flex justify-between items-center">
          <span>❧ Historique des Jets</span>
          <button @click="open = false" class="text-parchment hover:text-wh-gold text-lg leading-none">✕</button>
        </div>
        <div class="flex-1 overflow-y-auto divide-y divide-wh-mid/20">
          <div v-if="dice.history.length === 0" class="p-4 text-center text-sm text-wh-mid italic">
            Aucun jet effectué
          </div>
          <div
            v-for="r in dice.history" :key="r.id"
            class="px-3 py-2 text-xs hover:bg-wh-mid/10"
          >
            <div class="flex justify-between items-start gap-2">
              <span class="font-medieval text-wh-brown">{{ r.label }}</span>
              <span :class="r.success ? 'text-wh-green font-bold' : 'text-wh-red font-bold'">
                {{ r.success ? '✓' : '✗' }}
              </span>
            </div>
            <!-- Sort -->
            <div v-if="r.type === 'spell'" class="text-wh-mid mt-0.5">
              2d10 ({{ r.die1 }}+{{ r.die2 }}) + Mag {{ r.mag }} = {{ r.castTotal }} vs CN {{ r.target }}
              <span v-if="r.isTzeentch" class="text-wh-red font-bold ml-1">⚠ Tzeentch !</span>
            </div>
            <!-- Autre -->
            <div v-else class="text-wh-mid mt-0.5">
              Jet : {{ r.roll }} / Cible : {{ r.target }}
              <span v-if="r.isDouble" class="ml-1 text-wh-gold font-bold">★ Double</span>
              <span v-if="r.type === 'weapon' && r.hitLocation" class="ml-1">
                → {{ LOCATION_LABELS[r.hitLocation] }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.25s ease, opacity 0.25s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
