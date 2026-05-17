"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github, CheckCircle2 } from "lucide-react";
import type { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

const categoryLabel: Record<string, string> = {
  web: "Web App",
  mobile: "Mobile App",
  desktop: "Desktop App",
  backend: "Backend Service",
};

export default function ProjectDetailsContainer({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      <div className="relative">
        <div className="absolute inset-0 h-[400px] overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover blur-2xl opacity-20 scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
        </div>

        <nav className="relative z-10 px-4 md:px-[5%] lg:px-[10%] xl:px-[15%] py-6">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-accent transition-colors duration-200"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to projects
          </Link>
        </nav>

        <div className="relative z-10 mx-auto max-w-5xl px-4 pt-4 pb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            <div className="flex flex-wrap items-center gap-2 mb-4">
              {project.category && (
                <span className="px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-accent/15 text-accent border border-accent/20">
                  {categoryLabel[project.category] ?? project.category}
                </span>
              )}
              {project.year && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-muted/40 text-muted-foreground">
                  {project.year}
                </span>
              )}
              {project.context && (
                <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent/10 text-accent/90">
                  {project.context}
                </span>
              )}
            </div>

            <h1 className="font-heading text-3xl md:text-5xl font-bold">
              {project.title}
            </h1>
            <p className="text-lg text-muted-foreground mt-3 max-w-2xl leading-relaxed">
              {project.description}
            </p>

            <div className="flex gap-3 mt-6">
              {project.href && (
                <Link href={project.href} target="_blank">
                  <Button className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full gap-2 font-medium glow-purple-sm hover:glow-purple transition-shadow duration-300">
                    <ExternalLink className="h-4 w-4" />
                    Live Preview
                  </Button>
                </Link>
              )}
              {project.github && (
                <Link href={project.github} target="_blank">
                  <Button
                    variant="outline"
                    className="rounded-full gap-2 border-border/40"
                  >
                    <Github className="h-4 w-4" />
                    Source Code
                  </Button>
                </Link>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="grid gap-3 grid-cols-1 md:grid-cols-2 mb-14"
        >
          {project.images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div
                  className={`relative overflow-hidden rounded-xl cursor-pointer group border border-border/20
                    ${index === 0 ? "md:col-span-2 aspect-video" : "aspect-video"}`}
                >
                  <Image
                    src={typeof image === "string" ? image : image.src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-accent/5 transition-colors duration-300" />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] max-h-[90vh] p-2 bg-card border-border/30">
                <Image
                  src={typeof image === "string" ? image : image.src}
                  alt={`${project.title} screenshot ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="rounded-lg w-full h-auto max-h-[85vh] object-contain"
                />
              </DialogContent>
            </Dialog>
          ))}
        </motion.div>

        <div className="grid gap-12 md:grid-cols-[1fr,260px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
            className="space-y-10"
          >
            {project.content && (
              <div>
                <h2 className="font-heading text-xl font-semibold mb-4">
                  About this project
                </h2>
                <div className="text-muted-foreground leading-relaxed">
                  {typeof project.content === "string" ? (
                    <p>{project.content}</p>
                  ) : (
                    project.content
                  )}
                </div>
              </div>
            )}

            {project.features && project.features.length > 0 && (
              <div>
                <h2 className="font-heading text-xl font-semibold mb-4">
                  Key Features
                </h2>
                <div className="grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-start gap-3 p-3 rounded-xl bg-card border border-border/15"
                    >
                      <CheckCircle2 className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                      <span className="text-sm text-muted-foreground leading-snug">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
            className="space-y-8"
          >
            {project.stack && project.stack.length > 0 && (
              <div>
                <h3 className="font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="bg-card/60 border border-border/20 font-normal gap-1.5 py-1.5 px-3"
                    >
                      <span className="flex-shrink-0">{tech.Icon}</span>
                      {tech.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {project.pages && project.pages.length > 0 && (
              <div>
                <h3 className="font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Pages
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.pages.map((page) => (
                    <Badge
                      key={page}
                      variant="outline"
                      className="border-border/20 text-muted-foreground font-normal text-xs"
                    >
                      {page}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-heading text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Get in touch
              </h3>
              <p className="text-sm text-muted-foreground">
                Interested in this project?{" "}
                <Link
                  href="/contact"
                  className="text-accent hover:underline"
                >
                  Send me a message
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
