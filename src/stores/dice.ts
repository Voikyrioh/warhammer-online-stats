import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { BodyLocation } from '../types/character'

export type RollType = 'characteristic' | 'skill' | 'weapon' | 'spell' | 'custom'

export interface RollResult {
  id: string
  label: string
  type: RollType
  roll: number
  target?: number
  success?: boolean
  isDouble?: boolean
  isCritical?: boolean
  dos?: number
  hitLocation?: BodyLocation
  // Pour magie
  die1?: number
  die2?: number
  mag?: number
  castTotal?: number
  isTzeentch?: boolean
  timestamp: Date
}

function d100(): number { return Math.floor(Math.random() * 100) + 1 }
function d10(): number  { return Math.floor(Math.random() * 10) + 1 }
function uid(): string  { return Math.random().toString(36).slice(2, 9) }

function hitLocationFromRoll(roll: number): BodyLocation {
  // Inverse les chiffres du jet pour déterminer la localisation
  const loc = (roll % 10) * 10 + Math.floor(roll / 10)
  const v = loc === 0 ? 100 : loc
  if (v <= 15) return 'tete'
  if (v <= 35) return 'brasD'
  if (v <= 55) return 'brasG'
  if (v <= 80) return 'corps'
  if (v <= 90) return 'jambeD'
  return 'jambeG'
}

function isDouble(roll: number): boolean {
  if (roll === 100) return true
  const tens = Math.floor(roll / 10)
  const ones = roll % 10
  return tens === ones
}

export const useDiceStore = defineStore('dice', () => {
  const history = ref<RollResult[]>([])
  const lastResult = ref<RollResult | null>(null)
  const showModal = ref(false)

  function pushResult(result: RollResult) {
    history.value.unshift(result)
    if (history.value.length > 20) history.value.pop()
    lastResult.value = result
    showModal.value = true
  }

  function characteristicTest(target: number, label: string, type: RollType = 'characteristic'): RollResult {
    const roll = d100()
    const success = roll <= target
    const dbl = isDouble(roll)
    const dos = Math.floor(Math.abs(target - roll) / 10)
    const result: RollResult = {
      id: uid(),
      label,
      type,
      roll,
      target,
      success,
      isDouble: dbl,
      isCritical: dbl,
      dos: success ? dos : -dos,
      hitLocation: hitLocationFromRoll(roll),
      timestamp: new Date(),
    }
    pushResult(result)
    return result
  }

  function skillTest(target: number, label: string): RollResult {
    return characteristicTest(target, label, 'skill')
  }

  function weaponAttackTest(ccTarget: number, weaponLabel: string): RollResult {
    const roll = d100()
    const success = roll <= ccTarget
    const dbl = isDouble(roll)
    const dos = Math.floor(Math.abs(ccTarget - roll) / 10)
    const result: RollResult = {
      id: uid(),
      label: weaponLabel,
      type: 'weapon',
      roll,
      target: ccTarget,
      success,
      isDouble: dbl,
      isCritical: dbl && success,
      dos: success ? dos : -dos,
      hitLocation: hitLocationFromRoll(roll),
      timestamp: new Date(),
    }
    pushResult(result)
    return result
  }

  function magicCastRoll(mag: number, cn: number, label: string): RollResult {
    const die1 = d10()
    const die2 = d10()
    const castTotal = die1 + die2 + mag
    const success = castTotal >= cn
    const doubles = die1 === die2
    const result: RollResult = {
      id: uid(),
      label,
      type: 'spell',
      roll: castTotal,
      target: cn,
      success,
      isDouble: doubles,
      isCritical: doubles,
      isTzeentch: doubles,
      die1,
      die2,
      mag,
      castTotal,
      timestamp: new Date(),
    }
    pushResult(result)
    return result
  }

  function closeModal() {
    showModal.value = false
  }

  return {
    history,
    lastResult,
    showModal,
    characteristicTest,
    skillTest,
    weaponAttackTest,
    magicCastRoll,
    closeModal,
  }
})
