"use client";

import React, { useRef } from "react";
import type { Project } from "@/types/project";
import { projects } from "@/data/home/projects";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { SectionHeading } from "../ui/ornaments";
import ParallaxSection from "../ui/parallax-section";

const categoryLabel: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  backend: "Backend",
};

const romanIndex = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

/* Each card is a scroll: wooden rollers at the sides, parchment between.
   The inView reveal unrolls it from the center outward via clip-path. */
const ScrollCard = ({
  project,
  index,
  featured,
  inView,
}: {
  project: Project;
  index: number;
  featured?: boolean;
  inView: boolean;
}) => {
  return (
    <motion.div
      initial={{ clipPath: "inset(0 46% 0 46%)", opacity: 0 }}
      animate={
        inView ? { clipPath: "inset(0 0% 0 0%)", opacity: 1 } : {}
      }
      transition={{
        duration: 0.8,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="relative h-full"
    >
      <span className="scroll-roll left-0 z-10" aria-hidden="true" />
      <span className="scroll-roll right-0 z-10" aria-hidden="true" />

      <div className="mx-5 h-full py-4 [filter:drop-shadow(0_6px_9px_rgba(30,20,5,0.28))]">
      <Link
        href={`/projects/${project.slug}`}
        className="scroll-paper group relative block h-full p-6 transition-[filter] duration-300 md:p-7"
      >
        <div
          className={
            featured
              ? "md:grid md:grid-cols-2 md:items-center md:gap-8"
              : ""
          }
        >
          <div className="relative aspect-video overflow-hidden border border-border/70">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <span
              className="absolute left-2.5 top-2.5 flex h-8 w-8 items-center justify-center border border-gold/50
                bg-background/85 font-heading text-xs font-semibold text-primary backdrop-blur-sm"
              aria-label={`Work ${index + 1}`}
            >
              {romanIndex[index] ?? index + 1}
            </span>
          </div>

          <div className={featured ? "mt-5 md:mt-0" : "mt-5"}>
            <p className="rubric !text-[10px] flex items-center gap-2">
              {project.category && (
                <span>{categoryLabel[project.category] ?? project.category}</span>
              )}
              {project.year && (
                <>
                  <span aria-hidden="true" className="text-gold">
                    ·
                  </span>
                  <span className="text-muted-foreground">{project.year}</span>
                </>
              )}
            </p>

            <div className="mt-2 flex items-start justify-between gap-2">
              <h3 className="font-heading text-lg font-semibold text-foreground transition-colors duration-200 group-hover:text-accent">
                {project.title}
              </h3>
              <ArrowRight className="mt-1.5 h-4 w-4 flex-shrink-0 text-muted-foreground/50 transition-all duration-200 group-hover:translate-x-0.5 group-hover:text-accent" />
            </div>

            {project.context && (
              <p className="mt-0.5 font-body text-xs italic text-secondary">
                {project.context}
              </p>
            )}

            <p className="mt-2 line-clamp-2 font-body text-sm leading-relaxed text-muted-foreground">
              {project.description}
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              {project.stack?.slice(0, featured ? 6 : 4).map((tech) => (
                <span
                  key={tech.name}
                  className="border border-border/70 px-2 py-0.5 font-body text-[11px] text-muted-foreground"
                >
                  {tech.name}
                </span>
              ))}
              {(project.stack?.length ?? 0) > (featured ? 6 : 4) && (
                <span className="border border-border/70 px-2 py-0.5 font-body text-[11px] text-muted-foreground">
                  +{(project.stack?.length ?? 0) - (featured ? 6 : 4)}
                </span>
              )}
              <span className="ml-auto flex items-center gap-1.5 text-muted-foreground/70">
                {project.href && <ExternalLink className="h-3.5 w-3.5" />}
                {project.github && <Github className="h-3.5 w-3.5" />}
              </span>
            </div>
          </div>
        </div>
      </Link>
      </div>
    </motion.div>
  );
};

const ProjectSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const featured = projects.slice(0, 5);

  return (
    <section
      className="mx-auto max-w-5xl px-4 py-20 md:px-8"
      id="quests"
      ref={ref}
    >
      <ParallaxSection speed={150} fade>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <SectionHeading
            rubric="Folio III"
            title="Quests & Works"
            subtitle="Hackathon victories, published research, desktop tools, and production systems — each deed kept on its own scroll."
            className="mb-14"
          />
        </motion.div>
      </ParallaxSection>

      <ParallaxSection speed={45}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {featured.map((project: Project, idx: number) => (
          <div key={project.slug} className={idx === 0 ? "md:col-span-2" : ""}>
            <ParallaxSection
              speed={idx === 0 ? 25 : idx % 2 === 1 ? 40 : -40}
              className="h-full"
            >
              <ScrollCard
                project={project}
                index={idx}
                featured={idx === 0}
                inView={inView}
              />
            </ParallaxSection>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
        className="mt-10 flex justify-center"
      >
        <Link href="/projects">
          <Button
            variant="ghost"
            size="lg"
            className="gap-2 rounded-sm font-heading text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground hover:bg-muted/60 hover:text-accent"
          >
            Browse the complete catalogue
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
      </ParallaxSection>
    </section>
  );
};

export default ProjectSection;
