"use client";

import React, { useMemo, useState } from "react";
import { projects } from "@/data/home/projects";
import type { Project, ProjectCategory } from "@/types/project";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Globe,
  Smartphone,
  Monitor,
  Server,
} from "lucide-react";

const categories: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Desktop", value: "desktop" },
];

const categoryLabel: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  backend: "Backend",
};

const categoryGlyph: Record<string, React.ReactNode> = {
  web: <Globe className="h-3.5 w-3.5" />,
  mobile: <Smartphone className="h-3.5 w-3.5" />,
  desktop: <Monitor className="h-3.5 w-3.5" />,
  backend: <Server className="h-3.5 w-3.5" />,
};

const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [active, setActive] = useState(0);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  const safeActive = Math.min(active, Math.max(filtered.length - 1, 0));
  const project: Project | undefined = filtered[safeActive];
  const portraitThumbnail =
    project &&
    typeof project.thumbnail !== "string" &&
    project.thumbnail.height > project.thumbnail.width;

  const selectFilter = (value: ProjectCategory | "all") => {
    setFilter(value);
    setActive(0);
  };

  const onIndexKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next = safeActive;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = Math.min(safeActive + 1, filtered.length - 1);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = Math.max(safeActive - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = filtered.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <div className="page-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <p className="section-kicker">The project collection</p>
        <h1 className="page-title">Built with curiosity.</h1>
        <p className="mt-6 max-w-xl leading-7 text-muted-foreground">{projects.length} projects across web, mobile, and desktop. Explore the ideas, the decisions, and the details.</p>

        <div
          className="mt-8 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => selectFilter(cat.value)}
              aria-pressed={filter === cat.value}
              className={`min-h-11 rounded-full border px-5 py-2 text-sm font-medium transition-colors duration-200
                ${
                  filter === cat.value
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-card text-muted-foreground hover:border-gold/60 hover:text-foreground"
                }`}
            >
              {cat.label}
              {cat.value !== "all" && (
                <span className="ml-1.5 opacity-60">
                  {projects.filter((p) => p.category === cat.value).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
        className="mt-10 grid gap-5 lg:grid-cols-[300px,1fr]"
      >
        <div
          role="tablist"
          aria-label="Project index"
          aria-orientation="vertical"
          onKeyDown={onIndexKeyDown}
          className="flex gap-2 overflow-x-auto no-visible-scrollbar
            lg:max-h-[640px] lg:flex-col lg:overflow-y-auto lg:overflow-x-visible lg:pr-1"
        >
          {filtered.map((p, i) => {
            const selected = i === safeActive;
            return (
              <button
                key={p.slug}
                role="tab"
                id={`quest-tab-${p.slug}`}
                aria-selected={selected}
                aria-controls="quest-stage"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(i)}
                className={`group flex min-w-[190px] flex-shrink-0 items-center gap-3 rounded-2xl border p-3 text-left transition-colors duration-200 lg:min-w-0 lg:flex-shrink
                  ${
                    selected
                      ? "border-primary/50 bg-card/90 shadow-sm"
                      : "border-border/60 bg-card/40 hover:border-gold/40 hover:bg-card"
                  }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border font-heading text-xs font-semibold transition-colors duration-200
                    ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/70 bg-background text-primary"
                    }`}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block truncate font-heading text-sm font-semibold tracking-wide ${
                      selected ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 font-body text-xs text-muted-foreground">
                    {p.category && categoryGlyph[p.category]}
                    {p.category && categoryLabel[p.category]}
                    {p.year && <> · {p.year}</>}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div
          tabIndex={0}
          id="quest-stage"
          role="tabpanel"
          aria-labelledby={project ? `quest-tab-${project.slug}` : undefined}
          className="relative"
        >
          <AnimatePresence mode="wait">
            {project && (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="glass-panel overflow-hidden"
              >
                <div className="work-canvas relative m-3 aspect-video overflow-hidden rounded-[20px]">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className={portraitThumbnail ? "object-contain" : "object-cover"}
                    priority
                  />
                </div>

                <div className="relative p-6 md:p-8">
                  <p className="rubric !text-[10px] flex flex-wrap items-center gap-2">
                    {project.category && (
                      <span>{categoryLabel[project.category]}</span>
                    )}
                    {project.year && (
                      <>
                        <span aria-hidden="true" className="text-gold">
                          ·
                        </span>
                        <span className="text-muted-foreground">
                          {project.year}
                        </span>
                      </>
                    )}
                    {project.context && (
                      <>
                        <span aria-hidden="true" className="text-gold">
                          ·
                        </span>
                        <span className="font-body normal-case italic tracking-normal text-secondary">
                          {project.context}
                        </span>
                      </>
                    )}
                  </p>

                  <h2 className="mt-2 font-heading text-2xl font-semibold tracking-wide text-foreground md:text-3xl">
                    {project.title}
                  </h2>

                  <p className="mt-3 max-w-2xl font-body leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  {project.features && project.features.length > 0 && (
                    <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                      {project.features.slice(0, 4).map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2.5 font-body text-sm text-muted-foreground"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-0.5 flex-shrink-0 text-xs text-gold"
                          >
                            ·
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {project.stack?.map((tech) => (
                      <span
                        key={tech.name}
                        className="rounded-md border border-border/70 px-2 py-1 font-body text-[11px] text-muted-foreground"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link href={`/projects/${project.slug}`} className="glass-button glass-button-primary">
                        View project
                        <ArrowRight className="h-4 w-4" />
                    </Link>
                    {project.href && (
                      <Link
                        href={project.href}
                        target="_blank" rel="noopener noreferrer"
                        className="glass-button"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live
                      </Link>
                    )}
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank" rel="noopener noreferrer"
                        className="glass-button"
                      >
                        <Github className="h-4 w-4" />
                        Source
                      </Link>
                    )}
                  </div>
                </div>
              </motion.article>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
