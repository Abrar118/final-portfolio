/* Blog posts. Array order is the order shown on /blog (newest first).
   Body text is a list of blocks. Inline `code` and [links](https://…) work in
   any text field. Images live in public/blog/<slug>/. */

import type { StaticImageData } from "next/image";
import { projects } from "@/data/home/projects";

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "ul"; items: string[] }
  | { t: "code"; text: string }
  | { t: "table"; head: string[]; rows: string[][] }
  | { t: "gallery"; name: string; tall?: boolean; items: { src: StaticImageData; label: string }[] }
  | { t: "img"; src: string; alt: string; width: number; height: number; caption?: string };

export type Post = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  summary: string;
  tags: string[];
  github?: string;
  body: Block[];
};

const IMG = "/blog/claude-workflow";

/* Screenshots already attached to a project, in the order they are listed
   there, with a caption for each. */
const shots = (slug: string, labels: string[], tall = false): Block => {
  const images = projects.find((p) => p.slug === slug)!.images as StaticImageData[];
  return {
    t: "gallery",
    name: projects.find((p) => p.slug === slug)!.title,
    tall,
    items: labels.map((label, i) => ({ src: images[i], label })),
  };
};

const PF = "/blog/portfolio";

export const posts: Post[] = [
  {
    slug: "four-things-ive-been-building",
    title: "Four things I've been building lately",
    date: "2026-11-03",
    summary:
      "A one-command project launcher, a desktop command center, a local LLM fallback, and the transit map you're looking at right now.",
    tags: ["Rust", "Tauri", "Local LLMs", "Next.js"],
    github: "https://github.com/Abrar118",
    body: [
      {
        t: "p",
        text: "A few things I've built lately started the same way: something got on my nerves, so I made it stop. Here are four of them, what they do, and how they're put together.",
      },

      { t: "h", text: "QuickDev: one command opens the whole project" },
      {
        t: "p",
        text: "Every time I start on a project I open the same terminals, `cd` into the same folders, run the same commands and launch the same apps. QuickDev is a small Rust CLI that remembers all of that. Describe the project once in a `.quickdev.toml`, then run `quickdev launch` from anywhere and everything opens.",
      },
      shots("quickdev", ["QuickDev"]),
      {
        t: "ul",
        items: [
          "Terminal tabs with working directories and startup commands",
          "Launches apps, and detects VS Code, Cursor and Zed",
          "On macOS it can capture the apps you already have open into the config",
          "Interactive `fzf` pickers for adding, removing and launching selectively",
          "`doctor`, `validate` and `prune` for diagnostics, with `--json` for CI",
          "Shell completion for bash, zsh, fish and PowerShell",
        ],
      },
      {
        t: "p",
        text: "It runs on macOS, Linux and Windows, is written in asynchronous Rust, and ships through crates.io, npm and prebuilt binaries. At its peak it reached 530 downloads a week, which is a lot for something I built to scratch my own itch. The code is on [GitHub](https://github.com/Abrar118/QuickDev).",
      },

      { t: "h", text: "Astryn: a command center for the working day" },
      {
        t: "p",
        text: "Astryn started as a power client for Linear: issues on a real calendar you can drag to reschedule, list and Kanban views, a Markdown editor with threaded comments, and a dependency graph. Then it grew. It now carries GitHub pull requests, a Slack catch-up board and a cached documentation browser, all in one tabbed window you can split in two.",
      },
      {
        t: "p",
        text: "The Rust core owns everything sensitive. Credentials live in the OS keychain, and every Linear, GitHub, Slack and LLM call runs in Rust behind typed Tauri commands, so the webview never sees a token. SQLite backs a local-first cache with optimistic updates and background sync.",
      },
      {
        t: "p",
        text: "One choice worth calling out: the standup and weekly reports are generated from that cache deterministically first, and only then does an optional prose pass run over any OpenAI-compatible endpoint. The facts survive even when the model does not.",
      },
      shots("astryn", [
        "Dashboard",
        "Dashboard, light theme",
        "This Week",
        "Calendar",
        "Tasks board",
        "Issues",
        "Split workspace",
        "Dependency graph",
        "Pull requests",
        "Slack catch-up",
        "Reports",
      ]),
      {
        t: "p",
        text: "It's built with Tauri 2, Rust, React 19, TypeScript and TanStack Query, and it's at v5.0.1. [Source on GitHub](https://github.com/Abrar118/astryn).",
      },

      { t: "h", text: "A local LLM fallback for when the cloud runs dry" },
      {
        t: "p",
        text: "Cloud AI tools have quotas, and quotas run out at the worst moments. So I keep a local stack ready to take over: llama.cpp and Ollama running quantized Qwen and Gemma models in the 9B to 27B range.",
      },
      {
        t: "p",
        text: "Most of the work is tuning. Quality, speed and memory pull against each other, and the goal is the balance a consumer machine can actually sustain. It's also where my M.Sc. thesis comes from: adaptive control of local LLM agents on consumer hardware, which is in progress.",
      },
      {
        t: "p",
        text: "It sits nicely beside [my Claude Code setup](/blog/claude-workflow), which warns me as the limits fill up.",
      },

      { t: "h", text: "This portfolio: a transit map of my career" },
      {
        t: "p",
        text: "The site you're reading is a transit map. Each stack I work in is a line, each project or job is a station, and interchanges show where stacks meet. There are seven lines. The map is generated from data, so it works as an accurate index and not as decoration.",
      },
      {
        t: "img",
        src: `${PF}/home.jpg`,
        alt: "The home page: a 3D transit map with seven coloured lines and the project and job stations, above a black sign with my name",
        width: 1440,
        height: 900,
        caption: "The home page. Drag the map, or press a line's letter to light its stops.",
      },
      {
        t: "p",
        text: "Adding a project takes one entry in one data file. It shows up as a row in the work list, a detail page and a station on the map, with no other changes.",
      },
      {
        t: "p",
        text: "The map comes in two forms. A flat SVG paints straight away, and a three.js model on a lit enamel plate loads in idle time as its own chunk. If you prefer reduced motion, have data-saver on, or WebGL fails, you get the flat map. Every page works either way.",
      },
      {
        t: "img",
        src: `${PF}/station.jpg`,
        alt: "A project page for Astryn, with the camera flown in to its station on the map",
        width: 1440,
        height: 900,
        caption: "Opening a project flies the camera to its station, and the other lines fade back.",
      },
      {
        t: "img",
        src: `${PF}/work.jpg`,
        alt: "The work page: a list of projects beside the live map",
        width: 1440,
        height: 900,
        caption: "The work list sits beside the live map. Pointing at a row lifts its station.",
      },
      {
        t: "p",
        text: "Underneath, the layout is plain geometry: rails, 45° bends, bundled tracks at interchanges and year zones. A small scorer picks each label's position by testing it against the tracks, the stations and the other labels. On phones the map takes the full height and you swipe sideways. On a keyboard, 1 to 5 switch pages.",
      },
      {
        t: "img",
        src: `${PF}/phone.jpg`,
        alt: "The home page on a phone",
        width: 780,
        height: 1688,
        caption: "On a phone.",
      },
      {
        t: "p",
        text: "The source is on GitHub as [final-portfolio](https://github.com/Abrar118/final-portfolio).",
      },
    ],
  },
  {
    slug: "offline-first-flutter-spendsplit-nudge",
    title: "Two offline-first Flutter apps: SpendSplit and Nudge",
    date: "2026-11-03",
    summary:
      "No accounts, no backend, no analytics. How betting on local-first shaped an expense tracker and a task manager that nags you in the right way.",
    tags: ["Flutter", "Dart", "SQLite", "Mobile"],
    github: "https://github.com/Abrar118/spendsplit",
    body: [
      {
        t: "p",
        text: "My two personal Flutter apps make the same bet: your data stays on your phone. There are no accounts, no servers and no analytics. Here's how that shaped each one.",
      },

      { t: "h", text: "SpendSplit: one balance, two pockets" },
      {
        t: "p",
        text: "SpendSplit is a minimalist expense tracker for iOS and Android. It splits one bank balance into Available and Savings, with a biometric lock and a separate USD tracker. All data lives in SQLite on the device, and sensitive settings stay in the platform keystore.",
      },
      {
        t: "p",
        text: "The rule I'm most attached to is that every figure is derived from the entries and never stored. The ledger is always the source of truth, so there's nothing to drift out of sync. Bank SMS alerts become entries flagged for review: Android reads them directly, and iOS takes them through a Shortcuts automation.",
      },
      {
        t: "ul",
        items: [
          "Monthly budget with a pace marker, plus per-category budgets",
          "Graphs: running spend, a 12-month income overlay, a daily heatmap and a balance trend",
          "Savings goals with a completion forecast based on your saving pace",
          "A separate USD ledger with an annual allowance and a year-end projection",
          "CSV and PDF export, CSV import and a full JSON backup",
          "Biometric lock, with balances hidden in the app switcher",
        ],
      },
      shots(
        "spendsplit",
        ["Home", "History", "New entry", "Monthly", "Graphs", "Goals", "Dollar Tracker", "Settings", "Lock"],
        true,
      ),
      {
        t: "p",
        text: "Built with Flutter, Riverpod, Drift (SQLite), GoRouter and fl_chart. It's at v1.3.0, and the code is on [GitHub](https://github.com/Abrar118/spendsplit).",
      },

      { t: "h", text: "Nudge: tasks that don't let you off the hook" },
      {
        t: "p",
        text: "Nudge is a local-first task manager where important tasks stay visible and keep reminding you until they're handled. The Focus tab shows a streak, one spotlight task, then your overdue, today and up-next lists.",
      },
      {
        t: "p",
        text: "The part I like is the escalation engine. A task you keep putting off climbs back into the spotlight with a \"Put off N times\" marker, and gets a daily nudge once its reminders have fired. Quiet hours shift reminders instead of dropping them.",
      },
      {
        t: "ul",
        items: [
          "Natural-language quick add with tags, such as \"call mom tomorrow 5pm\"",
          "Fixed or repeat-after-completion recurrence, with custom rules",
          "Multiple reminders, opt-in persistent alarms, quiet hours and snooze",
          "Daily and monthly habits with check-ins, timers, checkpoints and streaks",
          "Goals with checkpoints and a progress chart",
          "A Pomodoro timer that credits time to the task",
          "Home-screen widgets with deep links, and eight colour palettes",
        ],
      },
      shots("nudge", ["Focus", "Calendar", "Habits", "Goal detail", "Settings"], true),
      {
        t: "p",
        text: "It's built with Flutter, Dart, SQLite and local notifications, and it's at v2.0.0. [Source on GitHub](https://github.com/Abrar118/todo_list).",
      },

      { t: "h", text: "What local-first costs and buys" },
      {
        t: "p",
        text: "It buys you simplicity: no sign-in, no sync conflicts, nothing to host, and nothing of yours on someone else's server. It costs you the safety net, since the phone is the only copy. That's why both apps have export and import, with a full JSON backup in each.",
      },
    ],
  },
  {
    slug: "rebuilding-mat-bank",
    title: "Rebuilding a 2022 course project: MAT Bank v2",
    date: "2026-11-03",
    summary:
      "Same screens, new foundations: how a JavaFX course project went from text files and plain-text passwords to SQLite, exact money and 84 tests.",
    tags: ["Java", "JavaFX", "SQLite", "Testing"],
    body: [
      {
        t: "p",
        text: "MAT Bank began in 2022 as a JavaFX course project at MIST, built by me, Mehmil Khan and Farheen Mahjarin Trisha. In 2026 I went back to it. Version 2.0 keeps the same screens and ideas and replaces everything underneath.",
      },
      { t: "h", text: "What changed" },
      {
        t: "table",
        head: ["In 2022", "In v2.0"],
        rows: [
          ["Text files", "SQLite, with versioned migrations"],
          ["Money as doubles", "Exact integer poisha, in one ledger with running balances"],
          ["Plain-text passwords", "bcrypt hashes, lockout after 5 attempts and an audit log"],
          ["Transfers", "One all-or-nothing database transaction"],
        ],
      },
      {
        t: "p",
        text: "The money change is the one I'd tell anyone to make early. Floating point is fine for a lot of things and wrong for balances, so amounts are whole integers of the smallest unit, and every balance comes from the ledger.",
      },
      { t: "h", text: "Tested and shipped like a real app" },
      {
        t: "ul",
        items: [
          "84 JUnit tests, including UI flows that run on a virtual display",
          "Native `deb`, `dmg` and `msi` installers built by GitHub Actions",
          "PDF statements, scheduled payments, live exchange rates and search",
          "One window with light and dark themes, and an admin view",
        ],
      },
      shots("bank-system", [
        "Dashboard",
        "Dashboard, dark theme",
        "Welcome",
        "Send money",
        "Scheduled payments",
        "Statements",
        "History",
        "Currency",
        "Admin overview",
        "Admin clients",
      ]),
      {
        t: "p",
        text: "Built with Java 21, JavaFX 21, SQLite, JUnit and GitHub Actions.",
      },
    ],
  },
  {
    slug: "greencycle-ieee-qpain",
    title: "From a course project to an IEEE paper: GreenCycle",
    date: "2026-11-03",
    summary:
      "A gamified recycling app with TensorFlow and YOLOv8 object recognition, Gemini guidance and push reminders, published at IEEE QPAIN 2025.",
    tags: ["Flutter", "TensorFlow", "YOLOv8", "Research"],
    body: [
      {
        t: "p",
        text: "GreenCycle started in 2024 as a course project (SDP-II). In 2025 it became a paper at IEEE QPAIN, a conference on quantum photonics, AI and networking. The full title is \"AI-Enhanced Application for Incentivizing Waste Recycling: A Step towards Sustainable Environment\".",
      },
      { t: "h", text: "What the app does" },
      {
        t: "p",
        text: "Point your camera at an object and a TensorFlow and YOLOv8 model tells you whether it's recyclable, which category it belongs to and where to dispose of it. Gemini adds contextual tips and guidance. To keep people coming back, there are rewards for recycling, leaderboards, and a vendor marketplace that connects recyclers with collectors.",
      },
      {
        t: "ul",
        items: [
          "TensorFlow and YOLOv8 object recognition for waste classification",
          "Gemini for dynamic recycling guidance",
          "Gamified rewards with leaderboards",
          "A vendor marketplace for recyclers and collectors",
          "Firebase Cloud Messaging for task reminders",
        ],
      },
      shots("greencycle", ["Landing page", "App screen 1", "App screen 2", "App screen 3"], true),
      { t: "h", text: "The stack" },
      {
        t: "p",
        text: "Flutter for the app, Python and TensorFlow for the model, Node.js for the backend and Firebase for notifications.",
      },
    ],
  },
  {
    slug: "romanized-bengali-sentiment",
    title: "Reading Romanized Bengali: my B.Sc. thesis",
    date: "2026-11-03",
    summary:
      "Sentiment and emotion detection for Bengali written in Latin letters, and why low-resource languages need their own datasets.",
    tags: ["Machine learning", "NLP", "Research"],
    body: [
      {
        t: "p",
        text: "My final-year thesis at MIST (Department of CSE) has the title \"Analysing Low-Resource Language Feedback Across Industries\". It uses several machine learning approaches and a custom dataset to detect sentiment and emotion in Romanized Bengali.",
      },
      { t: "h", text: "What Romanized Bengali is, and why it's hard" },
      {
        t: "p",
        text: "Romanized Bengali is Bengali in Latin letters, the way people write when they text, post and review things. It has no standard spelling, so the same word shows up in several forms. Most sentiment tools target English, or Bengali in its own script. Few labelled datasets exist for it, which is what \"low-resource\" means here.",
      },
      { t: "h", text: "Why feedback" },
      {
        t: "p",
        text: "The title points at the use: feedback from customers across industries. A model that can read it can tell a business what people like and what upsets them, in the language they actually write in.",
      },
      { t: "h", text: "Where it led" },
      {
        t: "p",
        text: "I finished the thesis in 2025. These days my M.Sc. asks the next question: [adaptive control of local LLM agents](/blog/four-things-ive-been-building) on consumer hardware.",
      },
    ],
  },
  {
    slug: "claude-workflow",
    title: "My Claude Code setup",
    date: "2026-11-03",
    summary:
      "12 mods I built, a skill I wrote, my global CLAUDE.md, my status line and the plugins I use, plus how they fit into a day of work.",
    tags: ["Claude Code", "Tooling", "Open source"],
    github: "https://github.com/Abrar118/claude-workflow",
    body: [
      {
        t: "p",
        text: "This is my Claude Code setup: 12 mods I built, a skill I wrote, my global `CLAUDE.md`, my status line, and the third-party plugins I use. You can copy all of it with one script, or install only the parts you want.",
      },
      {
        t: "img",
        src: `${IMG}/overview.jpg`,
        alt: "Claude Code with the chat on the left, the activity pane on the right and the usage band above the prompt",
        width: 1800,
        height: 1169,
        caption: "Chat on the left, activity pane on the right, usage band above the prompt.",
      },

      { t: "h", text: "Install it" },
      { t: "p", text: "To take everything:" },
      {
        t: "code",
        text: "git clone https://github.com/Abrar118/claude-workflow.git\ncd claude-workflow\n./install.sh",
      },
      {
        t: "ul",
        items: [
          "adds the repo as a plugin marketplace and installs every mod and skill",
          "installs the third-party plugins listed below",
          "copies the status line script",
          "copies `CLAUDE.md`, but only if you don't already have one; otherwise it is saved next to yours as `CLAUDE.workflow.md`",
        ],
      },
      {
        t: "p",
        text: "Then merge the `statusLine` and `skillOverrides` blocks from `settings.example.json` into `~/.claude/settings.json` and restart Claude Code. On Windows, run the script from Git Bash; it copies the PowerShell status line instead of the shell one.",
      },
      { t: "p", text: "To install a single mod, the repo is a plugin marketplace:" },
      {
        t: "code",
        text: "/plugin install agent-panel --marketplace Abrar118/claude-workflow",
      },

      { t: "h", text: "The mods" },
      {
        t: "p",
        text: "Mods are Claude Code plugins that change the interface or hook into what Claude does.",
      },
      {
        t: "table",
        head: ["Mod", "What it does"],
        rows: [
          ["agent-panel", "Side pane with tasks, background jobs, agents (model, effort, context use), assumptions and a live file tree, plus a progress bar above the prompt."],
          ["assumption-log", "Claude logs each assumption it makes. A pane lets me mark each one right or wrong, or ask for a change."],
          ["progress-guard", "Keeps the task list honest: a reminder after every 3 tool calls without a progress update, and a toast if a turn ends with the list still open."],
          ["prompt-deck", "Band above the prompt: context, 5h and weekly usage, session cost, prompt-cache countdown, git health and a suggested next prompt."],
          ["prompt-queue", "Saves a prompt idea while Claude works, so I can send, modify or discard it later."],
          ["turn-meter", "Time, tool calls and cost for each turn, plus a toast when a turn costs far more than usual."],
          ["limit-guard", "Warns as the 5-hour limit fills up, and asks before starting subagents when it is nearly used up."],
          ["safety-guard", "Asks before force pushes, pushes to or merges into main, `rm -rf`, hard resets, `DROP`/`TRUNCATE` and `.env` edits. Block is the default answer."],
          ["push-preflight", "Before `git push`, runs the repo's format, lint and typecheck scripts and blocks the push if one fails."],
          ["format-on-edit", "After each edit, runs the project's own formatter, only where the project already uses one."],
          ["venv-auto", "Activates the nearest `.venv` for `python`, `pip`, `pytest` and `jupyter` commands."],
          ["debug-on-paste", "When a pasted message looks like an error or stack trace, tells Claude to debug step by step."],
        ],
      },
      {
        t: "img",
        src: `${IMG}/agent-panel.png`,
        alt: "The agent-panel pane with three agents running",
        width: 1256,
        height: 1828,
        caption: "agent-panel with three agents running.",
      },
      {
        t: "img",
        src: `${IMG}/assumption-log.png`,
        alt: "The assumption-log pane",
        width: 1200,
        height: 1882,
        caption: "assumption-log: each guess Claude makes, ready to be marked right or wrong.",
      },
      {
        t: "img",
        src: `${IMG}/prompt-deck.png`,
        alt: "The prompt-deck band above the prompt",
        width: 2286,
        height: 334,
        caption: "prompt-deck sits above the prompt.",
      },
      {
        t: "p",
        text: "prompt-deck shows what turn-meter measures, so I install both together.",
      },

      { t: "h", text: "The skill" },
      {
        t: "p",
        text: "**verify-outside-feedback**: when I paste a review, critique or list of suggestions, Claude splits it into claims and marks each one Confirmed, Refuted or Unclear, with evidence such as `file:line`, test output or a quoted source. Then it asks before changing anything.",
      },

      { t: "h", text: "The status line" },
      {
        t: "img",
        src: `${IMG}/statusline.png`,
        alt: "The status line",
        width: 1418,
        height: 118,
      },
      {
        t: "p",
        text: "It shows the model and effort, repo or folder, git branch, a context bar, 5h usage with reset time, weekly usage and the open PR. There is a shell version (needs `jq`) and a PowerShell version for Windows that needs nothing else installed.",
      },

      { t: "h", text: "My CLAUDE.md" },
      {
        t: "p",
        text: "My global instructions file is short on purpose: short answers, no over-engineering, the simplest code that works, read before claiming, and run outside feedback through the skill above.",
      },

      { t: "h", text: "The loop" },
      { t: "p", text: "This is how I work with Claude Code day to day, and where each piece fits." },
      {
        t: "table",
        head: ["Step", "What happens", "What helps"],
        rows: [
          ["1. Idea", "I describe what I want, often by voice. Claude asks questions until the goal is clear.", "superpowers:brainstorming"],
          ["2. Plan", "Claude writes a plan with numbered tasks, which show up in the side pane with a progress bar.", "superpowers:writing-plans, agent-panel, progress-guard"],
          ["3. Build", "Claude works through the tasks test-first and logs every guess it makes.", "superpowers:test-driven-development, assumption-log"],
          ["4. Queue", "New ideas while Claude is busy go into a queue instead of interrupting.", "prompt-queue"],
          ["5. Debug", "When I paste an error, Claude switches to step-by-step debugging instead of guessing.", "debug-on-paste, superpowers:systematic-debugging"],
          ["6. Review", "Claude reviews the diff. Outside feedback gets every claim checked with evidence before anything changes.", "/code-review, verify-outside-feedback"],
          ["7. Ship", "Formatting runs on every edit. Lint, typecheck and format checks run before a push. Risky commands and merges into main need my OK.", "format-on-edit, push-preflight, safety-guard"],
        ],
      },

      { t: "h", text: "Watching cost and limits" },
      {
        t: "ul",
        items: [
          "**prompt-deck** shows context use, the 5-hour and weekly limits, how long the prompt cache stays warm, and a suggested next prompt.",
          "**turn-meter** adds the time, tool calls and cost of each turn, and flags a turn that costs far more than usual.",
          "**limit-guard** warns as the 5-hour limit fills up, and asks before starting subagents when it is nearly used up.",
          "The **status line** shows the model, effort, repo, branch, open PR, context bar and limits at a glance.",
        ],
      },

      { t: "h", text: "Setup and habits" },
      {
        t: "ul",
        items: [
          "Terminal: [Kitty](https://sw.kovidgoyal.net/kitty/) with a dark theme. The mod panes use the same colours, hardcoded in each mod's `hooks/register.tsx`.",
          "Claude Code in fullscreen TUI mode, with voice input on.",
          "Model: Opus by default; Sonnet for lighter sessions.",
          "No unrequested features, refactors or abstractions.",
          "Use subagents only when fanning out across many items.",
        ],
      },

      { t: "h", text: "Third-party plugins" },
      {
        t: "p",
        text: "These aren't mine and aren't in the repo. The ones I use most: `superpowers` (brainstorm, plan, TDD, debug, review), `frontend-design`, `security-guidance`, `claude-md-management`, `claude-code-setup`, `remember` and `github`, all from the official marketplace, plus [ui-ux-pro-max](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill), [impeccable](https://github.com/pbakaus/impeccable) and [Uncodixfy](https://github.com/cyxzdev/Uncodixfy) for UI work. The README has install commands for each.",
      },
      {
        t: "p",
        text: "Everything of mine is MIT licensed. The full source, the PDF setup guide and every mod's tests are in the [repository](https://github.com/Abrar118/claude-workflow).",
      },
    ],
  },
];
