<script setup lang="ts">
import { onMounted } from 'vue'
import { useCharacterStore } from './stores/character'

import CharacterHeader from './components/character/CharacterHeader.vue'
import ProfileTable from './components/character/ProfileTable.vue'
import WoundsSection from './components/character/WoundsSection.vue'
import MovementSection from './components/character/MovementSection.vue'
import FortuneSection from './components/character/FortuneSection.vue'
import ExperienceSection from './components/character/ExperienceSection.vue'
import WeaponsSection from './components/character/WeaponsSection.vue'
import BodyDiagram from './components/character/BodyDiagram.vue'
import SkillsSection from './components/character/SkillsSection.vue'
import TalentsSection from './components/character/TalentsSection.vue'
import SpellsSection from './components/character/SpellsSection.vue'
import EquipmentSection from './components/character/EquipmentSection.vue'
import MoneySection from './components/character/MoneySection.vue'
import InsanitiesSection from './components/character/InsanitiesSection.vue'
import ActionsReference from './components/character/ActionsReference.vue'
import DiceModal from './components/dice/DiceModal.vue'
import DiceHistory from './components/dice/DiceHistory.vue'

const store = useCharacterStore()
onMounted(() => store.loadFromStorage())
</script>

<template>
  <div class="min-h-screen bg-parchment">
    <!-- Texture parchemin en fond -->
    <div class="fixed inset-0 pointer-events-none opacity-5"
      style="background-image: repeating-linear-gradient(0deg, transparent, transparent 30px, rgba(61,31,0,0.1) 30px, rgba(61,31,0,0.1) 31px);">
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-3 py-4 space-y-4">

      <!-- En-tête personnage -->
      <CharacterHeader />

      <!-- Profil principal + secondaire -->
      <ProfileTable />

      <!-- Rangée : Stats vitales -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <WoundsSection />
        <MovementSection />
        <FortuneSection />
        <ExperienceSection />
      </div>

      <!-- Rangée : Armes + Localisation -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <WeaponsSection />
        <BodyDiagram />
      </div>

      <!-- Armures seules -->
      <!-- (fusionné dans WeaponsSection pour l'espace, l'armure par zone est dans BodyDiagram) -->

      <!-- Référence Actions de Combat -->
      <ActionsReference />

      <!-- Rangée : Compétences + Talents -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <SkillsSection />
        <TalentsSection />
      </div>

      <!-- Sorts -->
      <SpellsSection />

      <!-- Rangée : Équipement + Bourse -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-3">
        <div class="lg:col-span-2">
          <EquipmentSection />
        </div>
        <MoneySection />
      </div>

      <!-- Folies + Notes -->
      <InsanitiesSection />

      <!-- Espacement pour le bouton flottant -->
      <div class="h-16" />
    </div>

    <!-- Modale de résultat de jet -->
    <DiceModal />

    <!-- Historique des jets (flottant) -->
    <DiceHistory />
  </div>
</template>
