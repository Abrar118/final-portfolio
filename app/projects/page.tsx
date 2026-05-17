"use client";

import React, { useState } from "react";
import { projects } from "@/data/home/projects";
import type { Project, ProjectCategory } from "@/types/project";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const categories: { label: string; value: ProjectCategory | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Web", value: "web" },
  { label: "Mobile", value: "mobile" },
  { label: "Desktop", value: "desktop" },
];

const Projects = () => {
  const [filter, setFilter] = useState<ProjectCategory | "all">("all");

  const filtered =
    filter === "all"
      ? projects
      : projects.filter((p) => p.category === filter);

  return (
    <div className="min-h-screen px-4 md:px-[5%] lg:px-[10%] xl:px-[15%] pb-32 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-10"
      >
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          All Projects
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          {projects.length} projects across web, mobile, and desktop — from
          hackathon builds to production systems.
        </p>

        <div className="flex gap-2 mt-6">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setFilter(cat.value)}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                ${
                  filter === cat.value
                    ? "bg-accent text-accent-foreground"
                    : "bg-muted/40 text-muted-foreground hover:text-foreground border border-border/20"
                }`}
            >
              {cat.label}
              {cat.value !== "all" && (
                <span className="ml-1.5 text-xs opacity-60">
                  {projects.filter((p) => p.category === cat.value).length}
                </span>
              )}
            </button>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div
          key={filter}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((project: Project, idx: number) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.3,
                delay: Math.min(idx * 0.04, 0.3),
                ease: "easeOut",
              }}
            >
              <Link
                href={`/projects/${project.slug}`}
                className="group flex flex-col h-full rounded-2xl overflow-hidden
                  bg-card border border-border/40
                  hover:border-accent/50 transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-video">
                  <Image
                    src={project.thumbnail}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    {project.category && (
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-accent/90 text-accent-foreground backdrop-blur-sm">
                        {project.category}
                      </span>
                    )}
                    {project.year && (
                      <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-background/60 text-foreground/80 backdrop-blur-sm">
                        {project.year}
                      </span>
                    )}
                  </div>

                  <div className="absolute bottom-3 left-3 flex gap-1.5">
                    {project.href && (
                      <span className="p-1.5 rounded-lg bg-background/70 backdrop-blur-sm text-foreground/70">
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    )}
                    {project.github && (
                      <span className="p-1.5 rounded-lg bg-background/70 backdrop-blur-sm text-foreground/70">
                        <Github className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col flex-1 p-4">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="font-heading font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                      {project.title}
                    </h3>
                    <ArrowRight className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-1" />
                  </div>

                  {project.context && (
                    <p className="text-[11px] text-accent/80 font-medium mt-0.5">
                      {project.context}
                    </p>
                  )}

                  <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {project.stack?.slice(0, 3).map((tech) => (
                      <Badge
                        key={tech.name}
                        variant="secondary"
                        className="text-[11px] bg-muted/40 border border-border/20 font-normal px-2 py-0.5"
                      >
                        {tech.name}
                      </Badge>
                    ))}
                    {(project.stack?.length ?? 0) > 3 && (
                      <Badge
                        variant="secondary"
                        className="text-[11px] bg-muted/40 border border-border/20 font-normal px-2 py-0.5"
                      >
                        +{(project.stack?.length ?? 0) - 3}
                      </Badge>
                    )}
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default Projects;
