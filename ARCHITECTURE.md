# Architecture — fiche-perso-jdr

Stack : Vue 3, Vite, TypeScript, Tailwind CSS · Style : atomic design · Entrée : `src/main.ts`  
Maj : 2026-09-14

## Vue d'ensemble

Fiche de personnage JDR (Role-Playing Game) interactive. Vue 3 avec sections multiples (armure, équipement, compétences, sorts, talents, armes, blessures). Système de dés. Calculs de stats de personnage.

## Carte

```
src/
├── components/
│   ├── character/   → sections fiche (header, armor, equipment, skills, spells, talents, weapons, wounds, money, movement, experience, insanities, actions, profile table, body diagram)
│   ├── dice/        → système dés (modal, historique)
│   └── HelloWorld.vue
├── App.vue          → composant racine
├── main.ts          → point d'entrée
└── vite-env.d.ts

docs/               → INDEX.md (adr, business-rules, components, bugs)
