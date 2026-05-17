<script setup lang="ts">
import { computed } from 'vue'
import { useDiceStore } from '../../stores/dice'

const dice = useDiceStore()

const LOCATION_LABELS: Record<string, string> = {
  tete:   'Tête',
  brasD:  'Bras droit',
  brasG:  'Bras gauche',
  corps:  'Corps',
  jambeD: 'Jambe droite',
  jambeG: 'Jambe gauche',
}

const result = computed(() => dice.lastResult)
</script>

<template>
  <Teleport to="body">
    <Transition name="modal">
      <div v-if="dice.showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div class="absolute inset-0 bg-wh-text/60" @click="dice.closeModal()" />

        <!-- Modal -->
        <div class="relative z-10 bg-parchment border-4 border-wh-gold rounded-lg shadow-2xl p-6 max-w-sm w-full font-body"
          style="background-image: url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22><filter id=%22noise%22><feTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/><feColorMatrix type=%22saturate%22 values=%220%22/></filter><rect width=%22100%22 height=%22100%22 filter=%22url(%23noise)%22 opacity=%220.04%22/></svg>')">

          <!-- En-tête -->
          <div class="text-center mb-4">
            <div class="font-medieval text-wh-brown uppercase tracking-widest text-sm">Résultat du Jet</div>
            <div v-if="result" class="font-medieval text-wh-gold text-base mt-1">{{ result.label }}</div>
          </div>

          <template v-if="result">
            <!-- Sort : 2d10 + Mag -->
            <div v-if="result.type === 'spell'" class="text-center">
              <div class="flex justify-center gap-4 mb-3">
                <div class="flex flex-col items-center">
                  <div class="w-14 h-14 border-2 border-wh-mid rounded-lg bg-wh-brown/10 flex items-center justify-center text-3xl font-bold text-wh-text">
                    {{ result.die1 }}
                  </div>
                  <div class="text-xs text-wh-mid mt-0.5">d10</div>
                </div>
                <div class="flex items-center text-2xl font-bold text-wh-mid">+</div>
                <div class="flex flex-col items-center">
                  <div class="w-14 h-14 border-2 border-wh-mid rounded-lg bg-wh-brown/10 flex items-center justify-center text-3xl font-bold text-wh-text">
                    {{ result.die2 }}
                  </div>
                  <div class="text-xs text-wh-mid mt-0.5">d10</div>
                </div>
                <div class="flex items-center text-2xl font-bold text-wh-mid">+</div>
                <div class="flex flex-col items-center">
                  <div class="w-14 h-14 border-2 border-wh-gold rounded-lg bg-wh-gold/20 flex items-center justify-center text-2xl font-bold text-wh-brown">
                    {{ result.mag }}
                  </div>
                  <div class="text-xs text-wh-mid mt-0.5">Mag</div>
                </div>
              </div>
              <div class="text-4xl font-bold font-medieval mb-1" :class="result.success ? 'text-wh-green' : 'text-wh-red'">
                {{ result.castTotal }}
              </div>
              <div class="text-sm text-wh-mid">vs CN {{ result.target }}</div>
              <div class="mt-2 text-lg font-bold" :class="result.success ? 'text-wh-green' : 'text-wh-red'">
                {{ result.success ? '✓ Incantation réussie !' : '✗ Incantation échouée' }}
              </div>
              <!-- Doubles = Malédiction de Tzeentch -->
              <div v-if="result.isTzeentch" class="mt-3 p-2 bg-wh-red/10 border border-wh-red rounded text-wh-red font-bold text-sm">
                ⚠ Malédiction de Tzeentch ! Doubles {{ result.die1 }}-{{ result.die2 }}
              </div>
            </div>

            <!-- Test de caractéristique / compétence / arme -->
            <div v-else class="text-center">
              <!-- Valeur roulée -->
              <div class="w-24 h-24 border-4 rounded-full mx-auto flex items-center justify-center mb-3"
                :class="result.success ? 'border-wh-green bg-wh-green/10' : 'border-wh-red bg-wh-red/10'">
                <span class="text-5xl font-bold font-medieval" :class="result.success ? 'text-wh-green' : 'text-wh-red'">
                  {{ result.roll === 100 ? '00' : result.roll }}
                </span>
              </div>

              <div v-if="result.target" class="text-sm text-wh-mid mb-2">
                Cible : <strong class="text-wh-brown">{{ result.target }}</strong>
              </div>

              <!-- Succès / Échec -->
              <div class="text-xl font-bold font-medieval mb-2" :class="result.success ? 'text-wh-green' : 'text-wh-red'">
                {{ result.success ? '✓ Succès' : '✗ Échec' }}
              </div>

              <!-- Critique (doubles) -->
              <div v-if="result.isDouble" class="mb-2 p-1.5 rounded text-sm font-bold"
                :class="result.success ? 'bg-wh-green/20 text-wh-green border border-wh-green' : 'bg-wh-red/20 text-wh-red border border-wh-red'">
                {{ result.success ? '★ Réussite critique !' : '☠ Échec critique !' }}
              </div>

              <!-- Degrés de succès -->
              <div v-if="result.dos !== undefined" class="text-sm text-wh-mid mb-2">
                DS : <strong :class="result.success ? 'text-wh-green' : 'text-wh-red'">{{ result.dos }}</strong>
              </div>

              <!-- Localisation (si attaque) -->
              <div v-if="result.type === 'weapon' && result.hitLocation" class="p-2 bg-wh-brown/10 border border-wh-mid rounded text-sm">
                <span class="font-medieval text-wh-brown uppercase text-xs">Zone touchée : </span>
                <strong class="text-wh-text">{{ LOCATION_LABELS[result.hitLocation] }}</strong>
              </div>
            </div>
          </template>

          <!-- Bouton fermer -->
          <div class="mt-5 text-center">
            <button @click="dice.closeModal()"
              class="px-6 py-2 bg-wh-brown text-parchment rounded font-medieval uppercase text-sm hover:bg-wh-mid transition-colors border border-wh-gold">
              Fermer
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.2s ease;
}
.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}
.modal-enter-active .relative,
.modal-leave-active .relative {
  transition: transform 0.2s ease;
}
.modal-enter-from .relative,
.modal-leave-to .relative {
  transform: scale(0.9);
}
</style>
