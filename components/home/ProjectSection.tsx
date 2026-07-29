"use client";

import React, { useRef } from "react";
import type { Project } from "@/types/project";
import { projects } from "@/data/home/projects";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "../ui/button";
import { ArrowRight, ExternalLink, Github } from "lucide-react";
import { SectionHeading, CornerOrnaments } from "../ui/ornaments";
import ParallaxSection from "../ui/parallax-section";

const categoryLabel: Record<string, string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  backend: "Backend",
};

const romanIndex = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];

/* Each work is a catalogue plate: a ruled folio entry on card stock with a
   hairline set just inside the border — the same inked, flat vocabulary the
   armory tablets and the quest stage use. */
const PlateCard = ({
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
  const stackShown = featured ? 6 : 4;
  const stackRest = (project.stack?.length ?? 0) - stackShown;

  return (
    <motion.div
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: "easeOut",
      }}
      className="h-full"
    >
      <Link
        href={`/projects/${project.slug}`}
        className="group relative flex h-full flex-col border border-border bg-card p-5
          transition-colors duration-300 hover:border-gold/60 md:p-6"
      >
        {/* Hairline set inside the border — a double rule, as on the folio */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-[3px] border border-border/45
            transition-colors duration-300 group-hover:border-gold/25"
        />

        {/* Folio rule: numeral, hairline, then the rubricated shelf-mark */}
        <div className="relative flex items-center gap-3">
          <span
            className="font-heading text-xs font-semibold tracking-[0.2em] text-gold"
            aria-label={`Work ${index + 1}`}
          >
            {romanIndex[index] ?? index + 1}
          </span>
          <span aria-hidden="true" className="h-px flex-1 bg-border/70" />
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
        </div>

        <div
          className={
            featured
              ? "relative mt-5 flex-1 md:grid md:grid-cols-[1.1fr,1fr] md:items-start md:gap-7"
              : "relative mt-5 flex flex-1 flex-col"
          }
        >
          {/* shrink-0: paired plates stretch to the tallest in the row, and a
              shrinkable media box would compress unevenly between them */}
          <div className="relative aspect-video shrink-0 overflow-hidden border border-border/70">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              sizes={featured ? "(max-width: 768px) 100vw, 45vw" : "(max-width: 768px) 100vw, 40vw"}
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-t from-card/60 via-transparent to-transparent"
            />
            {featured && <CornerOrnaments className="m-2" />}
          </div>

          <div className={featured ? "mt-5 md:mt-0" : "mt-5 flex flex-1 flex-col"}>
            <div className="flex items-start justify-between gap-2">
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

            <span
              aria-hidden="true"
              className="mt-4 block h-px w-full bg-border/60"
            />

            <div className="mt-3 flex flex-wrap items-center gap-1.5">
              {project.stack?.slice(0, stackShown).map((tech) => (
                <span
                  key={tech.name}
                  className="border border-border/70 px-2 py-0.5 font-body text-[11px] text-muted-foreground"
                >
                  {tech.name}
                </span>
              ))}
              {stackRest > 0 && (
                <span className="border border-border/70 px-2 py-0.5 font-body text-[11px] text-muted-foreground">
                  +{stackRest}
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
            subtitle="Hackathon victories, published research, desktop tools, and production systems — each deed entered on its own plate."
            className="mb-14"
          />
        </motion.div>
      </ParallaxSection>

      <ParallaxSection speed={45}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {featured.map((project: Project, idx: number) => (
          <div key={project.slug} className={idx === 0 ? "md:col-span-2" : ""}>
            <PlateCard
              project={project}
              index={idx}
              featured={idx === 0}
              inView={inView}
            />
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
