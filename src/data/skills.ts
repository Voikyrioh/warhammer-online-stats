import type { StatKey } from '../types/character'

export interface SkillDef {
  name: string
  characteristic: StatKey
  isAdvanced: boolean
}

export const SKILL_DEFINITIONS: SkillDef[] = [
  // Compétences de base
  { name: 'Charme',              characteristic: 'soc', isAdvanced: false },
  { name: 'Commandement',        characteristic: 'soc', isAdvanced: false },
  { name: 'Commérage',           characteristic: 'soc', isAdvanced: false },
  { name: 'Commerce',            characteristic: 'int', isAdvanced: false },
  { name: 'Conduite',            characteristic: 'ag',  isAdvanced: false },
  { name: 'Désarmement',         characteristic: 'ag',  isAdvanced: false },
  { name: 'Dissimulation',       characteristic: 'ag',  isAdvanced: false },
  { name: 'Empathie animale',    characteristic: 'soc', isAdvanced: false },
  { name: 'Escroquerie',         characteristic: 'soc', isAdvanced: false },
  { name: 'Esquive',             characteristic: 'ag',  isAdvanced: false },
  { name: 'Filature',            characteristic: 'ag',  isAdvanced: false },
  { name: 'Fouille',             characteristic: 'int', isAdvanced: false },
  { name: 'Intimidation',        characteristic: 'soc', isAdvanced: false },
  { name: 'Jeux de hasard',      characteristic: 'int', isAdvanced: false },
  { name: 'Langue commune',      characteristic: 'int', isAdvanced: false },
  { name: 'Lire/Écrire',         characteristic: 'int', isAdvanced: false },
  { name: 'Marchandage',         characteristic: 'soc', isAdvanced: false },
  { name: 'Métier',              characteristic: 'int', isAdvanced: false },
  { name: 'Natation',            characteristic: 'ag',  isAdvanced: false },
  { name: 'Navigation',          characteristic: 'int', isAdvanced: false },
  { name: 'Perception',          characteristic: 'int', isAdvanced: false },
  { name: 'Premiers secours',    characteristic: 'int', isAdvanced: false },
  { name: 'Résistance à la douleur', characteristic: 'fm', isAdvanced: false },
  { name: 'Soin des animaux',    characteristic: 'int', isAdvanced: false },
  { name: 'Survie',              characteristic: 'int', isAdvanced: false },
  { name: 'Torture',             characteristic: 'soc', isAdvanced: false },
  // Compétences avancées
  { name: 'Artisanat',           characteristic: 'int', isAdvanced: true },
  { name: 'Athlétisme',          characteristic: 'ag',  isAdvanced: true },
  { name: 'Chirurgie',           characteristic: 'int', isAdvanced: true },
  { name: 'Connaissance académique', characteristic: 'int', isAdvanced: true },
  { name: 'Connaissance de la nature', characteristic: 'int', isAdvanced: true },
  { name: 'Crochetage',          characteristic: 'ag',  isAdvanced: true },
  { name: 'Déguisement',         characteristic: 'soc', isAdvanced: true },
  { name: 'Équitation',          characteristic: 'ag',  isAdvanced: true },
  { name: 'Escalade',            characteristic: 'f',   isAdvanced: true },
  { name: 'Expression artistique', characteristic: 'soc', isAdvanced: true },
  { name: 'Furtivité',           characteristic: 'ag',  isAdvanced: true },
  { name: 'Héraldisme',          characteristic: 'int', isAdvanced: true },
  { name: 'Incantation',         characteristic: 'fm',  isAdvanced: true },
  { name: 'Interrogatoire',      characteristic: 'soc', isAdvanced: true },
  { name: 'Jonglerie',           characteristic: 'ag',  isAdvanced: true },
  { name: 'Langue secrète',      characteristic: 'int', isAdvanced: true },
  { name: 'Maîtrise des runes',  characteristic: 'int', isAdvanced: true },
  { name: 'Médecine',            characteristic: 'int', isAdvanced: true },
  { name: 'Mimétisme',           characteristic: 'soc', isAdvanced: true },
  { name: 'Pistage',             characteristic: 'int', isAdvanced: true },
  { name: 'Poisons & Plantes vénéneuses', characteristic: 'int', isAdvanced: true },
  { name: 'Résistance à la magie', characteristic: 'fm', isAdvanced: true },
  { name: 'Runes elfiques',      characteristic: 'int', isAdvanced: true },
  { name: 'Sécurité',            characteristic: 'ag',  isAdvanced: true },
  { name: 'Tir',                 characteristic: 'ct',  isAdvanced: true },
  { name: 'Vol à la tire',       characteristic: 'ag',  isAdvanced: true },
]
