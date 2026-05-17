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

const ProjectSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const featured = projects.slice(0, 4);

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
          A selection of things I&apos;ve built. Each project pushed me to learn
          something new.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featured.map((project: Project, idx: number) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: idx * 0.1,
              ease: "easeOut",
            }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group block rounded-xl overflow-hidden
                bg-card/60 border border-border/30
                hover:border-accent/30 hover:bg-card/80
                transition-all duration-200"
            >
              <div className="relative overflow-hidden aspect-video">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300
                    group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/20 to-transparent
                  opacity-60 group-hover:opacity-80 transition-opacity duration-200"
                />

                <div className="absolute bottom-3 left-3 right-3 flex items-center gap-2">
                  {project.href && (
                    <span className="p-1.5 rounded-md bg-background/80 backdrop-blur-sm text-muted-foreground">
                      <ExternalLink className="h-3.5 w-3.5" />
                    </span>
                  )}
                  {project.github && (
                    <span className="p-1.5 rounded-md bg-background/80 backdrop-blur-sm text-muted-foreground">
                      <Github className="h-3.5 w-3.5" />
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5">
                <h3 className="font-heading font-semibold text-lg text-foreground group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.stack?.slice(0, 4).map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="text-xs bg-muted/60 border-none font-normal"
                    >
                      {tech.name}
                    </Badge>
                  ))}
                  {(project.stack?.length ?? 0) > 4 && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-muted/60 border-none font-normal"
                    >
                      +{(project.stack?.length ?? 0) - 4}
                    </Badge>
                  )}
                </div>
              </div>
            </Link>
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
            View all projects
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default ProjectSection;
