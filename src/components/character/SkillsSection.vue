<script setup lang="ts">
import { ref } from 'vue'
import { useCharacterStore } from '../../stores/character'
import { useDiceStore } from '../../stores/dice'
import { SKILL_DEFINITIONS } from '../../data/skills'
import SectionPanel from '../ui/SectionPanel.vue'
import type { Skill } from '../../types/character'

const store = useCharacterStore()
const dice = useDiceStore()
const { character } = store

const showAddSkill = ref(false)
const selectedSkillName = ref('')

function addSkill() {
  if (!selectedSkillName.value) return
  const def = SKILL_DEFINITIONS.find(s => s.name === selectedSkillName.value)
  if (!def) return
  if (character.skills.some(s => s.name === def.name)) return
  character.skills.push({
    id: crypto.randomUUID(),
    name: def.name,
    characteristic: def.characteristic,
    advances: 0,
    isAdvanced: def.isAdvanced,
  })
  selectedSkillName.value = ''
  showAddSkill.value = false
}

function addCustomSkill() {
  character.skills.push({
    id: crypto.randomUUID(),
    name: 'Compétence personnalisée',
    characteristic: 'int',
    advances: 0,
    isAdvanced: false,
  })
}

function removeSkill(id: string) {
  character.skills = character.skills.filter(s => s.id !== id)
}

function rollSkill(skill: Skill) {
  const val = store.skillValue(skill)
  if (val <= 0 && skill.isAdvanced) return
  dice.skillTest(val, skill.name)
}

const STAT_LABELS: Record<string, string> = {
  cc: 'CC', ct: 'CT', f: 'F', e: 'E', ag: 'Ag', int: 'Int', fm: 'FM', soc: 'Soc'
}

const availableSkills = SKILL_DEFINITIONS.filter(
  def => !character.skills.some(s => s.name === def.name)
)
</script>

<template>
  <SectionPanel title="Compétences">
    <div class="overflow-x-auto max-h-80 overflow-y-auto">
      <table class="w-full text-xs font-body text-wh-text">
        <thead class="sticky top-0">
          <tr class="bg-wh-mid/30 font-medieval uppercase text-wh-brown text-xs">
            <th class="px-1 py-1 text-left">Compétence</th>
            <th class="px-1 py-1">Car.</th>
            <th class="px-1 py-1">Av.</th>
            <th class="px-1 py-1">Valeur</th>
            <th class="px-1 py-1"></th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="skill in character.skills" :key="skill.id" class="border-b border-wh-mid/20 hover:bg-wh-mid/10">
            <td class="px-1 py-0.5">
              <input v-model="skill.name" class="w-32 bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5 text-center">
              <select v-model="skill.characteristic"
                class="bg-transparent border-b border-wh-mid/50 focus:outline-none text-wh-brown font-medieval text-xs">
                <option v-for="(label, key) in STAT_LABELS" :key="key" :value="key">{{ label }}</option>
              </select>
            </td>
            <td class="px-1 py-0.5">
              <input type="number" v-model.number="skill.advances" min="0" max="99"
                class="w-10 text-center bg-transparent border-b border-wh-mid/50 focus:outline-none" />
            </td>
            <td class="px-1 py-0.5 text-center">
              <span :class="['font-bold', store.skillValue(skill) > 0 ? 'text-wh-green' : 'text-wh-mid']">
                {{ store.skillValue(skill) > 0 ? store.skillValue(skill) : '-' }}
              </span>
            </td>
            <td class="px-1 py-0.5">
              <div class="flex gap-1">
                <button v-if="store.skillValue(skill) > 0"
                  @click="rollSkill(skill)"
                  class="w-5 h-5 rounded border border-wh-gold bg-wh-brown text-parchment text-xs hover:bg-wh-mid"
                  title="Lancer">
                  🎲
                </button>
                <button @click="removeSkill(skill.id)" class="text-wh-red hover:opacity-70 text-xs">✕</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mt-2 flex gap-2 flex-wrap">
      <div v-if="showAddSkill" class="flex gap-1">
        <select v-model="selectedSkillName" class="text-xs border border-wh-mid rounded bg-parchment text-wh-text px-1 focus:outline-none">
          <option value="">-- Choisir --</option>
          <option v-for="s in availableSkills" :key="s.name" :value="s.name">
            {{ s.name }} ({{ STAT_LABELS[s.characteristic] }})
          </option>
        </select>
        <button @click="addSkill" class="px-2 py-0.5 bg-wh-green text-parchment rounded text-xs hover:opacity-80">OK</button>
        <button @click="showAddSkill = false" class="px-2 py-0.5 bg-wh-mid text-parchment rounded text-xs">✕</button>
      </div>
      <template v-else>
        <button @click="showAddSkill = true"
          class="px-3 py-1 bg-wh-brown text-parchment rounded text-xs font-medieval hover:bg-wh-mid">
          + Compétence v2
        </button>
        <button @click="addCustomSkill"
          class="px-3 py-1 bg-wh-mid text-parchment rounded text-xs font-medieval hover:bg-wh-brown">
          + Personnalisée
        </button>
      </template>
    </div>
  </SectionPanel>
</template>
