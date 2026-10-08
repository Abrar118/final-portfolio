import Image from "next/image";
import {
  ArrowUpRight,
  Award,
  BookOpen,
  MapPin,
  Swords,
  Trophy,
  type LucideIcon,
} from "lucide-react";
import { timeline } from "@/data/about/timeline";
import { achievements } from "@/data/about/achievements";
import { RESUME_URL } from "@/data/zones";
import { toRoman } from "@/lib/quests";

const achievementIcon: Record<string, LucideIcon> = {
  Research: BookOpen,
  Hackathon: Swords,
  "Competitive Programming": Trophy,
  "Academic Merit": Award,
};

export default function About() {
  return (
    <div>
      <div className="grid items-center gap-10 lg:grid-cols-[1.3fr,1fr]">
        <div>
          <p className="chapter-chip">
            <span className="chapter-dot" aria-hidden="true" />
            Chapter II · The Elder Grove
          </p>
          <h1 className="page-title mt-5">
            The <span className="text-glow">Lore</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            I&apos;m Abrar Mahir Esam, a software engineer based in Dhaka. I
            like understanding how things work — and making them work a little
            better.
          </p>
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="btn mt-7">
            View résumé <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <figure className="glass portrait-frame mx-auto w-full max-w-sm">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[14px]">
            <Image
              src="/avatar2.jpg"
              alt="Abrar Mahir Esam"
              fill
              priority
              sizes="(max-width: 768px) 85vw, 384px"
              className="object-cover"
            />
          </div>
          <figcaption className="flex items-center justify-between px-2 pb-1 pt-3 text-xs text-muted-foreground">
            <span className="hud-label !text-[10px]">The engineer</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" aria-hidden="true" /> Dhaka
            </span>
          </figcaption>
        </figure>
      </div>

      <div className="glass mt-12 grid gap-6 p-6 text-base leading-8 text-muted-foreground md:grid-cols-2 md:gap-12 md:p-10">
        <div className="space-y-5">
          <p className="drop-cap">
            As a fullstack software engineer at Bengal Byte, I was one of the
            first engineers on Psycloud — a production clinical platform now
            serving over 1,000 users — and a principal architect of the product.
            I earned my BSc in CSE from MIST (CGPA 3.56/4.00), where I&apos;m
            now pursuing my MSc part-time.
          </p>
          <p>
            I work end to end across Spring Boot (Java 21), FastAPI, and
            Node.js behind React and Next.js, over PostgreSQL, MongoDB, and
            Redis. I also architected a government personnel and
            duty-management platform running 300 concurrent users, and I
            publish open-source developer tooling in Rust.
          </p>
        </div>
        <div className="space-y-5">
          <p>
            I&apos;m a Codeforces Specialist (max rating 1425, 496 problems
            solved), and I&apos;ve mentored three batches of competitive
            programmers at the MIST Computer Club. My research on AI-enhanced
            waste recycling was published at IEEE QPAIN 2025, and my thesis
            applied multiparadigm machine learning to low-resource language
            feedback.
          </p>
          <p>
            Outside software, I write poems and draw — from quick sketches to
            Inktober. That same curiosity shapes how I think about engineering
            and design.
          </p>
        </div>
      </div>

      <section className="mt-20" aria-labelledby="path-title">
        <p className="hud-label">Experience &amp; education</p>
        <h2 id="path-title" className="section-title">
          The Path So Far
        </h2>
        <ol className="trail mt-10">
          {timeline.map((item, index) => (
            <li className="trail-stop" key={`${item.company}-${index}`}>
              <span className="trail-marker" aria-hidden="true">
                {toRoman(timeline.length - index)}
              </span>
              <article className="glass trail-card">
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="font-display text-lg font-semibold tracking-wide">{item.company}</h3>
                  <p className="text-xs text-muted-foreground">{item.date}</p>
                </div>
                <p className="mt-1 text-sm text-primary">{item.title}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">{item.location}</p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <ul className="mt-4 space-y-2">
                  {item.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-secondary" />
                      {r}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section className="mt-20" aria-labelledby="achievements-title">
        <p className="hud-label">Along the way</p>
        <h2 id="achievements-title" className="section-title">
          Achievements Unlocked
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {achievements.map((a, index) => {
            const Icon = achievementIcon[a.type] ?? Trophy;
            return (
              <li key={`${a.title}-${index}`} className="glass achievement">
                <span className="achievement-badge" aria-hidden="true">
                  <Icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="quest-tag !text-[10px]">{a.type}</span>
                    <span className="text-xs text-muted-foreground">{a.date}</span>
                  </div>
                  <h3 className="mt-2 font-display text-base font-semibold tracking-wide">{a.title}</h3>
                  <p className="mt-1 text-sm text-primary">{a.organization}</p>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{a.description}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
