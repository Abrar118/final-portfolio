import type { Project } from "@/types/project";
import {
  NextJs,
  NodeJs,
  Cloudinary,
  MongoDB,
  Spring,
  ViteJS,
  Markdown,
  Bash,
  Prettier,
  React,
  ExpressJsDark,
  Firebase,
  Flutter,
  Python,
  Tensorflow,
  VisualStudioCode,
  TailwindCSS,
  VercelDark,
  Java,
  MySQL,
  RustDark,
  Supabase,
  PostgreSQL,
  Google,
  Dart,
  TypeScript,
  ReactQuery,
  GitHubDark,
  Slack,
} from "developer-icons";

import astrynDashboard from "@/public/projects/astryn/dashboard.png";
import astrynDashboardLight from "@/public/projects/astryn/dashboard-light.png";
import astrynThisWeek from "@/public/projects/astryn/this-week.png";
import astrynCalendar from "@/public/projects/astryn/calendar.png";
import astrynTasksBoard from "@/public/projects/astryn/tasks-board.png";
import astrynIssues from "@/public/projects/astryn/issues.png";
import astrynSplit from "@/public/projects/astryn/split.png";
import astrynDependencies from "@/public/projects/astryn/dependencies.png";
import astrynPullRequests from "@/public/projects/astryn/pull-requests.png";
import astrynSlack from "@/public/projects/astryn/slack.png";
import astrynReports from "@/public/projects/astryn/reports.png";

import crimeLensLanding from "@/public/projects/crimelens/landing.png";
import quickDevLanding from "@/public/projects/quickdev/landing.png";
import acpscmLanding from "@/public/projects/acpscm/landing.png";
import acpscm2 from "@/public/projects/acpscm/acp2.png";
import acpscm3 from "@/public/projects/acpscm/acp3.png";

import eduVerse from "@/public/projects/eduverse/landing.png";
import edu2 from "@/public/projects/eduverse/edu2.png";
import edu3 from "@/public/projects/eduverse/edu3.png";
import edu4 from "@/public/projects/eduverse/edu4.png";
import edu5 from "@/public/projects/eduverse/edu5.png";
import edu6 from "@/public/projects/eduverse/edu6.png";
import edu7 from "@/public/projects/eduverse/edu7.png";
import edu8 from "@/public/projects/eduverse/edu8.png";

import greenCycleLanding from "@/public/projects/greencycle/landing.jpg";
import greenCycle1 from "@/public/projects/greencycle/green1.jpg";
import greenCycle2 from "@/public/projects/greencycle/green2.jpg";
import greenCycle3 from "@/public/projects/greencycle/green3.jpg";

import pioLanding from "@/public/projects/pioneers/landing.png";
import pio1 from "@/public/projects/pioneers/pio1.png";

import rhubLanding from "@/public/projects/rhub/landing.png";
import rhub1 from "@/public/projects/rhub/rhub1.png";
import rhub2 from "@/public/projects/rhub/rhub2.png";
import rhub3 from "@/public/projects/rhub/rhub3.png";
import rhub4 from "@/public/projects/rhub/rhub4.png";


import elyriaLanding from "@/public/projects/landing-elyria.png";
import promptLanding from "@/public/projects/landing-prompt.png";
import sniffPawsLanding from "@/public/projects/foster.png";

