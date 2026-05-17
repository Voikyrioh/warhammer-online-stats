# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

`fiche-perso-jdr` — a Vue 3 + TypeScript + Vite web app for RPG character sheets ("fiche personnage jeu de rôle").

## Commands

```bash
npm run dev       # Start dev server with HMR
npm run build     # Type-check (vue-tsc) then build for production
npm run preview   # Preview production build locally
```

No test runner or linter is configured yet.

## Architecture

- **Entry**: `index.html` → `src/main.ts` → mounts `src/App.vue` on `#app`
- **Components**: `src/components/` — Vue 3 SFCs using `<script setup lang="ts">`
- **Styles**: global styles in `src/style.css`
- **Assets**: `src/assets/` for images/SVGs

## TypeScript

Strict mode is enabled with `noUnusedLocals`, `noUnusedParameters`, `erasableSyntaxOnly`, and `noUncheckedSideEffectImports`. All Vue SFCs must use `lang="ts"`.
