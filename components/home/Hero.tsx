import Image from "next/image";
import Link from "next/link";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

export default function Hero({ projectCount = 14 }: { projectCount?: number }) {
  return (
    <section className="studio-hero mx-auto max-w-7xl px-6 pb-10 pt-12 md:px-12 md:pt-20">
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
        <p className="font-mono">Software engineer / Dhaka, Bangladesh</p>
        <p className="hidden font-mono sm:block">Web · Mobile · Desktop</p>
      </div>
      <div className="grid items-end gap-10 lg:grid-cols-[1.5fr,0.65fr] lg:gap-16">
        <div>
          <h1 className="font-heading text-[clamp(4.2rem,10vw,9rem)] font-normal leading-[0.88] tracking-[-0.055em]">
            Software with<br />
            <span className="italic text-accent">a point of view.</span>
          </h1>
          <div className="mt-10 grid gap-6 sm:grid-cols-[0.6fr,1fr] md:mt-12">
            <p className="text-sm leading-relaxed">
              I’m Abrar Mahir Esam.<br />
              <span className="text-muted-foreground">Full-stack software engineer with a keen interest in systems programming and microservices.</span>
            </p>
            <div>
              <p className="max-w-md text-base leading-relaxed text-muted-foreground">
                I turn complex problems into software that feels simple.
                From healthcare platforms to the little tools that make
                everyday life better.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-x-7 gap-y-3">
                <Link href="#quests" className="studio-link inline-flex min-h-11 items-center gap-3 text-sm font-medium">
                  Explore the work <ArrowDownRight className="h-5 w-5" />
                </Link>
                <Link href="/Abrar-Mahir-Esam-CV.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground">
                  Résumé <ArrowUpRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <figure className="relative mx-auto w-full max-w-[280px] lg:max-w-none">
          <div className="portrait-print relative aspect-[3/4] overflow-hidden bg-muted">
            <Image src="/hero-portrait.jpg" alt="Abrar Mahir Esam" fill priority sizes="(max-width: 1024px) 280px, 320px" className="object-cover object-top grayscale" />
          </div>
          <figcaption className="mt-3 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
            <span>01 / Behind the work</span>
            <Link href="/profile" aria-label="About Abrar Mahir Esam" className="inline-flex h-11 w-11 items-center justify-center hover:text-accent"><ArrowUpRight className="h-4 w-4" /></Link>
          </figcaption>
        </figure>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-between gap-4 border-y border-border py-5 md:mt-20">
        <p className="text-xs text-muted-foreground">Built across platforms. Designed around people.</p>
        <Link href="/projects" className="inline-flex min-h-11 items-center gap-4 font-mono text-xs hover:text-accent">{String(projectCount).padStart(2, "0")} projects in the archive <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
    </section>
  );
}
