import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Character, StatKey, Skill, Weapon } from '../types/character'

const STORAGE_KEY = 'wh-character'

function defaultCharacter(): Character {
  return {
    name: 'Nouveau Personnage',
    race: 'Humain',
    career: '',
    previousCareers: '',
    age: '',
    sex: '',
    description: '',
    mainProfile: {
      cc:  { base: 30, advances: 0 },
      ct:  { base: 25, advances: 0 },
      f:   { base: 30, advances: 0 },
      e:   { base: 30, advances: 0 },
      ag:  { base: 30, advances: 0 },
      int: { base: 30, advances: 0 },
      fm:  { base: 30, advances: 0 },
      soc: { base: 30, advances: 0 },
    },
    secondaryProfile: {
      a:   { advances: 0 },
      b:   { advances: 0 },
      m:   4,
      mag: 0,
      pf:  2,
      pd:  2,
    },
    woundsAdvances: 0,
    currentWounds: 10,
    currentFortune: 2,
    skills: [],
    talents: [],
    spells: [],
    weapons: [],
    armor: [],
    armorByLocation: { tete: 0, brasD: 0, brasG: 0, corps: 0, jambeD: 0, jambeG: 0 },
    equipment: [],
    money: { gold: 0, silver: 0, brass: 0 },
    experience: { current: 0, total: 0 },
    insanities: [],
    notes: '',
  }
}

export const useCharacterStore = defineStore('character', () => {
  const character = ref<Character>(defaultCharacter())

  // --- Getters ---

  function statCurrent(key: StatKey): number {
    const s = character.value.mainProfile[key]
    return s.base + s.advances
  }

  const bf = computed(() => Math.floor(statCurrent('f') / 10))
  const be = computed(() => Math.floor(statCurrent('e') / 10))
  const fmb = computed(() => Math.floor(statCurrent('fm') / 10))

  const totalWounds = computed(() =>
    bf.value + be.value * 2 + fmb.value + character.value.woundsAdvances
  )

  const attacks = computed(() => 1 + character.value.secondaryProfile.a.advances)

  const charge = computed(() => character.value.secondaryProfile.m * 2)
  const run = computed(() => character.value.secondaryProfile.m * 4)

  function skillValue(skill: Skill): number {
    const base = statCurrent(skill.characteristic)
    if (skill.advances > 0) return base + skill.advances
    if (!skill.isAdvanced) return Math.floor(base / 2)
    return 0
  }

  function weaponDamage(weapon: Weapon): string {
    const bfVal = bf.value
    return weapon.damage.replace(/BF/g, String(bfVal))
  }

  function resolvedWeaponDamage(weapon: Weapon): number {
    const bfVal = bf.value
    const formula = weapon.damage.replace(/BF/g, String(bfVal))
    try {
      // Simple evaluation: handle "N", "N+M", "N-M"
      const match = formula.match(/^(\d+)([+-]\d+)?$/)
      if (match) {
        const base = parseInt(match[1])
        const mod = match[2] ? parseInt(match[2]) : 0
        return base + mod
      }
    } catch (_) {
      // ignore
    }
    return bfVal
  }

  // --- Persistence ---

  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(character.value))
  }

  function loadFromStorage() {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return
    try {
      const parsed = JSON.parse(raw) as Character
      character.value = { ...defaultCharacter(), ...parsed }
      // Ensure nested objects are complete
      character.value.mainProfile = { ...defaultCharacter().mainProfile, ...parsed.mainProfile }
      character.value.secondaryProfile = { ...defaultCharacter().secondaryProfile, ...parsed.secondaryProfile }
      character.value.armorByLocation = { ...defaultCharacter().armorByLocation, ...parsed.armorByLocation }
      character.value.money = { ...defaultCharacter().money, ...parsed.money }
      character.value.experience = { ...defaultCharacter().experience, ...parsed.experience }
    } catch (_) {
      console.warn('Failed to load character from storage')
    }
  }

  watch(character, save, { deep: true })

  // --- Import / Export ---

  function exportJSON() {
    const blob = new Blob([JSON.stringify(character.value, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${character.value.name || 'personnage'}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  function importJSON(file: File) {
    return new Promise<void>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = (e) => {
        try {
          const parsed = JSON.parse(e.target?.result as string) as Character
          character.value = { ...defaultCharacter(), ...parsed }
          character.value.mainProfile = { ...defaultCharacter().mainProfile, ...parsed.mainProfile }
          character.value.secondaryProfile = { ...defaultCharacter().secondaryProfile, ...parsed.secondaryProfile }
          character.value.armorByLocation = { ...defaultCharacter().armorByLocation, ...parsed.armorByLocation }
          character.value.money = { ...defaultCharacter().money, ...parsed.money }
          character.value.experience = { ...defaultCharacter().experience, ...parsed.experience }
          resolve()
        } catch (err) {
          reject(err)
        }
      }
      reader.onerror = reject
      reader.readAsText(file)
    })
  }

  function resetCharacter() {
    character.value = defaultCharacter()
  }

  return {
    character,
    // Getters
    statCurrent,
    bf,
    be,
    fmb,
    totalWounds,
    attacks,
    charge,
    run,
    skillValue,
    weaponDamage,
    resolvedWeaponDamage,
    // Actions
    loadFromStorage,
    exportJSON,
    importJSON,
    resetCharacter,
  }
})
