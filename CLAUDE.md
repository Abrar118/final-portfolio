# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal developer portfolio for Abrar Mahir Esam. Live at https://www.abrarmahiresam.dev/. GitHub: https://github.com/Abrar118.

`PRODUCT.md` holds audience and confirmed facts, `DESIGN.md` the visual system. The CV at `public/Abrar-Mahir-Esam-CV.pdf` and the GitHub README are the sources of truth for facts.

## Commands

```bash
npm run dev    # Start dev server (localhost:3000)
npm run build  # Production build
npm run lint   # ESLint
node scripts/check-layout.ts  # Checks map geometry and label placement
```

No test framework is configured. Stop the dev server before `npm run build`: both write to `.next`.

## Architecture

Next.js 15 App Router with React 19. Uses `@/*` path alias mapped to project root. Light theme by default via `next-themes`; dark is a toggle.

### Concept: The Network

The site is a transit map of the career: each stack is a line, each project or job a station, and interchanges show where stacks meet. The map is generated from data, so it is an accurate index and not decoration.

- `data/network.ts` — the seven lines, non-project stops (jobs, research, contests), routes and résumé URL. Projects join lines automatically by matching their `stack`.
- `lib/network-layout.ts` — pure geometry: rails, 45° bends, bundles at interchanges, year zones. `wide` and `tall` (phones) orientations.
- `lib/network-labels.ts` — scores label positions against tracks, stations and other labels.
- `components/network/NetworkWorld.ts` — framework-free three.js model on a lit enamel plate. Lazy-loaded as its own chunk; never import it statically.
- `components/network/NetworkStage.tsx` — fixed behind every page. Paints the flat SVG (`FlatMap.tsx`), loads the model in idle time, positions station labels as real links, and maps route to camera view.
- `components/network/parts.tsx` — `MapHero` (the black sign, which reports its top edge so the camera frames the clear space above it), `Route` and `Stopline` (the unbroken page line with its sticky train), `LinePicker`, `Bullet`.
- `lib/network-store.ts` — zustand store: map mode, status, active line, focus, insets, dispatch.

Map mode (`3d`/`flat`) persists in localStorage (`network-map-mode`); defaults to flat for reduced-motion or save-data users, and falls back to flat if WebGL fails. All content must work in flat mode.

### Routes

- `/` — Full-bleed draggable model + sign with avatar, career figures, four featured projects as colour fields, the seven lines
- `/projects` — Work list beside the live map, which turns on end on desktop; pointing at a row lifts its station
- `/projects/[slug]` — Statically generated; camera flies to the station, other lines drain
- `/profile` — About: bio, career, research, contests, education
- `/contact` — EmailJS form; a successful send runs a train to the hollow Next stop station

### Navigation

`components/shared/SignBar.tsx`: a black sign along the top, and a bottom dock at 860px and below. Keys: 1–4 change page, a line's letter lights that line.

### Design system

Colours are CSS variables in `app/globals.css`, including `--line-<id>` and `--line-<id>-ink`. The 3D palette is `THEMES` in `NetworkStage.tsx`; keep the two in step. Type is Archivo (`--font-sign`) everywhere, with Geist Mono (`.data`) only for dates and figures. See `DESIGN.md`.

### Data layer

All portfolio content lives in static TypeScript files under `data/`:
- `data/home/projects.tsx` — Project entries (type in `types/project.ts`). Array order is the order shown on the Work page. Psycloud's images come from its public site, as the dashboard is behind a login.
- `data/home/socials.ts`, `data/about/timeline.ts`, `data/about/achievements.ts`.

To add a project: add an entry to `data/home/projects.tsx` with a unique `slug`, a `year` and images under `public/projects/<slug>/`; it appears in the work list, gets a detail page and a station automatically.

### Key dependencies

- `three` — the model (dynamic import only).
- `zustand` — map store.
- `lucide-react` for UI icons; `developer-icons` and `react-icons` for brands.
- `@emailjs/browser`, `sonner`.

### Images

All remote image hostnames are allowed (`next.config.mjs`). Project images live in `public/projects/<project-name>/`.