import psycloudLanding from "@/public/projects/psycloud/landing.png";
import psycloudQuestionnaires from "@/public/projects/psycloud/questionnaires.png";
import psycloudPracticeDay from "@/public/projects/psycloud/practice-day.png";
import psycloudLogin from "@/public/projects/psycloud/login.png";
import softcarHome from "@/public/projects/softcar/home.png";
import softcarPlatform from "@/public/projects/softcar/platform.png";
import softcarInsurance from "@/public/projects/softcar/insurance.png";
import softcarPricing from "@/public/projects/softcar/pricing.png";
import nudgeFocus from "@/public/projects/nudge/focus.png";
import nudgeCalendar from "@/public/projects/nudge/calendar.png";
import nudgeHabits from "@/public/projects/nudge/habits.png";
import nudgeGoalDetail from "@/public/projects/nudge/goal-detail.png";
import nudgeSettings from "@/public/projects/nudge/settings.png";
import spendHome from "@/public/projects/spendsplit/01-home.png";
import spendHistory from "@/public/projects/spendsplit/02-history.png";
import spendAddEntry from "@/public/projects/spendsplit/03-add-entry.png";
import spendMonthly from "@/public/projects/spendsplit/04-monthly.png";
import spendGraphs from "@/public/projects/spendsplit/05-graphs.png";
import spendGoals from "@/public/projects/spendsplit/06-goals.png";
import spendDollarTracker from "@/public/projects/spendsplit/07-dollar-tracker.png";
import spendSettings from "@/public/projects/spendsplit/08-settings.png";
import spendLock from "@/public/projects/spendsplit/09-lock.png";
import flowOverview from "@/public/projects/claude-workflow/overview.png";
import flowAgentsRunning from "@/public/projects/claude-workflow/agents-running.png";
import flowAgentPanel from "@/public/projects/claude-workflow/agent-panel.png";
import flowAssumptionLog from "@/public/projects/claude-workflow/assumption-log.png";
import flowPromptDeck from "@/public/projects/claude-workflow/prompt-deck.png";
import flowStatusline from "@/public/projects/claude-workflow/statusline.png";
import bankDashboard from "@/public/projects/java/dashboard.png";
import bankDashboardDark from "@/public/projects/java/dashboard-dark.png";
import bankWelcome from "@/public/projects/java/welcome.png";
import bankSendMoney from "@/public/projects/java/send-money.png";
import bankScheduledPayments from "@/public/projects/java/scheduled-payments.png";
import bankStatements from "@/public/projects/java/statements.png";
import bankHistory from "@/public/projects/java/history.png";
import bankCurrency from "@/public/projects/java/currency.png";
import bankAdminOverview from "@/public/projects/java/admin-overview.png";
import bankAdminClients from "@/public/projects/java/admin-clients.png";

export const iconSize = 24;

