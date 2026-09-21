import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { timeline } from "@/data/about/timeline";
import { achievements } from "@/data/about/achievements";

export default function About() {
  return (
    <div>
      <div className="grid items-center gap-10 lg:grid-cols-[1.35fr,1fr]">
        <div><p className="section-kicker">A little about me</p><h1 className="page-title">An engineer.<br />Always a learner.</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">I’m Abrar Mahir Esam, a software engineer based in Dhaka. I like understanding how things work — and making them work a little better.</p>
          <a href="https://drive.google.com/file/d/1eZUsSET8zvuxdD0g8htX1td60L3bXPXC/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="glass-button mt-6">View résumé <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div className="glass-panel mx-auto w-full max-w-sm p-2.5"><div className="relative aspect-[4/3] overflow-hidden rounded-[20px]"><Image src="/avatar2.jpg" alt="Abrar Mahir Esam" fill priority sizes="(max-width: 768px) 85vw, 384px" className="object-cover" /></div></div>
      </div>
      <div className="mt-12 grid gap-6 text-base leading-8 text-muted-foreground md:grid-cols-2 md:gap-12">
        <div className="space-y-5"><p>I’m a fullstack software engineer at Bengal Byte — one of the first engineers on Psycloud, a production clinical platform now serving over 1,000 users, and a principal architect of the product. I earned my BSc in CSE from MIST (CGPA 3.56/4.00), where I’m now pursuing my MSc part-time.</p><p>I work end to end across Spring Boot (Java 21), FastAPI, and Node.js behind React and Next.js, over PostgreSQL, MongoDB, and Redis. I also architected a government personnel and duty-management platform running 300 concurrent users, and I publish open-source developer tooling in Rust.</p></div>
        <div className="space-y-5"><p>I’m a Codeforces Specialist (max rating 1425, 496 problems solved), and I’ve mentored three batches of competitive programmers at the MIST Computer Club. My research on AI-enhanced waste recycling was published at IEEE QPAIN 2025, and my thesis applied multiparadigm machine learning to low-resource language feedback.</p><p>Outside software, I write poems and draw — from quick sketches to Inktober. That same curiosity shapes how I think about engineering and design.</p></div>
      </div>
      <section className="mt-20">
        <p className="section-kicker">The journey so far</p>
        <h2 className="section-title">Experience & education.</h2>
        <ol className="journey mt-10">
          <li className="journey-cap" aria-hidden="true">
            <span className="journey-cap-label hidden md:block">Now</span>
            <span className="journey-rail">
              <span className="journey-node journey-node--now" />
            </span>
            <span className="journey-cap-label md:hidden">Now</span>
          </li>
          {timeline.map((item, index) => (
            <li className="journey-item" key={`${item.company}-${index}`}>
              <span className="journey-date">{item.date}</span>
              <span className="journey-rail" aria-hidden="true">
                <span className="journey-node" />
                <span className="journey-connector" />
              </span>
              <article className="glass-panel journey-card p-6 md:p-8">
                <p className="text-xs text-muted-foreground md:hidden">{item.date}</p>
                <div className="mt-1 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 md:mt-0">
                  <h3 className="text-lg font-medium tracking-tight">{item.company}</h3>
                  <p className="text-xs text-muted-foreground">{item.location}</p>
                </div>
                <p className="mt-1 text-sm text-accent">{item.title}</p>
                <p className="mt-4 text-sm leading-6 text-muted-foreground">{item.description}</p>
                <ul className="mt-4 space-y-2">
                  {item.responsibilities.map((r) => (
                    <li key={r} className="flex gap-3 text-sm leading-6 text-muted-foreground">
                      <span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                      {r}
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-20">
        <p className="section-kicker">Along the way</p>
        <h2 className="section-title">Achievements & recognition.</h2>
        <ol className="journey mt-10">
          {achievements.map((a, index) => (
            <li className="journey-item journey-item--compact" key={`${a.title}-${index}`}>
              <span className="journey-date">{a.date}</span>
              <span className="journey-rail" aria-hidden="true">
                <span className="journey-node" />
                <span className="journey-connector" />
              </span>
              <article className="glass-panel journey-card p-5 md:p-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="journey-chip">{a.type}</span>
                  <span className="text-xs text-muted-foreground md:hidden">{a.date}</span>
                </div>
                <h3 className="mt-3 text-base font-medium">{a.title}</h3>
                <p className="mt-1 text-sm text-accent">{a.organization}</p>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{a.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
