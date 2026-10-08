"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Check, ExternalLink, Flame, Github } from "lucide-react";
import type { Project } from "@/types/project";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { categoryLabel, toRoman } from "@/lib/quests";
import { useWorld } from "@/lib/world";

type Neighbor = { slug: string; title: string } | null;

export default function ProjectDetailsContainer({
  project,
  number,
  prev,
  next,
}: {
  project: Project;
  number: number;
  prev: Neighbor;
  next: Neighbor;
}) {
  const setFocusSlug = useWorld((s) => s.setFocusSlug);
  React.useEffect(() => {
    setFocusSlug(project.slug ?? null);
    return () => setFocusSlug(null);
  }, [project.slug, setFocusSlug]);

  return (
    <main className="page-wrap page-top">
      <nav aria-label="Breadcrumb" className="text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-muted-foreground">
          <li>
            <Link href="/projects" className="inline-flex min-h-11 items-center gap-1.5 hover:text-primary">
              <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" /> Quest Log
            </Link>
          </li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">
            {project.title}
          </li>
        </ol>
      </nav>

      <header className="mt-4 max-w-3xl">
        <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
          <span className="quest-tag">
            Quest {toRoman(number)} · {project.category ? categoryLabel[project.category] : "Quest"}
          </span>
          {project.year && <span className="text-muted-foreground">{project.year}</span>}
          {project.context && <span className="text-secondary">{project.context}</span>}
        </p>
        <h1 className="page-title mt-4">{project.title}</h1>
        <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{project.description}</p>
        <div className="mt-7 flex flex-wrap gap-3">
          {project.href && (
            <a href={project.href} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
              <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live preview
            </a>
          )}
          {project.github && (
            <a href={project.github} target="_blank" rel="noopener noreferrer" className="btn">
              <Github className="h-4 w-4" aria-hidden="true" /> Source code
            </a>
          )}
        </div>
      </header>

      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2">
        {project.images.map((image, index) => {
          const portrait = typeof image !== "string" && image.height > image.width;
          return (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <button
                  aria-label={`Enlarge ${project.title} screenshot ${index + 1}`}
                  className={`glass gallery-shot group ${
                    portrait ? "aspect-[9/19.5]" : index === 0 ? "aspect-video md:col-span-2" : "aspect-video"
                  }`}
                >
                  <span className="relative block h-full w-full overflow-hidden rounded-[14px]">
                    <Image
                      src={image}
                      alt={`${project.title} screenshot ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 90vw, 900px"
                      priority={index === 0}
                      className={`${portrait ? "object-contain" : "object-cover"} transition-transform duration-700 ease-out group-hover:scale-[1.03]`}
                    />
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="glass max-h-[90vh] max-w-[90vw] p-2">
                <DialogTitle className="sr-only">
                  {project.title} — screenshot {index + 1}
                </DialogTitle>
                <DialogDescription className="sr-only">Enlarged project screenshot.</DialogDescription>
                <Image
                  src={image}
                  alt={`${project.title} screenshot ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="max-h-[85vh] w-full object-contain"
                />
              </DialogContent>
            </Dialog>
          );
        })}
      </div>

      <div className="mt-12 grid gap-8 lg:grid-cols-[1fr,300px]">
        <div className="space-y-8">
          {project.content && (
            <section className="glass p-6 md:p-8" aria-labelledby="lore-title">
              <p className="hud-label" id="lore-title">
                Quest lore
              </p>
              <div className="prose-forest mt-4">
                {typeof project.content === "string" ? <p>{project.content}</p> : project.content}
              </div>
            </section>
          )}

          {project.features && project.features.length > 0 && (
            <section aria-labelledby="objectives-title">
              <h2 id="objectives-title" className="section-title !text-2xl md:!text-3xl">
                Objectives completed
              </h2>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="glass objective !p-4">
                    <span className="objective-box" aria-hidden="true">
                      <Check className="h-3 w-3" />
                    </span>
                    {f}
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>

        <aside className="space-y-6">
          {project.stack && project.stack.length > 0 && (
            <div className="glass p-5">
              <h2 className="hud-label">Rewards · Tech stack</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((t) => (
                  <li key={t.name} className="chip chip-icon">
                    <span className="chip-glyph" aria-hidden="true">
                      {t.Icon}
                    </span>
                    {t.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {project.pages && project.pages.length > 0 && (
            <div className="glass p-5">
              <h2 className="hud-label">Areas explored</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.pages.map((page) => (
                  <li key={page} className="chip">
                    {page}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <div className="glass p-5">
            <h2 className="hud-label">Party up?</h2>
            <p className="mt-2 text-sm text-muted-foreground">Interested in work like this?</p>
            <Link href="/contact" className="btn btn-primary mt-4 w-full">
              <Flame className="h-4 w-4" aria-hidden="true" /> Light the beacon
            </Link>
          </div>
        </aside>
      </div>

      <nav aria-label="More quests" className="mt-12 grid gap-4 sm:grid-cols-2">
        {prev ? (
          <Link href={`/projects/${prev.slug}`} className="glass quest-nav">
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
            <span>
              <span className="hud-label block">Previous quest</span>
              <span className="mt-1 block font-display text-lg font-semibold">{prev.title}</span>
            </span>
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="glass quest-nav justify-end text-right">
            <span>
              <span className="hud-label block">Next quest</span>
              <span className="mt-1 block font-display text-lg font-semibold">{next.title}</span>
            </span>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        )}
      </nav>
    </main>
  );
}
