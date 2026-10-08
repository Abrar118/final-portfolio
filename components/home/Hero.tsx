import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin, ScrollText } from "lucide-react";

const stats = [
  { value: "1,000+", label: "Users served", note: "Psycloud clinical platform" },
  { value: "300", label: "Concurrent users", note: "Government duty platform" },
  { value: "1425", label: "Codeforces peak", note: "Specialist rank" },
  { value: "496", label: "Problems solved", note: "Competitive programming" },
];

const equipped = ["Spring Boot", "Next.js", "FastAPI", "Flutter", "PostgreSQL", "Rust"];

export default function Hero({ questCount }: { questCount: number }) {
  return (
    <section className="page-wrap hero">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="chapter-chip">
            <span className="chapter-dot" aria-hidden="true" />
            Chapter I · The Trailhead
          </p>
          <h1 className="hero-name">
            Abrar
            <br />
            <span className="text-glow">Mahir Esam</span>
          </h1>
          <p className="hero-role">
            Full-stack software engineer
            <span aria-hidden="true"> ✦ </span>
            competitive programmer
          </p>
          <p className="hero-lede">
            I build calm, solid systems end to end — Spring Boot, FastAPI and
            Node.js behind React and Next.js. Principal architect of Psycloud,
            a clinical platform serving 1,000+ users, and builder of a
            government duty platform running 300 concurrent users.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/projects" className="btn btn-primary">
              Open the quest log <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/profile" className="btn">
              <ScrollText className="h-4 w-4" aria-hidden="true" /> Read the lore
            </Link>
          </div>
          <p className="hero-hint hidden lg:block">
            <kbd>1</kbd>–<kbd>4</kbd> quick-travel · scroll to walk the trail
          </p>
        </div>

        <aside className="glass char-sheet" aria-labelledby="sheet-title">
          <div className="flex items-center gap-4">
            <span className="sheet-portrait">
              <Image
                src="/hero-portrait.jpg"
                alt="Portrait of Abrar Mahir Esam"
                width={76}
                height={76}
                priority
              />
            </span>
            <div className="min-w-0">
              <p className="hud-label" id="sheet-title">
                Character sheet
              </p>
              <p className="mt-1 font-display text-lg font-semibold tracking-wide">
                Full-stack Engineer
              </p>
              <p className="mt-0.5 flex items-center gap-1.5 text-xs text-muted-foreground">
                <MapPin className="h-3 w-3" aria-hidden="true" /> Dhaka, Bangladesh
              </p>
            </div>
          </div>

          <dl className="sheet-stats">
            {stats.map((s) => (
              <div key={s.label} className="sheet-stat">
                <dt>{s.label}</dt>
                <dd>
                  <span className="sheet-value">{s.value}</span>
                  <span className="sheet-note">{s.note}</span>
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-5">
            <p className="hud-label">Equipped</p>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {equipped.map((e) => (
                <li key={e} className="chip">
                  {e}
                </li>
              ))}
            </ul>
          </div>

          <Link href="/projects" className="sheet-footer">
            <span>
              <span className="text-primary">{questCount}</span> quests completed
            </span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </aside>
      </div>
    </section>
  );
}
