import { projects } from "@/data/home/projects";
import type { Project } from "@/types/project";
import type { NetworkLayout } from "@/lib/network-layout";
import { layoutNetwork } from "@/lib/network-layout";

/* The network: each stack is a line, each project or job a stop. Projects join
   lines automatically from their `stack`, so adding a project to
   data/home/projects.tsx puts it on the map with no change here. */

export type LineId = "M" | "F" | "J" | "C" | "T" | "R" | "A";

export type Line = {
  id: LineId;
  name: string;
  blurb: string;
  tools: string[];
  /** Matches a project's stack entry to this line. */
  match?: RegExp;
};

/* Order is the top-to-bottom rail order on the map. */
export const lines: Line[] = [
  {
    id: "M",
    name: "ML & Research",
    blurb: "Published research, thesis work and running LLMs on consumer hardware.",
    tools: ["Python", "TensorFlow", "YOLOv8", "llama.cpp", "Ollama", "MCP servers"],
    match: /python|tensorflow/i,
  },
  {
    id: "F",
    name: "Flutter",
    blurb: "Cross-platform mobile apps that keep working offline.",
    tools: ["Flutter", "Dart", "Riverpod", "Drift", "SQLite", "Kotlin"],
    match: /flutter|dart/i,
  },
  {
    id: "J",
    name: "Java & Spring",
    blurb: "Backends built to carry production load and keep data safe.",
    tools: ["Java 21", "Spring Boot", "Spring Security", "Flyway", "PostgreSQL", "Redis"],
    match: /spring|javafx|java\b/i,
  },
  {
    id: "C",
    name: "Career",
    blurb: "The jobs, in order, from trainee to principal architect.",
    tools: ["System design", "CI/CD", "TDD", "JWT / OAuth2", "RBAC", "Docker"],
  },
  {
    id: "T",
    name: "TypeScript & React",
    blurb: "Web clients and services, from dashboards to real-time tools.",
    tools: ["TypeScript", "React", "Next.js", "Node.js", "FastAPI", "PostgreSQL", "MongoDB"],
    match: /next\.?js|react(?! hook)|typescript/i,
  },
  {
    id: "R",
    name: "Rust",
    blurb: "Native tools and desktop software that start instantly.",
    tools: ["Rust", "Tauri 2", "async", "GraphQL", "SQLite"],
    match: /rust|tauri/i,
  },
  {
    id: "A",
    name: "Algorithms",
    blurb: "Competitive programming since 2022, and three batches of students mentored.",
    tools: ["C++", "Data structures", "Graph theory", "Contests"],
  },
];

export type Stop = {
  id: string;
  title: string;
  /** Short proof shown on the map under the name. */
  detail?: string;
  /** Decimal year; sets the position along the map. */
  at: number;
  lines: LineId[];
  href: string;
  /** Larger station, always labelled. */
  major?: boolean;
  /** The unbuilt final station. */
  hollow?: boolean;
  project?: Project;
};

const milestones: Stop[] = [
  { id: "club", title: "MIST Computer Club", detail: "Mentor, three batches", at: 2022.05, lines: ["C", "A"], href: "/profile#career" },
  { id: "champion", title: "Contest champion", detail: "MIST, 2022", at: 2022.6, lines: ["A"], href: "/profile#record" },
  { id: "runner-up", title: "Second runner-up", detail: "MIST, 2023", at: 2023.6, lines: ["A"], href: "/profile#record" },
  { id: "nogor", title: "Nogor Solutions", detail: "Industrial trainee", at: 2024.1, lines: ["C"], href: "/profile#career" },
  { id: "pmo", title: "Prime Minister's Office", detail: "300 concurrent users", at: 2024.35, lines: ["F", "J", "C", "T"], href: "/profile#career", major: true },
  { id: "specialist", title: "Codeforces Specialist", detail: "Peak rating 1425", at: 2024.6, lines: ["A"], href: "/profile#record" },
  { id: "bsc-thesis", title: "B.Sc. thesis", detail: "Romanized Bengali ML", at: 2025.45, lines: ["M"], href: "/profile#research" },
  { id: "llm-stack", title: "Local LLM stack", detail: "Quantized models on consumer hardware", at: 2026.6, lines: ["M"], href: "/profile#research" },
  { id: "msc-thesis", title: "M.Sc. thesis", detail: "Local LLM agents, in progress", at: 2026.75, lines: ["M"], href: "/profile#research", major: true },
  { id: "next-stop", title: "Next stop", at: 2027, lines: ["C"], href: "/contact", major: true, hollow: true },
];

const MAJOR_PROJECTS = new Set(["psycloud", "softcar", "spendsplit", "nudge", "astryn", "quickdev"]);

const linesForProject = (p: Project): LineId[] => {
  if (p.lines) return p.lines as LineId[];
  const stack = p.stack?.map((s) => s.name) ?? [];
  const found = lines
    .filter((l) => l.match && stack.some((name) => l.match!.test(name)))
    .map((l) => l.id);
  return found.length ? found : ["T"];
};

const stopsFromProjects: Stop[] = projects.flatMap((p, i) =>
  p.slug
    ? [
        {
          id: p.slug,
          title: p.title,
          detail: p.context?.split(" · ")[0],
          // Same-year projects keep their order in the data file.
          at: p.at ?? Number(p.year ?? 2024) + 0.5 + i * 0.001,
          lines: linesForProject(p),
          href: `/projects/${p.slug}`,
          major: MAJOR_PROJECTS.has(p.slug),
          project: p,
        },
      ]
    : [],
);

export const stops: Stop[] = [...milestones, ...stopsFromProjects].sort((a, b) => a.at - b.at);

export const stopById = new Map(stops.map((s) => [s.id, s]));
export const lineById = new Map(lines.map((l) => [l.id, l]));

/* Projects in the order they are listed, which is the order in the data file. */
export const projectStops: Stop[] = projects.flatMap((p) => {
  const stop = p.slug ? stopById.get(p.slug) : undefined;
  return stop ? [stop] : [];
});

export const stopsOnLine = (id: LineId) => stops.filter((s) => s.lines.includes(id));

export const buildLayout = (col?: number): NetworkLayout => layoutNetwork(lines, stops, col);

export const routes = [
  { path: "/", label: "Network", hotkey: "1" },
  { path: "/projects", label: "Work", hotkey: "2" },
  { path: "/profile", label: "About", hotkey: "3" },
  { path: "/contact", label: "Contact", hotkey: "4" },
] as const;

export const RESUME_URL = "/Abrar-Mahir-Esam-CV.pdf";

export const categoryLabel = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  backend: "Backend",
} as const;
