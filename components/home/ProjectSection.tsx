import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/home/projects";
import type { Project } from "@/types/project";

const selected = ["astryn", "nudge", "crimelens", "quickdev"];
const summaries: Record<string, string> = {
  astryn: "A calmer home for a fragmented workday.",
  nudge: "Small steps. Longer-term ambitions.",
  crimelens: "Making community safety a shared effort.",
  quickdev: "Your entire workspace, one command away.",
};
const labels: Record<string, string> = { desktop: "Desktop & tooling", mobile: "Mobile application", web: "Web platform" };

function Work({ project, index }: { project: Project; index: number }) {
  const preview = project.slug === "astryn" ? project.images[1] ?? project.thumbnail : project.thumbnail;
  const portrait = typeof project.thumbnail !== "string" && project.thumbnail.height > project.thumbnail.width;
  const images = portrait ? project.images.slice(0, 2) : [project.thumbnail];
  return (
    <article className={index === 0 ? "md:col-span-2" : ""}>
      <Link href={`/projects/${project.slug}`} className="group block">
        <div className={`work-canvas work-canvas-${project.slug} relative flex items-center justify-center overflow-hidden ${index === 0 ? "aspect-[16/10] sm:aspect-[2/1]" : "aspect-[4/3]"}`}>
          <span aria-hidden="true" className="absolute left-5 top-4 font-mono text-[11px] text-foreground/60">{String(index + 1).padStart(2, "0")}</span>
          <span className="absolute right-4 top-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-background/80 text-foreground transition-colors group-hover:bg-accent group-hover:text-accent-foreground"><ArrowUpRight className="h-5 w-5" /></span>
          {portrait ? (
            <div className="flex h-[83%] w-[80%] justify-center gap-4 sm:gap-6">
              {images.map((image, i) => (
                <div key={i} className="relative h-full aspect-[852/1846] overflow-hidden rounded-xl shadow-lg">
                  <Image src={image} alt={`${project.title}: ${i === 0 ? "goals overview" : "goal progress"}`} fill sizes="(max-width: 768px) 35vw, 220px" className="object-contain" />
                </div>
              ))}
            </div>
          ) : (
            <div className={`relative overflow-hidden rounded-sm shadow-lg ${index === 0 ? "aspect-video w-[83%]" : "aspect-video w-[86%]"}`}>
              <Image src={preview} alt={`${project.title} application interface`} fill sizes={index === 0 ? "(max-width: 768px) 85vw, 1000px" : "(max-width: 768px) 85vw, 520px"} className="object-contain" />
            </div>
          )}
        </div>
        <div className="flex items-start justify-between gap-5 pb-5 pt-5">
          <div>
            <h3 className="font-heading text-3xl leading-none tracking-tight transition-colors group-hover:text-accent sm:text-4xl">{project.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summaries[project.slug ?? ""] ?? project.description}</p>
          </div>
          <p className="pt-1 text-right font-mono text-[10px] leading-relaxed text-muted-foreground">{labels[project.category ?? ""] ?? project.category}<br />{project.year}</p>
        </div>
      </Link>
    </article>
  );
}

export default function ProjectSection() {
  const featured = selected.flatMap(slug => {
    const project = projects.find(p => p.slug === slug);
    return project ? [project] : [];
  });
  return (
    <section id="quests" className="mx-auto max-w-7xl scroll-mt-8 px-6 py-12 md:px-12 md:py-20">
      <div className="mb-10 flex flex-wrap items-end justify-between gap-5">
        <div><p className="mb-3 font-mono text-xs text-accent">01 — Selected work</p><h2 className="font-heading text-5xl tracking-tight sm:text-7xl">Ideas, made real<span className="text-accent">.</span></h2></div>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">A few things I’ve taken from a problem worth solving to a product you can use.</p>
      </div>
      <div className="grid gap-x-8 gap-y-10 md:grid-cols-2">
        {featured.map((project, index) => <Work key={project.slug} project={project} index={index} />)}
        <Link href="/projects" className="group flex min-h-64 flex-col justify-between border-y border-border py-7 md:aspect-[4/3] md:border-0 md:bg-card md:p-10">
          <span className="font-mono text-xs text-muted-foreground">There’s more in the archive</span>
          <span className="flex items-end justify-between gap-4 font-heading text-5xl tracking-tight sm:text-6xl">Explore<br />all projects <ArrowUpRight className="h-10 w-10 text-accent" /></span>
          <span className="text-sm text-muted-foreground">{projects.length} projects across web, mobile, and desktop</span>
        </Link>
      </div>
    </section>
  );
}
