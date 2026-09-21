import { skillsTabs } from "@/data/home/skillsTab";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function SkillsSection() {
  return (
    <section id="armory" className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-20">
      <div className="glass-panel grid gap-10 p-7 md:grid-cols-[0.9fr,1.1fr] md:gap-16 md:p-12">
        <div>
          <p className="section-kicker">How I build</p>
          <h2 className="section-title leading-[1.12]">Good on the surface.<br /><span className="text-muted-foreground">Solid underneath.</span></h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted-foreground">I work across the stack, connecting the details people see with the systems they depend on. The tools change. Curiosity stays.</p>
          <Link href="/profile" className="studio-link mt-6 inline-flex min-h-11 items-center gap-3 text-sm">A little more about me <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
        <div className="flex flex-col">
          {skillsTabs.map((category) => (
            <div
              key={category.value}
              className="border-b border-border/60 py-5 first:pt-0 last:border-0 last:pb-0"
            >
              <h3 className="text-sm font-medium">{category.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {category.contents.map((skill) => {
                  const Icon = skill.img;
                  // Pure-white brand icons vanish on light chips — let those
                  // fall back to the neutral ink color instead.
                  const brandable = !/^#fff(f)?$/i.test(skill.iconColor);
                  return (
                    <span
                      key={skill.name}
                      title={skill.desc}
                      className="skill-chip"
                      style={
                        brandable
                          ? ({ "--chip-color": skill.iconColor } as CSSProperties)
                          : undefined
                      }
                    >
                      <Icon size={14} aria-hidden="true" />
                      {skill.name}
                    </span>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
