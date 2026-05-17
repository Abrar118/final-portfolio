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

- `/` — Home: Hero with spotlight effects, bento grid skills, featured project cards
- `/profile` — About page with bio, timeline, achievements (server component with metadata)
- `/projects` — Full grid of all projects as cards
- `/projects/[slug]` — Individual project detail with image gallery, features, breadcrumb nav (server component with dynamic metadata via `generateMetadata`)
- `/contact` — Contact form using EmailJS (client-side email via `@emailjs/browser`)

### Design System

Dark purple-centered color theme. Primary accent: violet (`#7C3AED`). All colors defined as HSL CSS variables in `app/globals.css` with light and dark variants. The `chart1`–`chart5` tokens map to the purple scale for backwards compatibility.

Typography: Space Grotesk (headings, `font-heading`) + Archivo (body, `font-body`) + Geist Mono (code, `font-mono`). Loaded via `next/font/google` in `app/layout.tsx`.

Utility classes: `text-gradient` (purple gradient text), `glow-purple` / `glow-purple-sm` (box-shadow glow effects).

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

Tailwind CSS 3 with `tailwindcss-animate`. shadcn/ui with "default" style, CSS variables. Custom violet color scale (`violet-50` through `violet-950`) in tailwind config. Custom animations: `fade-in`, `slide-up`, `slide-in-right`, `float`, `pulse-glow`, `spotlight`, `shimmer`.

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
