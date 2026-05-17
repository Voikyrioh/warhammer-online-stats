export interface CombatAction {
  name: string
  type: 'Attaque' | 'Défense' | 'Mouvement' | 'Divers'
  description: string
  difficulty?: string
}

export const COMBAT_ACTIONS: CombatAction[] = [
  // Attaques
  { name: 'Attaque standard', type: 'Attaque', description: 'Test de CC ou CT. BF + modificateurs de dégâts.', difficulty: 'Normal' },
  { name: 'Attaque en force', type: 'Attaque', description: 'Test de CC -20%. +1 au BF en cas de succès.', difficulty: '-20%' },
  { name: 'Attaque rapide', type: 'Attaque', description: 'Deux attaques au test de CC -20% chacune.', difficulty: '-20%' },
  { name: 'Attaque en brisement', type: 'Attaque', description: 'Test de CC vs CC adverse. Désarme si succès.', difficulty: 'Opposé CC' },
  { name: 'Attaque en désarmement', type: 'Attaque', description: 'Test de CC -20%. Désarme si succès.', difficulty: '-20%' },
  { name: 'Feinte', type: 'Attaque', description: 'Test de CC opposé à CC adverse. L\'adversaire ne peut pas parer.', difficulty: 'Opposé CC' },
  { name: 'Charge', type: 'Attaque', description: 'Déplacement M×2 + attaque CC. +1 dégât si arme de charge.', difficulty: 'Normal' },
  { name: 'Tir visé', type: 'Attaque', description: 'Prépare tir (+20% CT au prochain tour). Perd action.', difficulty: 'Normal' },
  // Défenses
  { name: 'Parade', type: 'Défense', description: 'Test de CC. Annule une attaque en CàC. 1 parade/round.', difficulty: 'Normal' },
  { name: 'Esquive active', type: 'Défense', description: 'Test d\'Esquive. Annule une attaque. 1 esquive/round.', difficulty: 'Normal' },
  { name: 'Résistance', type: 'Défense', description: 'Absorbe les dégâts avec armure + TAL. Toujours disponible.', difficulty: 'Auto' },
  // Mouvement
  { name: 'Mouvement normal', type: 'Mouvement', description: 'Se déplace de M cases. Action gratuite.', difficulty: 'Auto' },
  { name: 'Course', type: 'Mouvement', description: 'Se déplace de M×4 cases. Pas d\'action de combat.', difficulty: 'Auto' },
  { name: 'Charge', type: 'Mouvement', description: 'Se déplace de M×2 cases vers une cible pour attaquer.', difficulty: 'Auto' },
  { name: 'Retraite', type: 'Mouvement', description: 'Se déplace de M cases en s\'éloignant d\'un adversaire. Test AG.', difficulty: 'AG' },
  // Divers
  { name: 'Se relever', type: 'Divers', description: 'Passe d\'à terre à debout. Coûte une action complète.', difficulty: 'Auto' },
  { name: 'Saisir', type: 'Divers', description: 'Test de CC +10%. Immobilise l\'adversaire.', difficulty: '+10%' },
  { name: 'Préparer une arme', type: 'Divers', description: 'Dégaine ou rengaine une arme. Action complète.', difficulty: 'Auto' },
  { name: 'Concentration magique', type: 'Divers', description: 'Prépare une incantation. Peut octroyer des bonus selon le sort.', difficulty: 'FM' },
]
