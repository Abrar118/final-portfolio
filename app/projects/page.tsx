"use client";

import React, { useEffect, useMemo, useState } from "react";
import { projects } from "@/data/home/projects";
import type { Project, ProjectCategory } from "@/types/project";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { accentFor } from "@/lib/projectAccents";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Globe,
  Smartphone,
  Monitor,
  Server,
  ChevronLeft,
  ChevronRight,
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

const pad = (n: number) => String(n).padStart(2, "0");

const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [active, setActive] = useState(0);
  // While a page is being turned: which project we're heading to, and which way.
  const [turning, setTurning] = useState<{
    target: number;
    dir: 1 | -1;
  } | null>(null);
  // The single-sheet flip only works in the side-by-side (lg+) layout.
  const [isWide, setIsWide] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsWide(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const filtered = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter],
  );

  const safeActive = Math.min(active, Math.max(filtered.length - 1, 0));
  const project: Project | undefined = filtered[safeActive];

  const selectFilter = (value: ProjectCategory | "all") => {
    setTurning(null);
    setFilter(value);
    setActive(0);
  };

  const startTurn = (target: number, dir: 1 | -1) => {
    if (target === safeActive || turning) return;
    // Small screens stack the pages, so skip the sheet and swap directly.
    if (!isWide) {
      setActive(target);
      return;
    }
    setTurning({ target, dir });
  };

  const turnPage = (dir: 1 | -1) => {
    if (filtered.length < 2) return;
    startTurn((safeActive + dir + filtered.length) % filtered.length, dir);
  };

  const selectProject = (i: number) => {
    startTurn(i, i > safeActive ? 1 : -1);
  };

  const onIndexKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next = safeActive;
    if (e.key === "ArrowDown" || e.key === "ArrowRight")
      next = Math.min(safeActive + 1, filtered.length - 1);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft")
      next = Math.max(safeActive - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = filtered.length - 1;
    else return;
    e.preventDefault();
    startTurn(next, next > safeActive ? 1 : -1);
    e.currentTarget
      .querySelectorAll<HTMLButtonElement>('[role="tab"]')
      [next]?.focus();
  };

  /* The two page bodies are shared between the resting spread and the flipping
     sheet, so a face mid-flip looks exactly like the page it replaces. */
  const platePage = (p: Project, index: number, interactive: boolean) => (
    <div className="book-page book-page-left flex h-full flex-col p-6 md:p-8">
      <div className="flex items-baseline justify-between gap-4">
        <p className="rubric !text-[10px] accent-text">
          Plate Nº {pad(index + 1)}
        </p>
        {p.category && (
          <p className="rubric !text-[10px] flex items-center gap-1.5 !text-muted-foreground">
            {categoryGlyph[p.category]}
            {categoryLabel[p.category]}
          </p>
        )}
      </div>

      <div className="book-plate mt-6">
        <div className="work-canvas relative aspect-[4/3] overflow-hidden rounded-lg">
          <Image
            src={p.thumbnail}
            alt={p.title}
            fill
            sizes="(max-width: 1024px) 100vw, 45vw"
            className={
              typeof p.thumbnail !== "string" &&
              p.thumbnail.height > p.thumbnail.width
                ? "object-contain"
                : "object-cover"
            }
            priority
          />
        </div>
      </div>

      <p className="mt-4 font-body text-xs italic leading-relaxed text-muted-foreground">
        Fig. {pad(index + 1)} — {p.title}
        {p.year ? `, ${p.year}` : ""}
      </p>

      <div className="book-folio mt-auto pt-8">
        {interactive ? (
          <button
            type="button"
            className="folio-turn"
            onClick={() => turnPage(-1)}
            disabled={filtered.length < 2}
            aria-label="Previous project"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
        ) : (
          <span className="folio-turn" aria-hidden="true">
            <ChevronLeft className="h-4 w-4" />
          </span>
        )}
        <span className="accent-text">{pad(index + 1)}</span>
      </div>
    </div>
  );

  const writeupPage = (p: Project, index: number, interactive: boolean) => {
    const linkTabIndex = interactive ? undefined : -1;
    return (
      <div className="book-page book-page-right flex h-full flex-col p-6 md:p-8 lg:pl-12">
        <p className="rubric !text-[10px] flex flex-wrap items-center gap-2">
          {p.category && (
            <span className="accent-text">{categoryLabel[p.category]}</span>
          )}
          {p.year && (
            <>
              <span aria-hidden="true" className="text-gold">
                ·
              </span>
              <span className="text-muted-foreground">{p.year}</span>
            </>
          )}
          {p.context && (
            <>
              <span aria-hidden="true" className="text-gold">
                ·
              </span>
              <span className="font-body normal-case italic tracking-normal text-secondary">
                {p.context}
              </span>
            </>
          )}
        </p>

        <h2 className="mt-2 font-heading text-2xl font-semibold tracking-wide text-foreground md:text-3xl">
          {p.title}
        </h2>

        <p className="mt-3 max-w-2xl font-body leading-relaxed text-muted-foreground">
          {p.description}
        </p>

        {p.features && p.features.length > 0 && (
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {p.features.slice(0, 4).map((feature) => (
              <li
                key={feature}
                className="flex items-start gap-2.5 font-body text-sm text-muted-foreground"
              >
                <span
                  aria-hidden="true"
                  className="accent-text mt-0.5 flex-shrink-0 text-xs"
                >
                  ·
                </span>
                {feature}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex flex-wrap gap-1.5">
          {p.stack?.map((tech) => (
            <span
              key={tech.name}
              className="rounded-md border border-border/70 px-2 py-1 font-body text-[11px] text-muted-foreground"
            >
              {tech.name}
            </span>
          ))}
        </div>

        <div className="mt-7 flex flex-wrap items-center gap-3">
          <Link
            href={`/projects/${p.slug}`}
            tabIndex={linkTabIndex}
            className="glass-button glass-button-primary"
          >
            View project
            <ArrowRight className="h-4 w-4" />
          </Link>
          {p.href && (
            <Link
              href={p.href}
              tabIndex={linkTabIndex}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button"
            >
              <ExternalLink className="h-4 w-4" />
              Live
            </Link>
          )}
          {p.github && (
            <Link
              href={p.github}
              tabIndex={linkTabIndex}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-button"
            >
              <Github className="h-4 w-4" />
              Source
            </Link>
          )}
        </div>

        <div className="book-folio mt-auto justify-end pt-8">
          <span>
            <span className="accent-text">{pad(index + 1)}</span>
            {" / "}
            {pad(filtered.length)}
          </span>
          {interactive ? (
            <button
              type="button"
              className="folio-turn"
              onClick={() => turnPage(1)}
              disabled={filtered.length < 2}
              aria-label="Next project"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          ) : (
            <span className="folio-turn" aria-hidden="true">
              <ChevronRight className="h-4 w-4" />
            </span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="page-shell">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div
          className="flex flex-wrap gap-2"
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
        className="mt-12"
      >
        <p className="rubric !text-[10px] !text-muted-foreground">Contents</p>
        <div
          role="tablist"
          aria-label="Project index"
          aria-orientation="horizontal"
          onKeyDown={onIndexKeyDown}
          className="mt-3 flex gap-2 overflow-x-auto no-visible-scrollbar pb-1"
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
                onClick={() => selectProject(i)}
                style={
                  { "--card-accent": accentFor(p.slug) } as React.CSSProperties
                }
                className={`quest-tab group flex min-w-[200px] flex-shrink-0 items-center gap-3 rounded-2xl border p-3 text-left transition-colors duration-200
                  ${
                    selected
                      ? "bg-card/90 shadow-sm"
                      : "border-border/60 bg-card/40 hover:bg-card"
                  }`}
              >
                <span
                  aria-hidden="true"
                  className="tab-chip flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl border border-border/70 bg-background font-heading text-xs font-semibold transition-colors duration-200"
                >
                  {pad(i + 1)}
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

        <div className="book-stage mt-6">
          {/* The resting spread. It keeps showing the old project while the
              sheet above it is mid-flip, and swaps only once the page lands. */}
          {project && (
            <motion.article
              key={project.slug}
              initial={{ opacity: isWide ? 1 : 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="book-spread"
              style={
                {
                  "--card-accent": accentFor(project.slug),
                } as React.CSSProperties
              }
              id="quest-stage"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`quest-tab-${project.slug}`}
            >
              {platePage(project, safeActive, true)}
              {writeupPage(project, safeActive, true)}
            </motion.article>
          )}

          {/* The turning sheet: front face is the page being lifted, back face
              is the page it reveals once it lands on the far side. */}
          {turning && project && filtered[turning.target] && (
            <motion.div
              className={`book-leaf ${turning.dir === 1 ? "book-leaf-next" : "book-leaf-prev"}`}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: turning.dir === 1 ? -180 : 180 }}
              transition={{ duration: 0.7, ease: [0.45, 0.05, 0.35, 1] }}
              onAnimationComplete={() => {
                setActive(turning.target);
                setTurning(null);
              }}
              aria-hidden="true"
            >
              <div className="leaf-face leaf-front">
                {turning.dir === 1
                  ? writeupPage(project, safeActive, false)
                  : platePage(project, safeActive, false)}
              </div>
              <div className="leaf-face leaf-back">
                {turning.dir === 1
                  ? platePage(filtered[turning.target], turning.target, false)
                  : writeupPage(
                      filtered[turning.target],
                      turning.target,
                      false,
                    )}
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Projects;
