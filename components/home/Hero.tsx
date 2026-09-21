import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, Code2, MapPin } from "lucide-react";

export default function Hero({ projectCount = 14 }: { projectCount?: number }) {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-8 pt-12 md:px-12 md:pt-20">
      <div className="grid items-center gap-8 lg:grid-cols-[1.45fr,1fr] lg:gap-6">
        <div className="hero-intro glass-panel relative z-10">
          <p className="mb-6 flex items-center gap-2 text-sm text-muted-foreground"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Hello, I’m Abrar.</p>
          <h1 className="font-heading text-[clamp(2.5rem,6.3vw,5.5rem)] font-medium leading-[1.04] tracking-[-0.065em]">Thoughtful code.<br /><span className="text-accent">Useful products.</span></h1>
          <p className="mt-7 max-w-[440px] text-base leading-7 text-muted-foreground md:text-lg md:leading-8">Principal architect of Psycloud, a clinical platform serving 1,000+ users — and builder of a government duty-management system running 300 concurrent users. End to end: Spring Boot, FastAPI, and Node.js behind React and Next.js.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#quests" className="glass-button glass-button-primary">View my work <ArrowDown className="h-4 w-4" /></Link>
            <a href="https://drive.google.com/file/d/1eZUsSET8zvuxdD0g8htX1td60L3bXPXC/view?usp=drive_link" target="_blank" rel="noopener noreferrer" className="glass-button">View résumé <ArrowUpRight className="h-4 w-4" /></a>
          </div>
          <p className="mt-8 flex flex-wrap items-center gap-2 text-xs text-muted-foreground"><MapPin className="h-3.5 w-3.5" /> Dhaka, Bangladesh <span className="mx-2 text-border">/</span> Building across platforms</p>
        </div>
        <div className="hero-visual relative">
          <figure className="portrait-glass glass-panel absolute right-0 top-0 w-[265px] sm:right-0 sm:w-[310px]">
            <div className="relative aspect-[3/4] overflow-hidden rounded-[21px]">
              <Image src="/hero-portrait.jpg" alt="Abrar Mahir Esam" fill priority sizes="(max-width: 640px) 240px, 280px" className="object-cover object-top" />
              <figcaption className="hero-caption absolute bottom-3 left-3 right-3 rounded-2xl px-4 py-3">
                <p className="text-sm font-semibold">Abrar Mahir Esam</p><p className="mt-1 text-xs opacity-75">Engineer. Builder. Curious human.</p>
              </figcaption>
            </div>
          </figure>
          <Link href="/profile" className="glass-panel absolute bottom-6 left-0 flex items-center gap-4 !rounded-2xl px-5 py-4 sm:bottom-0 sm:left-0">
            <Code2 className="h-6 w-6 text-accent" /><div><p className="text-sm font-medium">From idea to interface</p><p className="mt-1 text-xs text-muted-foreground">Web · Mobile · Desktop</p></div><ArrowUpRight className="ml-2 h-4 w-4 text-muted-foreground" />
          </Link>
        </div>
      </div>
      <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-6 md:mt-14">
        <p className="text-xs text-muted-foreground">Thoughtful design. Solid engineering.</p>
        <Link href="/projects" className="flex min-h-11 items-center gap-3 text-xs text-muted-foreground hover:text-accent"><span className="font-medium text-foreground">{String(projectCount).padStart(2, "0")}</span> projects and counting <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
