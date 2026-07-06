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
import {
  SectionHeading,
  CornerOrnaments,
  AstrolabeRing,
} from "@/components/ui/ornaments";

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

const romans = [
  "I",
  "II",
  "III",
  "IV",
  "V",
  "VI",
  "VII",
  "VIII",
  "IX",
  "X",
  "XI",
  "XII",
  "XIII",
];

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

  const selectFilter = (value: ProjectCategory | "all") => {
    setFilter(value);
    setActive(0);
  };

  const onIndexKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    }
  };

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-4 pb-32 pt-16 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <SectionHeading
          rubric="The Catalogue"
          title="Quests & Works"
          subtitle={`${projects.length} works across web, mobile, and desktop — choose a quest from the index to read its plate.`}
        />

        <div
          className="mt-8 flex flex-wrap justify-center gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => selectFilter(cat.value)}
              aria-pressed={filter === cat.value}
              className={`border px-4 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.15em] transition-colors duration-200
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
        {/* Index of quests — the scroll spines */}
        <div
          role="tablist"
          aria-label="Quest index"
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
                className={`group flex min-w-[190px] flex-shrink-0 items-center gap-3 border p-3 text-left transition-all duration-200 lg:min-w-0 lg:flex-shrink
                  ${
                    selected
                      ? "border-gold/70 bg-card shadow-sm lg:translate-x-1"
                      : "border-border/60 bg-card/50 hover:border-gold/40 hover:bg-card"
                  }`}
              >
                <span
                  aria-hidden="true"
                  className={`flex h-9 w-9 flex-shrink-0 items-center justify-center border font-heading text-xs font-semibold transition-colors duration-200
                    ${
                      selected
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border/70 bg-background text-primary"
                    }`}
                >
                  {romans[i] ?? i + 1}
                </span>
                <span className="min-w-0">
                  <span
                    className={`block truncate font-heading text-sm font-semibold tracking-wide ${
                      selected ? "text-foreground" : "text-foreground/80"
                    }`}
                  >
                    {p.title}
                  </span>
                  <span className="mt-0.5 flex items-center gap-1.5 font-body text-[11px] italic text-muted-foreground">
                    {p.category && categoryGlyph[p.category]}
                    {p.category && categoryLabel[p.category]}
                    {p.year && <> · {p.year}</>}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* The stage — one quest, writ large */}
        <div
          id="quest-stage"
          role="tabpanel"
          aria-labelledby={project ? `quest-tab-${project.slug}` : undefined}
          className="relative"
        >
          <AstrolabeRing
            className="pointer-events-none absolute -right-8 -top-10 z-10 hidden h-36 w-36
              animate-spin-slow text-gold/30 motion-reduce:animate-none md:block"
          />

          <AnimatePresence mode="wait">
            {project && (
              <motion.article
                key={project.slug}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative overflow-hidden border border-border bg-card"
              >
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
                  <CornerOrnaments className="m-3" />
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
                            ✦
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
                        className="border border-border/70 px-2 py-0.5 font-body text-[11px] text-muted-foreground"
                      >
                        {tech.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <Link href={`/projects/${project.slug}`}>
                      <button className="inline-flex items-center gap-2 border border-primary bg-primary px-5 py-2.5 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground transition-colors duration-200 hover:bg-primary/90">
                        Read the full account
                        <ArrowRight className="h-4 w-4" />
                      </button>
                    </Link>
                    {project.href && (
                      <Link
                        href={project.href}
                        target="_blank"
                        className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-colors duration-200 hover:border-gold/60"
                      >
                        <ExternalLink className="h-4 w-4" />
                        Live
                      </Link>
                    )}
                    {project.github && (
                      <Link
                        href={project.github}
                        target="_blank"
                        className="inline-flex items-center gap-2 border border-border bg-background px-4 py-2.5 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-foreground transition-colors duration-200 hover:border-gold/60"
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
