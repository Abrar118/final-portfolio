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

Next.js 14 App Router with React 18. Uses `@/*` path alias mapped to project root. Dark theme by default via `next-themes`. React Strict Mode is disabled (`next.config.mjs`).

### Routes

- `/` — Home: illuminated title-page hero, "The Armory" skills grid, "Quests & Works" featured project cards
- `/profile` — About page with bio, timeline, achievements (server component with metadata)
- `/projects` — Game-style showcase: vertical "quest index" tablist (roman-numeral spines) selects one project into a large stage panel with image, features, stack, and links; category filters on top. Keyboard-navigable (arrow keys), horizontal rail on mobile.
- `/projects/[slug]` — Individual project detail with image gallery, features, breadcrumb nav (server component with dynamic metadata via `generateMetadata`)
- `/contact` — Contact form using EmailJS (client-side email via `@emailjs/browser`)

### Design System

Medieval / illuminated-manuscript aesthetic. Light mode (default) is aged parchment with iron-gall ink text; dark mode is a "candlelit scriptorium" (warm near-black, parchment text). Accents: oxblood (`--primary`/`--accent`/`--oxblood`), forest green (`--secondary`/`--forest`), restrained gold-leaf (`--gold`, `--ring`). All colors are HSL CSS variables in `app/globals.css`; in dark mode `--accent` shifts to gold ("rubrication by day, gilding by night"). No neon, no pure white; keep gold decorative (borders, large display text) — it fails AA for body text.

Typography: Cinzel (section headings, `font-heading`) + Cinzel Decorative (hero name and drop caps, `font-display`) + EB Garamond (body, `font-body`) + Geist Mono (`font-mono`, legacy). Loaded via `next/font/google` in `app/layout.tsx`.

Manuscript utilities in `globals.css`: `text-gilded` (gold-leaf gradient text), `rubric` (red-ink small-caps eyebrow), `drop-cap` (illuminated first letter), `frame-double` (double-rule frame), `wax-seal` (oxblood seal social buttons). A fixed SVG-noise paper grain overlays the whole page via `body::after`. Shared ornament components (Crest, FiligreeDivider, SectionHeading, WaxSeal, CornerOrnaments) live in `components/ui/ornaments.tsx`.

Sections use medieval framing: Home hero (illuminated title page) → "The Armory" (skills) → "Quests & Works" (projects); `/profile` is "The Chronicle" + "Deeds & Service" + "Honours & Feats"; `/contact` is "Send Word". Nav labels: Home / Chronicle / Quests / Send Word. Decorative numerals are Roman (with Arabic equivalents for screen readers).

### Page transitions

`app/template.tsx` wraps all routes in `framer-motion` `AnimatePresence` with a subtle fade+slide transition (250ms). Re-mounts on every navigation.

### Data layer

All portfolio content lives in static TypeScript files under `data/`:
- `data/home/projects.tsx` — Project entries with JSX content, images, tech stacks, features. Uses the `Project` type from `types/project.ts`.
- `data/home/skillsTab.ts` — Skills organized by category (Web, Mobile, Systems, Databases) with icon components and colors.
- `data/home/socials.ts` — Social media links.
- `data/about/timeline.ts` — Work/experience history.
- `data/about/achievements.ts` — Awards and competition results.

To add a new project: add an entry to `data/home/projects.tsx` with a unique `slug`, import project images from `public/projects/<slug>/`, and it appears in both the home grid and the projects page automatically.

### Component organization

- `components/ui/` — shadcn/ui primitives plus custom UI components (`spotlight.tsx`, `floating-dock.tsx`, etc.).
- `components/home/` — Home page sections (Hero, GridLayout/skills bento, ProjectSection grid, SkillCard).
- `components/projects/` — Project detail page (`ProjectDetailsContainer`).
- `components/shared/` — Layout-level components (Navbar, Footer).
- `components/about/` — Profile page content.

### Styling

Tailwind CSS 3 with `tailwindcss-animate`. shadcn/ui with "default" style, CSS variables. Palette colors `gold`, `oxblood`, `forest` map to CSS variables in tailwind config. Custom animations: `fade-in`, `slide-up`, `slide-in-right`, `float`, `pulse-glow`, `spotlight`, `shimmer`. `--radius` is 0.25rem (rectilinear, manuscript-like); `prefers-reduced-motion` is respected globally (CSS media query + `MotionConfig reducedMotion="user"` in `app/template.tsx`).

### Key dependencies

- `framer-motion` — Animations and page transitions.
- `@react-three/fiber` + `three` — 3D rendering (Avatar components, legacy).
- `developer-icons` — Tech stack icons in project entries.
- `react-icons` + `@tabler/icons-react` + `lucide-react` — Icons (prefer `lucide-react` for new code).
- `@emailjs/browser` — Client-side contact form email sending.
- `sonner` — Toast notifications.

### Navigation

Single consolidated bottom nav bar (`components/shared/Navbar.tsx`). Floating pill design with animated active indicator (`layoutId="nav-pill"`). Includes theme toggle. Fixed at bottom center of viewport.

### Images

All remote image hostnames are allowed (`hostname: "**"` in `next.config.mjs`). Project images are stored in `public/projects/<project-name>/`. Avatar images in `public/` root.
