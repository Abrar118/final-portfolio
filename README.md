# Abrar Mahir Esam — Portfolio

The personal portfolio of Abrar Mahir Esam, a full-stack software engineer in Dhaka, Bangladesh.

**Live:** [abrarmahiresam.tech](https://www.abrarmahiresam.tech/)

## The idea

The site draws a career as a transit map. Each stack is a line, each project or job is a station, and interchanges show where stacks meet. The map is generated from the site's data, so it doubles as an accurate index of the work rather than decoration.

The seven lines:

| Line | Covers |
| --- | --- |
| **M** | ML & Research |
| **F** | Flutter |
| **J** | Java & Spring |
| **C** | Career |
| **T** | TypeScript & React |
| **R** | Rust |
| **A** | Algorithms |

The map comes in two forms:

- **3D:** a three.js model of the network on a lit enamel plate. You can drag it, and the camera flies to a station when you open a project.
- **Flat:** an SVG version of the same map. It's the default for visitors who prefer reduced motion or save data, and the fallback when WebGL isn't available. Everything on the site works in flat mode.

Both themes are supported: light by default, with a dark toggle.

## Pages

| Route | What's there |
| --- | --- |
| `/` | The full draggable map, with the line picker at its bottom left and the 3D/flat toggle at its top right; career highlights, four featured projects, and the seven lines |
| `/projects` | The work list beside the live map. Pointing at a row lifts its station; a line filters the list |
| `/projects/[slug]` | One statically generated page per project, with screenshots, details and stack |
| `/profile` | About: bio, career, research, contests and education |
| `/contact` | A contact form (sent with EmailJS), plus email, social links and contact hours |

Keyboard: `1`–`4` switch pages, and a line's letter (`M`, `F`, `J`, `C`, `T`, `R`, `A`) lights that line.

## Tech stack

- [Next.js 15](https://nextjs.org/) (App Router) and React 19, written in TypeScript
- Tailwind CSS 3, with colours as CSS variables in `app/globals.css`
- [three.js](https://threejs.org/) for the 3D map, loaded as its own chunk in idle time
- [zustand](https://github.com/pmndrs/zustand) for map state
- [EmailJS](https://www.emailjs.com/) for the contact form
- Archivo and Geist Mono for type, [lucide](https://lucide.dev/) and react-icons for icons

## Running it locally

You'll need Node.js 22 or later (the layout check runs TypeScript directly).

```bash
npm install
npm run dev     # http://localhost:3000
```

Other commands:

```bash
npm run build                   # production build
npm run start                   # serve the production build
npm run lint                    # ESLint
node scripts/check-layout.ts    # checks map geometry and label placement
```

Stop the dev server before running `npm run build`; both write to `.next`. There is no test framework; `scripts/check-layout.ts` is the one automated check.

## Project structure

```
app/                     Routes, root layout and global styles
components/network/      The map: 3D model, flat SVG, stage, and shared page parts
components/shared/       Top sign bar, mobile dock, footer
components/about/        Profile page content
components/projects/     Project detail page
data/network.ts          The lines, non-project stations, routes and résumé link
data/home/projects.tsx   Every project
data/about/              Career timeline and achievements
lib/network-layout.ts    Map geometry: rails, 45° bends, interchanges, year zones
lib/network-labels.ts    Places station labels clear of tracks and other labels
lib/network-store.ts     Map mode, active line, focus and camera framing
public/projects/<slug>/  Project screenshots
```

## Adding a project

Add an entry to `data/home/projects.tsx` with a unique `slug`, a `year`, its `stack`, and screenshots under `public/projects/<slug>/`. From that one entry the project gets:

- a row on the Work page,
- its own detail page,
- a station on the map, on every line its stack matches.

Order in the array is the order on the Work page. Run `node scripts/check-layout.ts` afterwards to confirm the map still lays out cleanly.

## More documentation

- [`PRODUCT.md`](PRODUCT.md): who the site is for, its purpose, and the confirmed facts it may state
- [`DESIGN.md`](DESIGN.md): the visual system (colours, type, the sign, the lines)
- [`SECURITY.md`](SECURITY.md): how to report a vulnerability, and how `master` is protected
- [`CLAUDE.md`](CLAUDE.md): architecture notes for working on the code

## Contact

Email [abrarme118@gmail.com](mailto:abrarme118@gmail.com), or find Abrar on [GitHub](https://github.com/Abrar118), [LinkedIn](https://www.linkedin.com/in/abrar118/) and [Codeforces](https://codeforces.com/profile/Abrar_Mahir_Esam).
