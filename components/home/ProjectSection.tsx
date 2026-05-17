"use client";

import React, { useRef } from "react";
import type { Project } from "@/types/project";
import { projects } from "@/data/home/projects";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight, ExternalLink, Github } from "lucide-react";

const categoryLabel: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  backend: "Backend",
};

const ProjectCard = ({
  project,
  index,
  featured,
}: {
  project: Project;
  index: number;
  featured?: boolean;
}) => {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`group relative block rounded-2xl overflow-hidden
        bg-card border border-border/40
        hover:border-accent/50 transition-all duration-300
        ${featured ? "md:col-span-2 md:grid md:grid-cols-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden ${featured ? "aspect-[16/10] md:aspect-auto md:h-full" : "aspect-video"}`}
      >
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent opacity-70 group-hover:opacity-90 transition-opacity duration-300" />

        <div className="absolute top-3 left-3 flex items-center gap-2">
          {project.category && (
            <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider bg-accent/90 text-accent-foreground backdrop-blur-sm">
              {categoryLabel[project.category] ?? project.category}
            </span>
          )}
          {project.year && (
            <span className="px-2 py-1 rounded-full text-[10px] font-medium bg-background/60 text-foreground/80 backdrop-blur-sm">
              {project.year}
            </span>
          )}
        </div>

        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2">
            {project.href && (
              <span className="p-1.5 rounded-lg bg-background/70 backdrop-blur-sm text-foreground/70 group-hover:text-accent transition-colors">
                <ExternalLink className="h-3.5 w-3.5" />
              </span>
            )}
            {project.github && (
              <span className="p-1.5 rounded-lg bg-background/70 backdrop-blur-sm text-foreground/70 group-hover:text-accent transition-colors">
                <Github className="h-3.5 w-3.5" />
              </span>
            )}
          </div>
        </div>
      </div>

      <div className={`p-5 ${featured ? "flex flex-col justify-center" : ""}`}>
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-accent transition-colors duration-200">
            {project.title}
          </h3>
          <ArrowRight className="h-4 w-4 text-muted-foreground/50 group-hover:text-accent group-hover:translate-x-0.5 transition-all duration-200 flex-shrink-0 mt-1" />
        </div>

        {project.context && (
          <p className="text-xs text-accent/80 font-medium mt-1">
            {project.context}
          </p>
        )}

        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.stack?.slice(0, featured ? 6 : 4).map((tech) => (
            <Badge
              key={tech.name}
              variant="secondary"
              className="text-[11px] bg-muted/40 border border-border/20 font-normal px-2 py-0.5"
            >
              {tech.name}
            </Badge>
          ))}
          {(project.stack?.length ?? 0) > (featured ? 6 : 4) && (
            <Badge
              variant="secondary"
              className="text-[11px] bg-muted/40 border border-border/20 font-normal px-2 py-0.5"
            >
              +{(project.stack?.length ?? 0) - (featured ? 6 : 4)}
            </Badge>
          )}
        </div>
      </div>
    </Link>
  );
};

const ProjectSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const featured = projects.slice(0, 5);

  return (
    <section
      className="mx-4 md:mx-[5%] lg:mx-[10%] xl:mx-[15%] py-20"
      id="projects"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-12"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Featured Projects
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Hackathon wins, published research, desktop tools, and production
          web apps — here&apos;s what I&apos;ve been building.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {featured.map((project: Project, idx: number) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: idx * 0.08,
              ease: "easeOut",
            }}
            className={idx === 0 ? "md:col-span-2" : ""}
          >
            <ProjectCard
              project={project}
              index={idx}
              featured={idx === 0}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        className="flex justify-center mt-10"
      >
        <Link href="/projects">
          <Button
            variant="ghost"
            size="lg"
            className="rounded-full gap-2 text-muted-foreground hover:text-accent"
          >
            View all {projects.length} projects
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default ProjectSection;