export const projects: Project[] = [
  {
    href: "https://www.psycloud.ai/",
    links: [{ label: "Dashboard", href: "https://app.psycloud.ai/login" }],
    title: "Psycloud",
    description:
      "Clinical platform for psychotherapy practices, serving 1,000+ users: practitioner dashboard, assessment engine, and a backend built to EU data-protection rules",
    thumbnail: psycloudLanding,
    images: [psycloudLanding, psycloudQuestionnaires, psycloudPracticeDay, psycloudLogin],
    stack: [
      { name: "Next.js", Icon: <NextJs size={iconSize} /> },
      { name: "TypeScript", Icon: <TypeScript size={iconSize} /> },
      { name: "FastAPI", Icon: <Python size={iconSize} /> },
      { name: "PostgreSQL", Icon: <PostgreSQL size={iconSize} /> },
      { name: "Redis", Icon: null },
      { name: "Docker", Icon: null },
    ],
    slug: "psycloud",
    category: "web",
    year: "2025",
    at: 2025.62,
    lines: ["C", "T"],
    context: "1,000+ users · Principal architect at Bengal Byte",
    content: (
      <div className="space-y-3">
        <p>
          Psycloud is built by GAM Medical for psychotherapy practices. I was
          principal architect and one of the first engineers on it at Bengal
          Byte, designing its core systems and the engineering conventions the team
          still builds on. It now serves over 1,000 users.
        </p>
        <p>
          I built the practitioner dashboard for patient records, case
          histories and treatment data, and the assessment engine that scores
          questionnaires and tracks patient progress between sessions. The
          backend services, data models and REST APIs behind them keep patient
          health data confidential and compliant with EU data-protection rules.
        </p>
      </div>
    ),
    features: [
      "Practitioner dashboard for patient records, case histories and treatment data",
      "Assessment engine that scores questionnaires and tracks progress between sessions",
      "Backend services, data models and REST APIs handling health data under EU data-protection rules",
      "Test-driven delivery, with manual code review layered on multi-agent AI review before every merge",
    ],
  },
  {
    href: "https://softcartech.com/",
    title: "SoftCar",
    description:
      "Car rental and fleet insurance platform. At Nyntax I built React and Express features for its insurance, booking and admin modules",
    thumbnail: softcarHome,
    images: [softcarHome, softcarPlatform, softcarInsurance, softcarPricing],
    stack: [
      { name: "React 18", Icon: <React size={iconSize} /> },
      { name: "TypeScript", Icon: <TypeScript size={iconSize} /> },
      { name: "Express.js", Icon: <ExpressJsDark size={iconSize} /> },
      { name: "MongoDB", Icon: <MongoDB size={iconSize} /> },
    ],
    slug: "softcar",
    category: "web",
    year: "2025",
    at: 2025.3,
    lines: ["C", "T"],
    context: "Built at Nyntax",
    content: (
      <div className="space-y-3">
        <p>
          SoftCar brings direct bookings, reservations, payments, renter
          screening and fleet insurance into one platform for car rental
          operators. I worked on it as a full-stack developer at Nyntax.
        </p>
        <p>
          I built React and Express.js features on MongoDB for the insurance,
          booking and admin modules, and migrated legacy JavaScript to
          type-safe TypeScript across a mixed-stack codebase.
        </p>
      </div>
    ),
    features: [
      "Insurance, booking and admin modules in React and Express.js on MongoDB",
      "Migration of legacy JavaScript to type-safe TypeScript across a mixed-stack codebase",
    ],
  },
  {
    github: "https://github.com/Abrar118/spendsplit",
    title: "SpendSplit",
    description:
      "Offline-only expense tracker that splits one bank balance into Available and Savings, with a biometric lock and a separate USD tracker",
    thumbnail: spendHome,
    images: [spendHome, spendHistory, spendAddEntry, spendMonthly, spendGraphs, spendGoals, spendDollarTracker, spendSettings, spendLock],
    stack: [
      { name: "Flutter", Icon: <Flutter size={iconSize} /> },
      { name: "Riverpod", Icon: <Dart size={iconSize} /> },
      { name: "Drift (SQLite)", Icon: <MySQL size={iconSize} /> },
      { name: "GoRouter", Icon: <Dart size={iconSize} /> },
      { name: "fl_chart", Icon: <ViteJS size={iconSize} /> },
    ],
    slug: "spendsplit",
    category: "mobile",
    year: "2026",
    context: "Personal finance app · v1.3.0",
    content: (
      <div className="space-y-3">
        <p>
          A minimalist expense tracker for iOS and Android with no cloud, no
          accounts and no sync. All data lives on the device in SQLite, and
          sensitive settings stay in the platform keystore.
        </p>
        <p>
          Every figure is derived from the entries and never stored, so the
          ledger is always the source of truth. Bank SMS alerts become entries
          flagged for review: Android reads them directly, and iOS takes them
          through a Shortcuts automation.
        </p>
      </div>
    ),
    features: [
      "Split balance: Available and Savings, derived from entries and never stored",
      "Monthly budget with a pace marker and per-category budgets",
      "Graphs: running spend, 12-month income overlay, daily heatmap and balance trend",
      "Savings goals with a completion forecast from your saving pace",
      "Separate USD ledger with an annual allowance and year-end projection",
      "Bank SMS import, flagged for review, with a balance check on Home",
      "CSV and PDF export, CSV import, and a full JSON backup",
      "Biometric lock, with balances hidden in the app switcher",
    ],
    pages: ["Home", "History", "New entry", "Monthly", "Graphs", "Goals", "Dollar Tracker", "Settings", "Lock"],
  },
  {
    github: "https://github.com/Abrar118/todo_list",
    title: "Nudge",
    description:
      "Local-first task manager for Android and iOS: important tasks stay visible and keep reminding you until they are handled",
    thumbnail: nudgeFocus,
    images: [nudgeFocus, nudgeCalendar, nudgeHabits, nudgeGoalDetail, nudgeSettings],
    stack: [
      { name: "Flutter", Icon: <Flutter size={iconSize} /> },
      { name: "Dart", Icon: <Dart size={iconSize} /> },
      { name: "SQLite", Icon: <MySQL size={iconSize} /> },
      { name: "Local notifications", Icon: <Dart size={iconSize} /> },
    ],
    slug: "nudge",
    category: "mobile",
    year: "2026",
    context: "Personal productivity app · v2.0.0",
    content: (
      <div className="space-y-3">
        <p>
          No accounts, no backend, no analytics: everything stays on the device.
          The Focus tab shows a streak, one spotlight task, then overdue, today
          and up-next lists.
        </p>
        <p>
          Tasks that keep being put off climb back into the spotlight with a
          &quot;Put off N times&quot; marker and a daily nudge once their
          reminders have fired. Quiet hours shift reminders and never drop them.
        </p>
      </div>
    ),
    features: [
      "Escalation engine for tasks that are snoozed, deferred or left overdue",
      "Natural-language quick add with tags, such as \"call mom tomorrow 5pm\"",
      "Fixed or repeat-after-completion recurrence, with custom rules",
      "Multiple reminders, opt-in persistent alarms, quiet hours and snooze",
      "Daily and monthly habits with check-ins, timers, checkpoints and streaks",
      "Goals with checkpoints and a progress chart",
      "Pomodoro focus timer that credits time to the task",
      "Home-screen widgets with deep links, and eight colour palettes",
      "JSON export and import, and .ics export",
    ],
    pages: ["Focus", "Calendar", "Habits", "Goals", "Settings"],
  },
  {
    github: "https://github.com/Abrar118/astryn",
    title: "Astryn",
    description:
      "Local-first desktop command center that pulls Linear, GitHub, Slack, and documentation into one tabbed Tauri workspace — with generated standup and weekly reports",
    thumbnail: astrynDashboard,
    images: [
      astrynDashboard,
      astrynDashboardLight,
      astrynThisWeek,
      astrynCalendar,
      astrynTasksBoard,
      astrynIssues,
      astrynSplit,
      astrynDependencies,
      astrynPullRequests,
      astrynSlack,
      astrynReports,
    ],
    stack: [
      { name: "Tauri 2", Icon: <RustDark size={iconSize} /> },
      { name: "Rust", Icon: <RustDark size={iconSize} /> },
      { name: "React 19", Icon: <React size={iconSize} /> },
      { name: "TypeScript", Icon: <TypeScript size={iconSize} /> },
      { name: "TanStack Query", Icon: <ReactQuery size={iconSize} /> },
      { name: "SQLite", Icon: <MySQL size={iconSize} /> },
      { name: "GitHub API", Icon: <GitHubDark size={iconSize} /> },
      { name: "Slack API", Icon: <Slack size={iconSize} /> },
    ],
    slug: "astryn",
    category: "desktop",
    year: "2026",
    context: "Personal command center · v5.0.1",
    content: (
      <div className="space-y-3">
        <p>
          A desktop workspace for the surfaces a working day actually touches.
          It began as a power client for Linear — issues on a real calendar
          with drag-to-reschedule, list and Kanban views, a Markdown editor
          with threaded comments, and a dependency graph — and grew to carry
          GitHub pull requests, a Slack catch-up board, and a cached
          documentation browser in the same tabbed, splittable window.
        </p>
        <p>
          The Rust core owns everything sensitive: credentials live in the OS
          keychain, every Linear, GitHub, Slack, and LLM call runs in Rust
          behind typed Tauri commands, and SQLite backs a local-first cache
          with optimistic updates and background sync. Standup and weekly
          reports are generated deterministically from that cache first, with
          an optional prose pass over any OpenAI-compatible endpoint — so the
          facts survive even when the model does not.
        </p>
      </div>
    ),
    features: [
      "Dashboard ranking what needs attention across Linear, GitHub, Slack, and Inbox",
      "Calendar with drag-to-reschedule and an unscheduled rail",
      "List and Kanban views with display controls that persist across launches",
      "Markdown issue editor with comments, reactions, mentions, and Mermaid diagrams",
      "Dependency graph of issue hierarchy and blocks/related relations",
      "GitHub PR workspace with unified diffs and CI, review, and conflict badges",
      "Slack catch-up board and a synced, offline-readable docs browser",
      "Daily scrum and weekly review generators — deterministic facts, optional LLM prose",
      "Two-pane split workspace, browser-style tabs, and a ⌘K command palette",
      "Keychain-secured credentials — the webview never sees a token",
    ],
    pages: [
      "Dashboard",
      "Calendar",
      "Issues",
      "This Week",
      "Dependencies",
      "Pull Requests",
      "Slack",
      "Docs",
      "Reports",
      "Inbox",
      "Settings",
    ],
  },
  {
    github: "https://github.com/Abrar118/QuickDev",
    title: "QuickDev",
    description:
      "Cross-platform Rust CLI that saves and launches a project's terminal tabs and applications with one command",
    thumbnail: quickDevLanding,
    images: [quickDevLanding],
    stack: [
      { name: "Rust", Icon: <RustDark size={iconSize} /> },
      { name: "fzf", Icon: <Bash size={iconSize} /> },
      { name: "TOML", Icon: <Prettier size={iconSize} /> },
    ],
    slug: "quickdev",
    category: "desktop",
    year: "2025",
    context: "On crates.io and npm · v0.5.0 · 530 downloads/week at peak",
    content: (
      <div className="space-y-3">
        <p>
          Every time you start on a project you open the same terminals, go to
          the same directories, run the same commands and launch the same apps.
          QuickDev removes that repetition: configure once in a per-project
          <code> .quickdev.toml</code>, then <code>quickdev launch</code> opens
          everything, from anywhere.
        </p>
        <p>
          It runs on macOS, Linux and Windows, ships through crates.io, npm and
          prebuilt binaries, and is written in asynchronous Rust.
        </p>
      </div>
    ),
    features: [
      "Terminal tabs with working directories and startup commands",
      "Application launching with tool detection for VS Code, Cursor and Zed",
      "Capture running apps into the project config on macOS",
      "Interactive fzf pickers for adding, removing and selectively launching",
      "Global project index, config templates and recent-first ordering",
      "Diagnostics with doctor, validate and prune, with --json for CI",
      "Shell completion for bash, zsh, fish and PowerShell",
    ],
  },
  {
    github: "https://github.com/Abrar118/claude-workflow",
    title: "claude-workflow",
    description:
      "My Claude Code setup as an installable plugin marketplace: 11 mods I built, a skill, a status line and a one-script install",
    thumbnail: flowOverview,
    images: [flowOverview, flowAgentsRunning, flowAgentPanel, flowAssumptionLog, flowPromptDeck, flowStatusline],
    stack: [
      { name: "TypeScript", Icon: <TypeScript size={iconSize} /> },
      { name: "Claude Code plugins", Icon: null },
      { name: "Bash", Icon: <Bash size={iconSize} /> },
    ],
    slug: "claude-workflow",
    category: "desktop",
    year: "2026",
    context: "Open-source developer tooling",
    content: (
      <div className="space-y-3">
        <p>
          Mods are Claude Code plugins that change the interface or hook into
          what Claude does. Install all of them with one script, or pick single
          ones from the plugin marketplace. They work on macOS, Linux and
          Windows, including both of Claude Code&apos;s Windows shells.
        </p>
        <p>
          They cover the things I wanted while working: a side pane of agents
          and background jobs, a reviewable log of the assumptions Claude makes,
          a usage band above the prompt, and guards that stop force pushes or
          block a push when checks fail.
        </p>
      </div>
    ),
    features: [
      "agent-panel: tasks, background jobs, agents and a live file tree in a side pane",
      "assumption-log: mark each assumption Claude makes as right or wrong",
      "prompt-deck and turn-meter: context, usage, cost and git health above the prompt",
      "prompt-queue: save prompt ideas while Claude works",
      "safety-guard and push-preflight: ask before risky commands, block failing pushes",
      "verify-outside-feedback: a skill that checks pasted reviews claim by claim",
    ],
  },
  {
    github: "https://github.com/Abrar118/Final_bank",
    title: "MAT Bank",
    description:
      "Desktop banking app first built by three students in 2022 and rebuilt in 2026: exact-money ledger, bcrypt sign-in, native installers and 84 tests",
    thumbnail: bankDashboard,
    images: [bankDashboard, bankDashboardDark, bankWelcome, bankSendMoney, bankScheduledPayments, bankStatements, bankHistory, bankCurrency, bankAdminOverview, bankAdminClients],
    stack: [
      { name: "Java 21", Icon: <Java size={iconSize} /> },
      { name: "JavaFX 21", Icon: <Java size={iconSize} /> },
      { name: "SQLite", Icon: <MySQL size={iconSize} /> },
      { name: "JUnit", Icon: <Java size={iconSize} /> },
      { name: "GitHub Actions", Icon: <GitHubDark size={iconSize} /> },
    ],
    slug: "bank-system",
    category: "desktop",
    year: "2026",
    at: 2026.2,
    context: "Rebuild of a 2022 course project · v2.0",
    content: (
      <div className="space-y-3">
        <p>
          MAT Bank began in 2022 as a JavaFX course project at MIST, by me,
          Mehmil Khan and Farheen Mahjarin Trisha. Version 2.0 keeps the same
          screens and ideas and replaces the foundations underneath.
        </p>
        <p>
          Text files became SQLite with versioned migrations. Money moved from
          doubles to exact integer poisha in one ledger with running balances.
          Plain-text passwords became bcrypt hashes with lockout and an audit
          log, and transfers now run in one all-or-nothing database transaction.
        </p>
      </div>
    ),
    features: [
      "Exact integer money in one ledger with running balances",
      "bcrypt passwords, lockout after 5 attempts, and an audit log",
      "All-or-nothing transfers in a single database transaction",
      "PDF statements, scheduled payments, live exchange rates and search",
      "One window with light and dark themes",
      "84 JUnit tests, including UI flows on a virtual display",
      "Native deb, dmg and msi installers built by GitHub Actions",
    ],
    pages: ["Welcome", "Dashboard", "Send money", "Scheduled payments", "Statements", "History", "Currency", "Admin"],
  },
  {
    href: "https://crimelens-one.vercel.app",
    github: "https://github.com/Abrar118/crimelens",
    title: "CrimeLens",
    description:
      "Crime reporting and community verification platform — geo-tagged incidents with photo/video evidence, Gemini-powered scene analysis, and Leaflet crime heatmaps",
    thumbnail: crimeLensLanding,
    images: [crimeLensLanding],
    stack: [
      { name: "Next.js 15", Icon: <NextJs size={iconSize} /> },
      { name: "MongoDB Atlas", Icon: <MongoDB size={iconSize} /> },
      { name: "Firebase", Icon: <Firebase size={iconSize} /> },
      { name: "Gemini 2.0 Flash", Icon: <Google size={iconSize} /> },
      { name: "Leaflet", Icon: <ViteJS size={iconSize} /> },
      { name: "Zustand", Icon: <React size={iconSize} /> },
    ],
    slug: "crimelens",
    category: "web",
    year: "2025",
    context: "WebXtreme Hackathon 2025 · Top 11 Finalist",
    content: (
      <div className="space-y-3">
        <p>
          A civic-safety platform where citizens submit geo-tagged crime
          reports with photo and video evidence, and the community verifies
          them through voting. Built for WebXtreme Hackathon 2025, where our
          team reached the top 11 finalists.
        </p>
        <p>
          Google Gemini 2.0 Flash generates automated scene descriptions and
          analyzes submitted imagery. Incident density is visualized with
          Leaflet crime heatmaps and Recharts analytics, while Firebase Auth
          with phone/email OTP enforces role-based access control.
        </p>
      </div>
    ),
    features: [
      "Geo-tagged incident reports with photo/video evidence",
      "Community voting to verify reported incidents",
      "Gemini 2.0 Flash automated scene description and image analysis",
      "Leaflet crime heatmaps with Recharts analytics",
      "Role-based access control via Firebase Auth and OTP verification",
    ],
    pages: [
      "Dashboard",
      "Report a Crime",
      "Crime Feed",
      "Heatmap",
      "Alerts & Updates",
      "Profile",
    ],
  },
  {
    href: "https://therap-lms.vercel.app/",
    title: "EduVerse",
    description:
      "AI-powered Learning Management platform with automated course creation, real-time virtual classrooms, forums, and admin analytics",
    thumbnail: eduVerse,
    images: [eduVerse, edu2, edu3, edu4, edu5, edu6, edu7, edu8],
    stack: [
      { name: "Next.js", Icon: <NextJs size={iconSize} /> },
      { name: "Spring Boot", Icon: <Spring size={iconSize} /> },
      { name: "Hono", Icon: <NodeJs size={iconSize} /> },
      { name: "MongoDB", Icon: <MongoDB size={iconSize} /> },
      { name: "Cloudinary", Icon: <Cloudinary size={iconSize} /> },
      { name: "Jitsi Meet", Icon: <ViteJS size={iconSize} /> },
    ],
    slug: "eduverse",
    category: "web",
    year: "2024",
    context: "Therap JavaFest",
    content: (
      <div className="space-y-3">
        <p>
          Built during Therap JavaFest — an end-to-end learning management
          platform where instructors can generate entire course curricula using
          AI, host unlimited live video classes via Jitsi Meet, and manage
          student interactions through forums and chatrooms.
        </p>
        <p>
          The admin dashboard provides comprehensive analytics on course
          engagement, student performance, and platform usage. Cloudinary
          handles on-the-fly media optimization for course materials.
        </p>
      </div>
    ),
    features: [
      "AI-driven course creation automating curriculum generation",
      "Unlimited real-time virtual classrooms via Jitsi Meet",
      "Interactive forums and chatrooms for student collaboration",
      "Comprehensive admin analytics dashboard",
      "On-the-fly media optimization with Cloudinary",
    ],
    pages: [
      "Home",
      "Courses",
      "Meetings",
      "Forums",
      "Chatrooms",
      "Admin Dashboard",
      "Profile",
      "Newsletters",
      "Course Management",
    ],
  },
  {
    href: "https://www.acpscm.site/",
    github: "https://github.com/Abrar118/ACPMS-Website",
    title: "ACPSCM",
    description:
      "Mathematics society platform for Adamjee Cantonment Public School — events, digital magazine publishing, and a categorized resource library on a Supabase-only architecture",
    thumbnail: acpscmLanding,
    images: [acpscmLanding, acpscm2, acpscm3],
    stack: [
      { name: "Next.js 14", Icon: <NextJs size={iconSize} /> },
      { name: "Supabase", Icon: <Supabase size={iconSize} /> },
      { name: "PostgreSQL", Icon: <PostgreSQL size={iconSize} /> },
      { name: "Zustand", Icon: <React size={iconSize} /> },
      { name: "React Hook Form", Icon: <React size={iconSize} /> },
    ],
    slug: "acpscm",
    category: "web",
    year: "2025",
    content: (
      <div className="space-y-3">
        <p>
          A live management platform for the Adamjee Cantonment Public School
          Club of Mathematics — handling events, a digital magazine, a
          categorized resource library, gallery, and blog for the society and
          its members.
        </p>
        <p>
          Built on a Supabase-only architecture: PostgreSQL Row Level Security
          enforces granular role-based permissions, and Supabase subscriptions
          power real-time event registration and notifications. Feature logic
          is modularized into reusable custom React hooks (useEvents,
          useMagazines, useAdmin).
        </p>
      </div>
    ),
    features: [
      "Event management with real-time registration and notifications",
      "Digital magazine publishing workflow",
      "Categorized academic resource library",
      "PostgreSQL Row Level Security for role-based permissions",
      "Reusable custom hooks (useEvents, useMagazines, useAdmin)",
    ],
    pages: [
      "Home",
      "Events",
      "Blog",
      "Resources",
      "Gallery",
      "About",
      "Contact",
    ],
  },
  {
    github: "https://github.com/ShadmanShafeen/Green-Cycle",
    title: "GreenCycle",
    description:
      "Gamified recycling app with TensorFlow/YOLOv8 object recognition, Gemini-powered guidance, and Firebase push notifications",
    thumbnail: greenCycleLanding,
    images: [greenCycleLanding, greenCycle2, greenCycle3, greenCycle1],
    stack: [
      { name: "Flutter", Icon: <Flutter size={iconSize} /> },
      { name: "Python", Icon: <Python size={iconSize} /> },
      { name: "TensorFlow", Icon: <Tensorflow size={iconSize} /> },
      { name: "Node.js", Icon: <NodeJs size={iconSize} /> },
      { name: "Firebase", Icon: <Firebase size={iconSize} /> },
    ],
    slug: "greencycle",
    category: "mobile",
    year: "2024",
    context: "IEEE QPAIN 2025 Published · SDP-II",
    content: (
      <div className="space-y-3">
        <p>
          A gamified recycling app that uses AI to make waste disposal engaging.
          Point your camera at any object and the TensorFlow + YOLOv8 model
          identifies whether it&apos;s recyclable, what category it belongs to,
          and where to dispose of it.
        </p>
        <p>
          Gemini generates contextual tips and guides. Users earn rewards for
          recycling activities, compete on leaderboards, and connect with local
          recycling vendors. This project was published at the 2025 IEEE QPAIN
          conference.
        </p>
      </div>
    ),
    features: [
      "TensorFlow + YOLOv8 object recognition for waste classification",
      "Gemini AI for dynamic recycling guidance",
      "Gamified reward system with leaderboards",
      "Vendor marketplace connecting recyclers and collectors",
      "Firebase Cloud Messaging for task reminders",
    ],
    pages: [
      "Home",
      "Classify Waste",
      "Find Vendor",
      "Leaderboard",
      "Community",
      "Profile",
    ],
  },
  {
    href: "https://pioneer-mist-two.vercel.app/",
    title: "MIST Pioneers",
    description:
      "AES-encrypted memorial blog for the student movement martyrs, built with MDX content authoring and Velite parsing",
    thumbnail: pioLanding,
    images: [pioLanding, pio1],
    stack: [
      { name: "Next.js", Icon: <NextJs size={iconSize} /> },
      { name: "AES", Icon: <Bash size={iconSize} /> },
      { name: "MDX", Icon: <Markdown size={iconSize} /> },
      { name: "Velite", Icon: <Prettier size={iconSize} /> },
    ],
    slug: "mist-pioneers",
    category: "web",
    year: "2024",
    content: (
      <div className="space-y-3">
        <p>
          A memorial website honoring the brave students who fought for rights
          and justice at MIST. Built as a blog platform where contributors can
          write stories and memories using MDX — Markdown with JSX components
          for rich content.
        </p>
        <p>
          Sensitive memorial data is secured with AES encryption. Velite and
          Rehype handle efficient Markdown parsing and semantic formatting for
          consistent, accessible content presentation.
        </p>
      </div>
    ),
    features: [
      "MDX-based content authoring with JSX components",
      "AES encryption for sensitive memorial data",
      "Velite + Rehype for semantic formatting",
      "Admin dashboard for content management",
    ],
    pages: ["Home", "Blog", "About", "Contact", "Admin Dashboard", "Profile"],
  },
  {
    href: "https://elyria-edu-dev.web.app/",
    title: "Elyria",
    description:
      "Real-time collaborative code editor with project file management, built with Monaco Editor and Socket.IO during BUET DevSprint",
    thumbnail: elyriaLanding,
    images: [elyriaLanding],
    stack: [
      { name: "React", Icon: <React size={iconSize} /> },
      { name: "Node.js", Icon: <NodeJs size={iconSize} /> },
      { name: "MongoDB", Icon: <MongoDB size={iconSize} /> },
      { name: "Socket.IO", Icon: <ViteJS size={iconSize} /> },
      { name: "Monaco", Icon: <VisualStudioCode size={iconSize} /> },
    ],
    slug: "elyria",
    category: "web",
    year: "2024",
    context: "BUET DevSprint 2024 Finalist",
    content: (
      <div className="space-y-3">
        <p>
          A collaborative development platform built in 24 hours during BUET
          DevSprint 2024 (where our team was a finalist). Multiple developers
          can edit the same codebase in real-time through Monaco Editor with
          Socket.IO syncing changes instantly.
        </p>
        <p>
          Includes project file management, course organization, and integrated
          chatrooms for team communication.
        </p>
      </div>
    ),
    features: [
      "Real-time collaborative code editing via Monaco + Socket.IO",
      "Project file management and organization",
      "Integrated team chatrooms",
      "Course management capabilities",
    ],
    pages: ["Home", "Courses", "Projects", "Code Editor", "Chatrooms"],
  },
  {
    href: "https://rhub-6bde5.web.app/",
    title: "MIST Resource Hub",
    description:
      "Community-driven academic resource archive with structured categorization, search, and cloud-based file management",
    thumbnail: rhubLanding,
    images: [rhubLanding, rhub2, rhub3, rhub4, rhub1],
    stack: [
      { name: "React", Icon: <React size={iconSize} /> },
      { name: "Express", Icon: <ExpressJsDark size={iconSize} /> },
      { name: "MongoDB", Icon: <MongoDB size={iconSize} /> },
      { name: "Cloudinary", Icon: <Cloudinary size={iconSize} /> },
      { name: "Firebase", Icon: <Firebase size={iconSize} /> },
    ],
    slug: "resource-hub",
    category: "web",
    year: "2023",
    content: (
      <div className="space-y-3">
        <p>
          A structured community-based resource platform where students can
          upload, categorize, and discover academic materials — books, slides,
          notes, and past exam papers organized by department, course, and
          semester.
        </p>
        <p>
          Features full-text search, Cloudinary-powered file hosting, and
          Firebase authentication. Used actively by MIST students.
        </p>
      </div>
    ),
    features: [
      "Structured categorization by department and course",
      "Full-text search across all resources",
      "Cloud-based file hosting via Cloudinary",
      "Community upload and curation system",
    ],
    pages: ["Home", "Resources", "Search", "Categories", "Upload", "Profile"],
  },
  {
    href: "https://ai-prompt-ebon.vercel.app/",
    title: "Prompt Finder",
    description:
      "Platform for sharing and discovering AI prompts optimized for ChatGPT, Claude, and other LLMs",
    thumbnail: promptLanding,
    images: [promptLanding],
    stack: [
      { name: "Next.js", Icon: <NextJs size={iconSize} /> },
      { name: "Vercel", Icon: <VercelDark size={iconSize} /> },
      { name: "Tailwind", Icon: <TailwindCSS size={iconSize} /> },
    ],
    slug: "prompt-finder",
    category: "web",
    year: "2023",
    content: (
      <div>
        <p>
          A community platform to share and discover complex AI prompts that
          get the best out of large language models. Browse by category, save
          favorites, and contribute your own prompt engineering techniques.
        </p>
      </div>
    ),
    features: [
      "Community-driven prompt sharing and discovery",
      "Category-based browsing and search",
      "Optimized for multiple LLMs",
    ],
    pages: ["Home", "Prompt Listing", "Prompt Details", "Create Prompt"],
  },
  {
    github: "https://github.com/Abrar118/sniff-n-paws",
    title: "Sniff-n-Paws",
    description:
      "Pet foster home management system with daycare scheduling, veterinary tracking, and Oracle database backend",
    thumbnail: sniffPawsLanding,
    images: [sniffPawsLanding],
    stack: [
      { name: "React", Icon: <React size={iconSize} /> },
      { name: "Node.js", Icon: <NodeJs size={iconSize} /> },
      { name: "Oracle", Icon: <MySQL size={iconSize} /> },
    ],
    slug: "sniff-n-paws",
    category: "web",
    year: "2023",
    context: "DBMS Course Project",
    content: (
      <div>
        <p>
          A web-based management system for a pet foster home, featuring
          daycare scheduling, veterinary record tracking, and adoption
          management. Built with React frontend and Oracle database backend
          as a Database Management System course project.
        </p>
      </div>
    ),
    features: [
      "Daycare scheduling and management",
      "Veterinary record tracking",
      "Adoption management workflow",
      "Oracle DB with complex relational schema",
    ],
    pages: ["Home", "Pets", "Veterinary", "Daycare", "Profile"],
  },
];
