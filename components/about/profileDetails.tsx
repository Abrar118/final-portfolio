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
          <a href="/Abrar-Mahir-Esam-CV.pdf" target="_blank" rel="noopener noreferrer" className="glass-button mt-6">View résumé <ArrowUpRight className="h-4 w-4" /></a>
        </div>
        <div className="glass-panel mx-auto w-full max-w-sm p-2.5"><div className="relative aspect-[4/3] overflow-hidden rounded-[20px]"><Image src="/avatar2.jpg" alt="Abrar Mahir Esam" fill priority sizes="(max-width: 768px) 85vw, 384px" className="object-cover" /></div></div>
      </div>
      <div className="mt-12 grid gap-6 text-base leading-8 text-muted-foreground md:grid-cols-2 md:gap-12">
        <div className="space-y-5"><p>I’m currently at Bengal Byte, building a privacy-focused patient management platform for a European healthcare provider. I earned my BSc in Computer Science and Engineering from MIST (CGPA 3.56/4.00), where I’m also pursuing my MSc.</p><p>My work spans Next.js and Spring Boot applications, desktop tools with Tauri and Rust, and Flutter mobile apps. I’ve also built a personnel and duty management platform for the Government of Bangladesh.</p></div>
        <div className="space-y-5"><p>I’m a Codeforces Specialist with a highest rating of 1425, and I’ve mentored three batches of competitive programmers at the MIST Computer Club. My research on AI-enhanced waste recycling was published at the 2025 IEEE QPAIN conference.</p><p>Outside software, I write poems and draw — from quick sketches to Inktober. That same curiosity shapes how I think about engineering and design.</p></div>
      </div>
      <section className="mt-20"><p className="section-kicker">The journey so far</p><h2 className="section-title">Experience & education.</h2>
        <div className="mt-9 space-y-4">{timeline.map((item, index) => (
          <article className="glass-panel grid gap-5 p-6 md:grid-cols-[220px,1fr] md:p-8" key={`${item.company}-${index}`}>
            <div><p className="text-xs text-muted-foreground">{item.date}</p><h3 className="mt-3 text-lg font-medium tracking-tight">{item.company}</h3><p className="mt-1 text-sm text-accent">{item.title}</p></div>
            <div><p className="text-sm leading-6 text-muted-foreground">{item.description}</p><ul className="mt-4 space-y-2">{item.responsibilities.map(r => <li key={r} className="flex gap-3 text-sm leading-6 text-muted-foreground"><span aria-hidden="true" className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent" />{r}</li>)}</ul></div>
          </article>
        ))}</div>
      </section>
      <section className="mt-20"><p className="section-kicker">Along the way</p><h2 className="section-title">Achievements & recognition.</h2><div className="mt-9 grid gap-4 md:grid-cols-2">{achievements.map((a,index) => (
        <article key={`${a.title}-${index}`} className="glass-panel p-6"><p className="text-xs text-muted-foreground">{a.type} · {a.date}</p><h3 className="mt-3 text-base font-medium">{a.title}</h3><p className="mt-1 text-sm text-accent">{a.organization}</p><p className="mt-3 text-sm leading-6 text-muted-foreground">{a.description}</p></article>
      ))}</div></section>
    </div>
  );
}
