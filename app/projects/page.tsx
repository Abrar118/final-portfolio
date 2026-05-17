"use client";

import React from "react";
import { projects } from "@/data/home/projects";
import type { Project } from "@/types/project";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, ArrowRight } from "lucide-react";

const Projects = () => {
  return (
    <div className="min-h-screen px-4 md:px-[5%] lg:px-[10%] xl:px-[15%] pb-32 pt-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-12"
      >
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          All Projects
        </h1>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Everything I&apos;ve built — from hackathon wins to personal
          explorations. Click any project to dive deeper.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((project: Project, idx: number) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.4,
              delay: Math.min(idx * 0.05, 0.4),
              ease: "easeOut",
            }}
          >
            <Link
              href={`/projects/${project.slug}`}
              className="group flex flex-col h-full rounded-xl overflow-hidden
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
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 via-transparent to-transparent" />

                <div className="absolute bottom-3 left-3 flex gap-1.5">
                  {project.href && (
                    <span className="p-1.5 rounded-md bg-background/80 backdrop-blur-sm text-muted-foreground">
                      <ExternalLink className="h-3 w-3" />
                    </span>
                  )}
                  {project.github && (
                    <span className="p-1.5 rounded-md bg-background/80 backdrop-blur-sm text-muted-foreground">
                      <Github className="h-3 w-3" />
                    </span>
                  )}
                </div>
              </div>

              <div className="flex flex-col flex-1 p-4">
                <h3 className="font-heading font-semibold text-foreground group-hover:text-accent transition-colors duration-200">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1.5 line-clamp-2 flex-1">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1.5 mt-3">
                  {project.stack?.slice(0, 3).map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="text-xs bg-muted/60 border-none font-normal"
                    >
                      {tech.name}
                    </Badge>
                  ))}
                  {(project.stack?.length ?? 0) > 3 && (
                    <Badge
                      variant="secondary"
                      className="text-xs bg-muted/60 border-none font-normal"
                    >
                      +{(project.stack?.length ?? 0) - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground group-hover:text-accent transition-colors duration-200">
                  View details
                  <ArrowRight className="h-3 w-3" />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
