# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary: recruiters and engineering leads, local or remote, evaluating Abrar as a hire. They often arrive from a CV, LinkedIn or GitHub link and decide in under a minute whether to look further, usually on a desktop during the work day and sometimes on a phone.

Their job: judge real engineering depth quickly, then contact Abrar or open the résumé.

## Product Purpose

The personal portfolio of Abrar Mahir Esam, a full-stack software engineer in Dhaka, Bangladesh. It exists to get him hired. Success means a qualified visitor understands what he has built at production scale and reaches out.

## Positioning

One engineer who architects production systems end to end, from data model to mobile client, with a competitive programmer's foundation. A neighbour cannot truthfully copy this combination: principal architect of a clinical platform, architect of a government duty platform, published Rust tooling, IEEE-published research, and an MSc on local LLM agents.

## Operating Context

Visitors compare this site against a CV PDF, a GitHub profile and other candidates' portfolios. They may skim, skip animation or be on a slow connection, so the content has to stand without the 3D.

## Capabilities and Constraints

- Next.js 15 App Router, React 19, Tailwind, three.js already in place. No test framework.
- Routes and functions to preserve: home, profile, project index, a statically generated detail page per project, EmailJS contact form, résumé link, dark and light themes.
- Project content lives in `data/`. Adding a project must stay a single data entry.
- The site must work with WebGL unavailable, reduced motion and save-data.
- Real-time 3D stays as a signature, in a new concept. The forest and game language (quests, lore, inventory, zones) is retired.
- NDA: the Psycloud and Prime Minister's Office descriptions stay exactly as written. Add no further detail about either: no case studies, architecture write-ups or new figures.
- Public contact details are email and social links, with contact hours of 10 AM to 7 PM BDT. These are hours for getting in touch, not a statement of job availability. Street address and phone number stay off the site's pages.

## Brand Commitments

- Name: Abrar Mahir Esam. Domain: abrarmahiresam.tech.
- Voice: first person, plain and factual. His own words on the site: he likes "understanding how things work — and making them work a little better."

## Evidence on Hand

The CV on [Google Drive](https://drive.google.com/file/d/1eZUsSET8zvuxdD0g8htX1td60L3bXPXC/view?usp=sharing) is the source of truth and agrees with the GitHub README. Abrar updates it in place there, so the site links to it rather than keeping a copy.

- **Bengal Byte**, Full-Stack Software Engineer, Aug 2025 – Aug 2026: principal architect of Psycloud, a clinical platform serving 1,000+ users, on Next.js (TypeScript), FastAPI (Python), PostgreSQL, Redis and Docker; practitioner dashboard, assessment engine, EU data-protection-compliant backend.
- **Prime Minister's Office, Bangladesh**, part-time contract, May 2024 – May 2026: Spring Boot (Java 21) backend for 300 concurrent users, with JWT/OAuth, Redis, HATEOAS REST APIs, React and Flutter clients.
- **Nyntax**, Apr 2025 – Aug 2025: SoftCar rental platform modules, JS to TS migration, AI-agent session-recording browser extension.
- **Nogor Solutions**, trainee, Feb – Mar 2024. **MIST Computer Club**, mentor, three batches.
- **Projects** (`data/home/projects.tsx`, images in `public/projects/`): Astryn (Tauri/Rust desktop command center, v5.0.1 per its README), QuickDev (Rust CLI on crates.io and npm, peaked at 530 downloads/week), Nudge, CrimeLens (WebXtreme 2025 top 11), EduVerse, GreenCycle (IEEE QPAIN 2025), SpendSplit, ACPSCM and others.
- **Research**: IEEE QPAIN 2025 paper; B.Sc. thesis on Romanized Bengali feedback analysis; M.Sc. thesis in progress on adaptive control of local LLM agents on consumer hardware; a personal local LLM fallback stack (llama.cpp, Ollama, quantized models).
- **Competitive programming**: Codeforces Specialist, peak 1425, 496 problems solved; Champion, MIST Independence Day Contest 2022; BUET DevSprint 2024 finalist.
- **Education**: B.Sc. CSE, MIST, CGPA 3.56/4.00, 2021–2025; part-time M.Sc., 2025 – present.
- **Portraits**: `public/hero-portrait.jpg`, `public/avatar*.jpg`.

Project order is set by Abrar: Psycloud, SoftCar, SpendSplit, Nudge, Astryn, QuickDev, then the rest. SoftCar screenshots were captured from https://softcartech.com/.

Absent, and not to be invented: testimonials, employer logos used as endorsement, Psycloud screens behind its login (public: https://www.psycloud.ai/ and the login at https://app.psycloud.ai/login; Abrar confirmed the GAM Medical name may be shown), any metric beyond those above. Current employment and availability are not confirmed; do not state either.

## Product Principles

1. Evidence before atmosphere: a visitor should meet real work and real numbers first, with no gate in front of them.
2. The 3D has to mean something about the work, or it goes.
3. Plain language: no game metaphors or labels a recruiter must decode.
4. Every path ends within reach of contact or the résumé.

## Accessibility & Inclusion

WCAG AA contrast, full keyboard use, and complete content with `prefers-reduced-motion`, save-data or no WebGL.
