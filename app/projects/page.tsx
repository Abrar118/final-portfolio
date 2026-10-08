"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check, ExternalLink, Github, ScrollText } from "lucide-react";
import { projects } from "@/data/home/projects";
import type { Project, ProjectCategory } from "@/types/project";
import { categoryLabel, toRoman } from "@/lib/quests";
import { useWorld } from "@/lib/world";

const filters: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Desktop", value: "desktop" },
];

/* The quest log: chapters down the side, the selected quest on the stage.
   Selecting a quest lights its crystal in the Crystal Hollow behind. */
export default function QuestLog() {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");
  const [active, setActive] = useState(0);
  const setFocusSlug = useWorld((s) => s.setFocusSlug);

  const list = useMemo(
    () => (filter === "all" ? projects : projects.filter((p) => p.category === filter)),
    [filter],
  );
  const index = Math.min(active, Math.max(list.length - 1, 0));
  const quest: Project | undefined = list[index];

  useEffect(() => {
    setFocusSlug(quest?.slug ?? null);
  }, [quest, setFocusSlug]);
  useEffect(() => () => setFocusSlug(null), [setFocusSlug]);

  const onListKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = Math.min(index + 1, list.length - 1);
    else if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = Math.max(index - 1, 0);
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = list.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <main className="page-wrap page-top">
      <header className="section-head">
        <div>
          <p className="chapter-chip">
            <span className="chapter-dot" aria-hidden="true" />
            Chapter III · The Crystal Hollow
          </p>
          <h1 className="page-title mt-5">Quest Log</h1>
          <p className="mt-4 max-w-xl text-muted-foreground">
            Every quest I&apos;ve taken on — shipped products, hackathon builds
            and tools. Pick one to light its crystal.
          </p>
        </div>
        <div className="seg seg-lg" role="group" aria-label="Filter quests by type">
          {filters.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => {
                setFilter(f.value);
                setActive(0);
              }}
            >
              {f.label}
              <span className="opacity-60">
                {f.value === "all" ? projects.length : projects.filter((p) => p.category === f.value).length}
              </span>
            </button>
          ))}
        </div>
      </header>

      <div className="questlog">
        <div
          role="tablist"
          aria-label="Quests"
          aria-orientation="vertical"
          onKeyDown={onListKey}
          className="glass quest-list no-visible-scrollbar"
        >
          {list.map((p, i) => (
            <button
              key={p.slug}
              role="tab"
              id={`quest-tab-${p.slug}`}
              aria-selected={i === index}
              aria-controls="quest-stage"
              tabIndex={i === index ? 0 : -1}
              onClick={() => setActive(i)}
              className="quest-row"
            >
              <span className="quest-num" aria-hidden="true">
                {toRoman(projects.indexOf(p) + 1)}
              </span>
              <span className="min-w-0">
                <span className="quest-row-title">{p.title}</span>
                <span className="quest-row-meta">
                  {p.category ? categoryLabel[p.category] : "Quest"}
                  {p.year && ` · ${p.year}`}
                </span>
              </span>
              <Check className="quest-done" aria-label="Completed" />
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {quest && (
            <motion.article
              key={quest.slug}
              id="quest-stage"
              role="tabpanel"
              tabIndex={0}
              aria-labelledby={`quest-tab-${quest.slug}`}
              className="glass quest-stage"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
            >
              <div className="quest-art">
                <Image
                  src={quest.thumbnail}
                  alt={`${quest.title} preview`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 640px"
                  className={
                    typeof quest.thumbnail !== "string" && quest.thumbnail.height > quest.thumbnail.width
                      ? "object-contain"
                      : "object-cover object-top"
                  }
                  priority
                />
              </div>

              <div className="p-6 md:p-8">
                <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                  <span className="quest-tag">
                    {quest.category ? categoryLabel[quest.category] : "Quest"} quest
                  </span>
                  {quest.year && <span className="text-muted-foreground">{quest.year}</span>}
                  {quest.context && <span className="text-secondary">{quest.context}</span>}
                </p>
                <h2 className="mt-3 font-display text-3xl font-semibold tracking-wide md:text-4xl">
                  {quest.title}
                </h2>
                <p className="mt-3 leading-relaxed text-muted-foreground">{quest.description}</p>

                {quest.features && quest.features.length > 0 && (
                  <div className="mt-6">
                    <p className="hud-label">Objectives</p>
                    <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                      {quest.features.slice(0, 6).map((f) => (
                        <li key={f} className="objective">
                          <span className="objective-box" aria-hidden="true">
                            <Check className="h-3 w-3" />
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {quest.stack && quest.stack.length > 0 && (
                  <div className="mt-6">
                    <p className="hud-label">Rewards</p>
                    <ul className="mt-3 flex flex-wrap gap-1.5">
                      {quest.stack.map((t) => (
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

                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={`/projects/${quest.slug}`} className="btn btn-primary">
                    <ScrollText className="h-4 w-4" aria-hidden="true" /> Full quest
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                  {quest.href && (
                    <a href={quest.href} target="_blank" rel="noopener noreferrer" className="btn">
                      <ExternalLink className="h-4 w-4" aria-hidden="true" /> Live
                    </a>
                  )}
                  {quest.github && (
                    <a href={quest.github} target="_blank" rel="noopener noreferrer" className="btn">
                      <Github className="h-4 w-4" aria-hidden="true" /> Source
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
