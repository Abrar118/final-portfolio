import { skillsTabs } from "@/data/home/skillsTab";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SkillsSection() {
  return (
    <section id="armory" className="mx-auto grid max-w-7xl gap-12 border-t border-border px-6 py-16 md:grid-cols-[0.85fr,1.15fr] md:px-12 md:py-24">
      <div>
        <p className="mb-4 font-mono text-xs text-accent">02 — The practice</p>
        <h2 className="font-heading text-5xl leading-[1.05] tracking-tight sm:text-6xl">From the interface<br /><em>to the infrastructure.</em></h2>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">I work across the stack, connecting the details people see with the systems they depend on. The tools change. Curiosity stays.</p>
        <Link href="/profile" className="studio-link mt-6 inline-flex min-h-11 items-center gap-3 text-sm">More about my background <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
      <div>
        {skillsTabs.map((category, index) => (
          <div key={category.value} className="grid grid-cols-[28px,1fr] gap-4 border-b border-border py-5 first:pt-0">
            <span className="pt-1 font-mono text-xs text-accent">{String(index + 1).padStart(2, "0")}</span>
            <div><h3 className="text-sm font-medium">{category.title}</h3><p className="mt-2 text-sm leading-7 text-muted-foreground">{category.contents.map(skill => skill.name).join(" / ")}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
