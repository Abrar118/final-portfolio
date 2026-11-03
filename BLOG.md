# Blog handoff

For the next Claude Code session (local, with access to the other repos and the writing and creative files). It covers how the blog works, what is already published, what is weak or unverified, and what is left to write. `CLAUDE.md` has the overall architecture; this file is only about the blog.

## How it works

| What | Where |
|---|---|
| Posts (all content) | `data/blog/posts.ts`, newest first |
| Index page `/blog` | `app/blog/page.tsx` |
| Post page `/blog/[slug]` | `app/blog/[slug]/page.tsx` (static, from `posts`) |
| Body renderer | `components/blog/PostBody.tsx` |
| "On this page" tree | `components/shared/Toc.tsx`, `lib/toc.ts` |
| Styles | the "Blog" and "Table of contents" sections at the end of `app/globals.css` |
| Images | `public/blog/<slug>/` (see below for reusing project screenshots) |
| Nav | `routes` in `data/network.ts`: Blog is key `4`, Contact is `5` |

### Adding a post
Add an entry at the top of `posts` in `data/blog/posts.ts`:

```ts
{ slug, title, date: "YYYY-MM-DD", summary, tags: string[], github?: string, body: Block[] }
```

`body` is a list of blocks:

| Block | Use |
|---|---|
| `{ t: "p", text }` | Paragraph |
| `{ t: "h", text, level? }` | Heading. Level 2 by default, `3` nests under the previous level 2 in the contents tree |
| `{ t: "ul", items }` | Bullet list |
| `{ t: "code", text }` | Code block |
| `{ t: "table", head, rows }` | Table |
| `{ t: "img", src, alt, width, height, caption? }` | One image from `public/` (give real pixel size) |
| `shots(slug, labels, tall?)` | Gallery that reuses the screenshots already attached to a project in `data/home/projects.tsx`, in that order, one label each. `tall` is for phone screenshots |

Inside any text: `` `code` ``, `**bold**` and `[text](url)`. A link starting with `/` is an internal link; anything else opens in a new tab.

The contents tree builds itself from the `h` blocks. It hides when a post has fewer than two headings. Headings become anchors, so keep them unique and stable.

Run `npm run lint`, `npx tsc --noEmit` and `npm run build` before pushing. Stop any dev server before building.

## Published posts

All dated 2026-11-03 as a placeholder. Set real dates.

| Slug | What it is | State |
|---|---|---|
| `four-things-ive-been-building` | QuickDev, Astryn, local LLM fallback, this portfolio | The local LLM section is thin (see below) |
| `claude-workflow` | The claude-workflow repo as a post | Derived from that repo's README and `WORKFLOW.md` |
| `offline-first-flutter-spendsplit-nudge` | SpendSplit and Nudge | Facts come from project data; some opinion lines are mine |
| `rebuilding-mat-bank` | MAT Bank 2022 to v2.0 | No source link yet |
| `greencycle-ieee-qpain` | GreenCycle and the IEEE QPAIN 2025 paper | No source link; no results from the paper |
| `romanized-bengali-sentiment` | B.Sc. thesis | **Thinnest post.** No results, dataset size or models |

## Needs your facts (highest priority)

The posts were written from the portfolio's own data files and public READMEs only. The previous session could not see private repos, the thesis, the paper or the CV.

1. **Thesis post.** Add what the thesis actually did and found: dataset size and how it was built, models and paradigms compared, headline results, emotion classes. The current text only states the topic and why Romanized Bengali is hard.
2. **Local LLM section** (inside `four-things-ive-been-building`). Add concrete detail: hardware, tokens per second, which model for which job, what "tuned" meant in practice. Current text only says llama.cpp, Ollama and quantized Qwen and Gemma models of 9B to 27B.
3. **GreenCycle post.** Add the paper's real contribution and numbers, such as model accuracy and the evaluation. The text now only lists features. The app screenshots are captioned "App screen 1/2/3" because the project data does not say what they show; give them real captions.
4. **Source links.** `rebuilding-mat-bank`, `greencycle-ieee-qpain` and `romanized-bengali-sentiment` have no `github` field. The MAT Bank repo is probably `Abrar118/Final_bank`; confirm before linking. Do not link private repos.
5. **Mod count mismatch.** The `claude-workflow` post and the repo README say **12** mods; the project entry in `data/home/projects.tsx` says **11**. Check the repo and make both agree.

## First-person lines to confirm sound like you

These are interpretations written on your behalf. Keep, reword or cut:

- `offline-first-flutter-spendsplit-nudge`: "The rule I'm most attached to…", "The part I like is the escalation engine", and the whole closing section "What local-first costs and buys"
- `four-things-ive-been-building`: "something got on my nerves, so I made it stop", "a lot for something I built to scratch my own itch", "One choice worth calling out…"
- `rebuilding-mat-bank`: "the one I'd tell anyone to make early"

## Still to write

Agreed with the owner; do not write the skipped ones.

**7. Full stack across Spring Boot, FastAPI and Node: when to use each.** Not written; the owner wants to see the outline first.
- Angle: three production backends, three different choices, and a short "how I choose" checklist at the end.
- Spring Boot: Java 21 on PostgreSQL, Flyway migrations, HATEOAS APIs, JWT, OAuth, RBAC, Redis session revocation, passkeys, MFA, rate limiting, audit logging. Best where correctness and security come first.
- FastAPI: Psycloud's Python backend with Next.js, PostgreSQL, Redis and Docker; health data under EU data-protection rules; the assessment engine that scores questionnaires.
- Node: Express with MongoDB and React on SoftCar, and the JavaScript-to-TypeScript migration.
- Needs from the owner: their actual reasons for each choice. The data lists the stacks but not why. Describe the government platform generically; do not name the client unless told to.

**14. Poems and drawing.** Not written; outline first.
- Angle: why a developer's blog has a post about poems and drawing, and how making things by hand feeds the engineering. A short personal piece with one poem and a few sketches or Inktober drawings.
- Needs from the owner: the poems and drawings to use. The portfolio only says "I write poems and draw, from quick sketches to Inktober."

**Skipped on purpose for now:** the Psycloud post, the government-platform post, and the Codeforces and hackathon posts.

## Voice

Friendly, concrete, not stiff and not chatty. Short sentences, specific numbers, no hype and no filler. Do not invent results, quotes or reasons; if a fact is missing, ask. Several writing plugins are installed in the owner's Claude (Writing Intelligence Studio, Content Studio, Online Writing). The previous session used one script from Writing Intelligence Studio, `text-quality-check`, on each post's prose (reading ease target 55+, passive voice under 15%, no AI-style phrases). All posts passed except GreenCycle's reading ease (39), which is dragged down by the exact paper title; that is fine.

## Sources of truth

- Facts about the owner: the CV (linked as `RESUME_URL` in `data/network.ts`), the GitHub READMEs, and `PRODUCT.md`. Do not add a local copy of the CV to `public/`.
- Project facts and screenshots: `data/home/projects.tsx`.
- Career and research text: `data/about/timeline.ts`, `data/about/achievements.ts`.

## Gotchas

- The default branch is `master`, not `main`.
- Page scrolling is smooth (`scroll-behavior: smooth`). Wait about two seconds after a programmatic scroll before reading scroll-dependent state in browser tests.
- Don't `pkill -f "next start"` from the same shell command; it matches itself. Use `fuser -k 3111/tcp`.
- The old branch `claude/beautiful-pascal-6z8ke2` still exists on GitHub. The PR was merged from `feature/blog`; delete the old one when convenient.
- The contents tree is hidden under 1100px on blog posts (a collapsible box takes over) and under 1200px on project pages.
