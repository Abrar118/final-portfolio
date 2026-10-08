# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal developer portfolio for Abrar Mahir Esam. Live at https://www.abrarmahiresam.dev/. GitHub: https://github.com/Abrar118.

## Commands

```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build
npm run lint   # ESLint
```

No test framework is configured.

## Architecture

Next.js 15 App Router with React 19. Uses `@/*` path alias mapped to project root. Dark theme ("Dusk") by default via `next-themes`; light theme is "Dawn".

### Concept: the Forest of Code

The site is a game-like journey through a low-poly 3D forest. Every route is a **zone** on one trail (`data/zones.ts`): `/` The Trailhead (spirit-fire camp), `/profile` The Elder Grove (ancient tree), `/projects` The Crystal Hollow (one crystal per project), `/contact` Beacon Hill (tower with a sky beam). The camera walks the trail between zones on navigation.

- `components/world/forest/ForestWorld.ts` — framework-free three.js scene (procedural terrain, instanced trees, fireflies, aurora sky, landmarks). Lazy-loaded as its own chunk; never import it statically.
- `components/world/forest/palette.ts` — dusk/dawn color palettes for the scene.
- `components/world/ForestCanvas.tsx` — mounts the scene and syncs route → zone, theme, scroll, pointer, focused project, beacon flare.
- `components/world/WorldStage.tsx` — fixed backdrop in the layout: `StaticForest` (CSS/SVG, always painted first) + the 3D canvas (loaded in idle time, fades in) + readability scrim.
- `components/world/TitleScreen.tsx` — "press start" screen shown once per session on `/`; choose 3D or static ("quiet path").
- `components/world/ZoneBanner.tsx` — "New area discovered" title card on zone change.
- `lib/world.ts` — zustand store (world mode, gate, scene status, focused project, flare, visited zones) plus `worldBootScript`, an inline `<head>` script that sets `html[data-world]`/`html[data-gate]` before paint.

World mode (`3d`/`static`) persists in localStorage (`forest-world`); defaults to static for reduced-motion or save-data users, and falls back to static if WebGL fails. The scene adapts pixel ratio to frame time and caps mobile at ~30fps.

### Routes

- `/` — Hero + character sheet, "Main Quests" (featured projects), "The Inventory" (skills as item slots in tabbed bags)
- `/profile` — "The Lore": bio, "The Path So Far" timeline, "Achievements Unlocked"
- `/projects` — "Quest Log": vertical quest tablist (roman numerals) + stage panel; keyboard-navigable; selecting a quest lights its crystal
- `/projects/[slug]` — Quest detail (statically generated): gallery, lore, objectives, rewards (stack), prev/next quest
- `/contact` — "Light the Beacon" EmailJS form; a successful send flares the beacon in 3D

### Navigation

`components/shared/GameMenu.tsx`: on lg+ a fixed left "pause menu" (player card, explored-zones bar, chapter bars with hotkeys 1–4, World 3D/Static and Time Dusk/Dawn toggles, résumé, socials). Below lg it becomes a bottom dock with a settings sheet. Content is offset with `.app-main` (`padding-left: 300px` on lg).

### Design system

Forest palette: primary = chartreuse (green + yellow), secondary = teal, deep teal-black background. All colors are HSL CSS variables in `app/globals.css`. Glassmorphism via `.glass` (blurred tinted panel + chartreuse→teal rim). Other building blocks: `.btn`/`.btn-primary`, `.seg` (segmented toggle), `.hud-label`, `.chapter-chip`, `.chip`, `.quest-tag`, `.text-glow`, `.page-wrap`, `.page-title`, `.section-title`.

Typography: Cinzel (`font-display`, via `next/font/google`) for titles and game UI; Geist (`font-body`) for text; Geist Mono for keys/HUD numbers. `prefers-reduced-motion` is respected (CSS + slowed scene, no camera flights).

### Data layer

All portfolio content lives in static TypeScript files under `data/`:
- `data/home/projects.tsx` — Project entries (type in `types/project.ts`). Order defines quest numbers and crystal order.
- `data/home/skillsTab.ts` — Skills by category with icons and brand colors.
- `data/home/socials.ts`, `data/about/timeline.ts`, `data/about/achievements.ts`.
- `data/zones.ts` — zones/routes, hotkeys, résumé URL.

To add a project: add an entry to `data/home/projects.tsx` with a unique `slug` and images under `public/projects/<slug>/`; it appears in the quest log, gets a detail page and a crystal automatically.

### Key dependencies

- `three` — 3D forest (dynamic import only).
- `framer-motion` — page/title/banner transitions (`app/template.tsx`).
- `zustand` — world store.
- `developer-icons`, `react-icons`, `lucide-react` (prefer lucide for new UI icons).
- `@emailjs/browser`, `sonner`.

### Images

All remote image hostnames are allowed (`next.config.mjs`). Project images live in `public/projects/<project-name>/`.
