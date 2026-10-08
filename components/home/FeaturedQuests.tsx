import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { projects } from "@/data/home/projects";
import type { Project } from "@/types/project";
import { categoryLabel } from "@/lib/quests";

const featured = ["astryn", "nudge", "crimelens", "quickdev"];
const summaries: Record<string, string> = {
  astryn: "A calmer home for a fragmented workday.",
  nudge: "Small steps toward longer-term ambitions.",
  crimelens: "Making community safety a shared effort.",
  quickdev: "Your entire workspace, one command away.",
};

function QuestCard({ project }: { project: Project }) {
  const preview =
    project.slug === "astryn" ? (project.images[1] ?? project.thumbnail) : project.thumbnail;
  const portrait =
    typeof project.thumbnail !== "string" && project.thumbnail.height > project.thumbnail.width;
  return (
    <article className="glass quest-card">
      <Link href={`/projects/${project.slug}`} className="quest-card-link">
        <div className="quest-card-art">
          {portrait ? (
            <div className="flex h-[84%] justify-center gap-4">
              {project.images.slice(0, 2).map((image, i) => (
                <div key={i} className="relative aspect-[852/1846] h-full overflow-hidden rounded-xl">
                  <Image
                    src={image}
                    alt={`${project.title} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 30vw, 160px"
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="relative aspect-video w-[88%] overflow-hidden rounded-lg">
              <Image
                src={preview}
                alt={`${project.title} interface`}
                fill
                sizes="(max-width: 768px) 85vw, 460px"
                className="object-contain"
              />
            </div>
          )}
        </div>
        <div className="p-5">
          <div className="flex items-center justify-between gap-3">
            <span className="quest-tag">Main quest · {categoryLabel[project.category ?? "web"]}</span>
            <span className="text-xs text-muted-foreground">{project.year}</span>
          </div>
          <div className="mt-3 flex items-center justify-between gap-4">
            <h3 className="quest-card-title">{project.title}</h3>
            <span className="quest-card-arrow" aria-hidden="true">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {summaries[project.slug ?? ""] ?? project.description}
          </p>
          <p className="mt-4 text-xs text-muted-foreground">
            <span className="hud-label !text-[10px]">Rewards</span>{" "}
            {project.stack?.slice(0, 4).map((s) => s.name).join(" · ")}
          </p>
        </div>
      </Link>
    </article>
  );
}

export default function FeaturedQuests() {
  const list = featured.flatMap((slug) => {
    const p = projects.find((x) => x.slug === slug);
    return p ? [p] : [];
  });
  return (
    <section className="page-wrap section" aria-labelledby="quests-title">
      <div className="section-head">
        <div>
          <p className="hud-label">Selected work</p>
          <h2 id="quests-title" className="section-title">
            Main Quests
          </h2>
        </div>
        <Link href="/projects" className="btn btn-ghost">
          All {projects.length} quests <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
      <div className="grid gap-5 md:grid-cols-2">
        {list.map((p) => (
          <QuestCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
