import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/home/projects";
import { accentFor } from "@/lib/projectAccents";
import type { Project } from "@/types/project";

const selected = ["astryn", "nudge", "crimelens", "quickdev"];
const summaries: Record<string, string> = {
  astryn: "A calmer home for a fragmented workday.",
  nudge: "Small steps. Longer-term ambitions.",
  crimelens: "Making community safety a shared effort.",
  quickdev: "Your entire workspace, one command away.",
};
const labels: Record<string, string> = { desktop: "Desktop & tooling", mobile: "Mobile application", web: "Web platform" };

function Work({ project }: { project: Project }) {
  const preview = project.slug === "astryn" ? project.images[1] ?? project.thumbnail : project.thumbnail;
  const portrait = typeof project.thumbnail !== "string" && project.thumbnail.height > project.thumbnail.width;
  return (
    <article
      className="glass-panel project-card overflow-hidden p-2.5"
      style={{ "--card-accent": accentFor(project.slug) } as CSSProperties}
    >
      <Link href={`/projects/${project.slug}`} className="group block rounded-[20px] focus-visible:outline-offset-8">
        <div className="work-canvas relative flex aspect-[16/11] items-center justify-center overflow-hidden rounded-[20px]">
          {portrait ? (
            <div className="project-preview flex h-[83%] w-[80%] justify-center gap-4 sm:gap-6">
              {project.images.slice(0, 2).map((image, i) => (
                <div key={i} className="relative aspect-[852/1846] h-full overflow-hidden rounded-xl shadow-lg">
                  <Image src={image} alt={`${project.title} screenshot ${i + 1}`} fill sizes="(max-width: 768px) 30vw, 180px" className="object-contain" />
                </div>
              ))}
            </div>
          ) : (
            <div className="project-preview relative aspect-video w-[88%] overflow-hidden rounded-lg shadow-xl shadow-slate-900/10">
              <Image src={preview} alt={`${project.title} application interface`} fill sizes="(max-width: 768px) 85vw, 520px" className="object-contain" />
            </div>
          )}
        </div>
        <div className="p-4 pb-3 sm:p-5">
          <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground"><span className="accent-text font-medium">{labels[project.category ?? ""] ?? project.category}</span><span>{project.year}</span></div>
          <div className="flex items-center justify-between gap-4"><h3 className="card-title font-heading text-2xl font-medium tracking-tight transition-colors sm:text-3xl">{project.title}</h3><span className="card-arrow flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border/70 transition-colors"><ArrowUpRight className="h-5 w-5" /></span></div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{summaries[project.slug ?? ""] ?? project.description}</p>
        </div>
      </Link>
    </article>
  );
}

export default function ProjectSection() {
  const featured = selected.flatMap(slug => { const project = projects.find(p => p.slug === slug); return project ? [project] : []; });
  return (
    <section id="quests" className="mx-auto max-w-7xl scroll-mt-28 px-6 py-10 md:px-12 md:py-14">
      <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
        <div><p className="section-kicker">Selected work</p><h2 className="section-title">Ideas, made real.</h2></div>
        <Link href="/projects" className="inline-flex min-h-11 items-center gap-2 text-sm font-medium hover:text-accent">All projects <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
      <div className="grid gap-6 md:grid-cols-2">{featured.map(project => <Work key={project.slug} project={project} />)}</div>
      <Link href="/projects" className="mt-8 flex min-h-14 items-center justify-center gap-3 text-sm text-muted-foreground hover:text-accent">Explore all {projects.length} projects <ArrowRight className="h-4 w-4" /></Link>
    </section>
  );
}
