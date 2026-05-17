export interface Stat {
  base: number
  advances: number
}

export interface MainProfile {
  cc:  Stat   // Capacité de Combat
  ct:  Stat   // Capacité de Tir
  f:   Stat   // Force
  e:   Stat   // Endurance
  ag:  Stat   // Agilité
  int: Stat   // Intelligence
  fm:  Stat   // Force Mentale
  soc: Stat   // Sociabilité
}

export type StatKey = keyof MainProfile

export interface SecondaryProfile {
  a:   { advances: number }  // Attaques (base 1 + advances)
  b:   { advances: number }  // Blessures (calculé + advances)
  m:   number                // Mouvement (race)
  mag: number                // Magie
  pf:  number                // Points de Fortune (max = PD)
  pd:  number                // Points de Destin (permanent)
}

export type BodyLocation = 'tete' | 'brasD' | 'brasG' | 'corps' | 'jambeD' | 'jambeG'

export interface Weapon {
  id: string
  name: string
  enc: number
  group: string
  damage: string    // formule ex: "BF", "BF+3", "BF+5"
  range: string
  reload: string
  qualities: string
}

export interface ArmorPiece {
  id: string
  name: string
  enc: number
  ap: number
  locations: BodyLocation[]
}

export interface Skill {
  id: string
  name: string
  characteristic: StatKey
  advances: number
  isAdvanced: boolean
}

export interface Talent {
  id: string
  name: string
  description: string
  timesAcquired: number
}

export interface Spell {
  id: string
  name: string
  cn: number
  type: string
  duration: string
  range: string
  description: string
}

export interface EquipmentItem {
  id: string
  name: string
  qty: number
  enc: number
  notes: string
}

export interface Character {
  // Identité
  name: string
  race: string
  career: string
  previousCareers: string
  age: string
  sex: string
  description: string

  // Profils
  mainProfile: MainProfile
  secondaryProfile: SecondaryProfile

  // Ressources
  woundsAdvances: number
  currentWounds: number
  currentFortune: number

  // Compétences & Talents
  skills: Skill[]
  talents: Talent[]

  // Magie
  spells: Spell[]

  // Combat
  weapons: Weapon[]
  armor: ArmorPiece[]
  armorByLocation: Record<BodyLocation, number>

  // Équipement & Argent
  equipment: EquipmentItem[]
  money: { gold: number; silver: number; brass: number }

  // Divers
  experience: { current: number; total: number }
  insanities: string[]
  notes: string
}
