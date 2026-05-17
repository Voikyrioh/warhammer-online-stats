<script setup lang="ts">
import { useCharacterStore } from '../../stores/character'

const store = useCharacterStore()
const { character } = store

function handleImport(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (file) store.importJSON(file)
}
</script>

<template>
  <div class="border-2 border-wh-gold rounded bg-wh-brown text-parchment p-4 shadow-lg">
    <div class="flex flex-wrap items-center gap-4 mb-3">
      <h1 class="font-medieval text-2xl tracking-widest flex-1 min-w-40">
        <input
          v-model="character.name"
          class="bg-transparent border-b border-wh-gold w-full focus:outline-none text-parchment placeholder:text-parchment/50"
          placeholder="Nom du Personnage"
        />
      </h1>
      <div class="flex gap-2">
        <button
          @click="store.exportJSON()"
          class="px-3 py-1 bg-wh-gold text-wh-text rounded text-sm font-medieval hover:bg-yellow-400 transition-colors"
        >
          Export JSON
        </button>
        <label class="px-3 py-1 bg-wh-mid text-parchment rounded text-sm font-medieval hover:bg-wh-brown cursor-pointer transition-colors border border-wh-gold">
          Import JSON
          <input type="file" accept=".json" class="hidden" @change="handleImport" />
        </label>
        <button
          @click="store.resetCharacter()"
          class="px-3 py-1 bg-wh-red text-parchment rounded text-sm font-medieval hover:opacity-80 transition-colors"
          title="Réinitialiser la fiche"
        >
          Reset
        </button>
      </div>
    </div>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
      <div class="flex flex-col">
        <label class="text-xs uppercase tracking-wider text-wh-gold font-medieval">Race</label>
        <input v-model="character.race" class="bg-transparent border-b border-wh-mid text-parchment focus:outline-none text-sm" />
      </div>
      <div class="flex flex-col">
        <label class="text-xs uppercase tracking-wider text-wh-gold font-medieval">Carrière</label>
        <input v-model="character.career" class="bg-transparent border-b border-wh-mid text-parchment focus:outline-none text-sm" />
      </div>
      <div class="flex flex-col">
        <label class="text-xs uppercase tracking-wider text-wh-gold font-medieval">Carrières précédentes</label>
        <input v-model="character.previousCareers" class="bg-transparent border-b border-wh-mid text-parchment focus:outline-none text-sm" />
      </div>
      <div class="flex flex-col">
        <label class="text-xs uppercase tracking-wider text-wh-gold font-medieval">Âge</label>
        <input v-model="character.age" class="bg-transparent border-b border-wh-mid text-parchment focus:outline-none text-sm" />
      </div>
      <div class="flex flex-col">
        <label class="text-xs uppercase tracking-wider text-wh-gold font-medieval">Sexe</label>
        <input v-model="character.sex" class="bg-transparent border-b border-wh-mid text-parchment focus:outline-none text-sm" />
      </div>
      <div class="flex flex-col col-span-2 md:col-span-1">
        <label class="text-xs uppercase tracking-wider text-wh-gold font-medieval">Description</label>
        <input v-model="character.description" class="bg-transparent border-b border-wh-mid text-parchment focus:outline-none text-sm" />
      </div>
    </div>
  </div>
</template>
