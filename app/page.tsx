import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { LinePicker, MapHero, MapModeToggle, Route, Stopline, Bullet } from "@/components/network/parts";
import { lineVars } from "@/lib/line-vars";
import { lines, RESUME_URL, stopById, stopsOnLine, type LineId } from "@/data/network";
import { projects } from "@/data/home/projects";

const featured: { slug: string; field: LineId; note: string }[] = [
  { slug: "softcar", field: "T", note: "A car rental and fleet insurance platform. At Nyntax I built its insurance, booking and admin features in React and Express." },
  { slug: "spendsplit", field: "F", note: "One bank balance split into Available and Savings, fully offline. Every figure is derived from the entries and never stored." },
  { slug: "nudge", field: "F", note: "A local-first task manager with one promise: important tasks stay visible and keep reminding you until they are handled." },
  { slug: "astryn", field: "R", note: "A local-first desktop command center with a Rust core. Credentials stay in the OS keychain, and the webview never sees a token." },
];

const roles: { where: string; when: string; figure: string; text: string; href?: string }[] = [
  {
    where: "Psycloud, at Bengal Byte",
    when: "2025 – 2026",
    figure: "1,000+ users",
    href: "/projects/psycloud",
    text: "Principal architect of a clinical platform on Next.js, FastAPI, PostgreSQL and Redis: practitioner dashboard, assessment engine, and a backend built to EU data-protection rules.",
  },
  {
    where: "Prime Minister's Office, Bangladesh",
    when: "2024 – 2026",
    figure: "300 concurrent users",
    text: "Architected a personnel and duty-management platform: Spring Boot on PostgreSQL and Redis, with React and Flutter clients.",
  },
];

export default function Home() {
  return (
    <main>
      <MapHero corners={{ bottomLeft: <LinePicker />, topRight: <MapModeToggle /> }}>
        <div className="sign-grid">
          <div>
            <h1 className="sign-name">
              <span className="sign-avatar">
                <Image src="/hero-portrait.jpg" alt="" width={669} height={1280} sizes="200px" priority />
              </span>
              Abrar Mahir Esam
            </h1>
          </div>
          <div className="sign-aside">
            <p>
              Full-stack software engineer. I architect production systems end to end, from data model to mobile client.
            </p>
            <div className="sign-actions">
              <Link href="/projects" className="btn btn-sign">
                See the work <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn btn-sign-quiet">
                Résumé <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </MapHero>

      <Route line="C">
        <Stopline id="work" title="Where the line has run">
          <div className="roles">
            {roles.map((r, i) => (
              <article key={r.where} className={`role ${i === 0 ? "role-lead" : ""}`}>
                <p className="role-figure">{r.figure}</p>
                <div>
                  <h3 className="role-where">{r.href ? <Link href={r.href} className="role-link">{r.where}</Link> : r.where}</h3>
                  <p className="data role-when">{r.when}</p>
                  <p className="role-text">{r.text}</p>
                </div>
              </article>
            ))}
          </div>
          <Link href="/profile#career" className="text-link">
            The full career line <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Stopline>

        {featured.map(({ slug, field, note }, i) => {
          const stop = stopById.get(slug);
          const p = projects.find((x) => x.slug === slug);
          if (!stop || !p?.thumbnail) return null;
          const portrait = typeof p.thumbnail !== "string" && p.thumbnail.height > p.thumbnail.width;
          const sameLine = featured[i - 1]?.field === field;
          return (
            <section key={slug} className={`poster ${sameLine ? "poster-same-line" : ""}`} style={lineVars(field)}>
              <div className={`page-wrap poster-grid ${portrait ? "poster-portrait" : ""} ${sameLine ? "poster-flip" : ""}`}>
                <div className="poster-copy">
                  <h2 className="poster-title">
                    <Link href={`/projects/${slug}`} className="poster-title-link">
                      {p.title}
                    </Link>
                  </h2>
                  <p className="poster-lines">
                    {stop.lines.map((l) => (
                      <Bullet key={l} id={l} />
                    ))}
                    <span className="data">{p.year}</span>
                  </p>
                  <p className="poster-note">{note}</p>
                  <Link href={`/projects/${slug}`} className="poster-more" tabIndex={-1} aria-hidden="true">
                    View the project <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <Link href={`/projects/${slug}`} className="frame poster-frame" aria-label={`${p.title} project`}>
                  <Image
                    src={p.thumbnail}
                    alt={`${p.title} screenshot`}
                    sizes="(max-width: 1024px) 92vw, 900px"
                    className="frame-image"
                  />
                </Link>
              </div>
            </section>
          );
        })}

        <Stopline id="lines" title="Seven lines, one network">
          <ul className="line-table">
            {lines.map((l) => (
              <li key={l.id} className="line-row" style={lineVars(l.id)}>
                <Bullet id={l.id} size="lg" />
                <div className="line-row-main">
                  <h3>{l.name}</h3>
                  <p>{l.blurb}</p>
                </div>
                <p className="line-row-tools">{l.tools.join(", ")}</p>
                <p className="data line-row-count">{stopsOnLine(l.id).length} stops</p>
              </li>
            ))}
          </ul>
        </Stopline>
      </Route>
    </main>
  );
}
