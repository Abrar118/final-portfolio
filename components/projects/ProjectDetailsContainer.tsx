"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";
import { FiligreeDivider } from "@/components/ui/ornaments";

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
    <div className="min-h-screen bg-background pb-32 text-foreground">
      <nav className="mx-auto max-w-5xl px-4 py-6 md:px-8">
        <Link
          href="/projects"
          className="inline-flex items-center gap-1.5 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-muted-foreground transition-colors duration-200 hover:text-accent"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Return to the catalogue
        </Link>
      </nav>

      <div className="mx-auto max-w-5xl px-4 pb-12 pt-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <p className="rubric flex flex-wrap items-center justify-center gap-2">
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
            {project.context && (
              <>
                <span aria-hidden="true" className="text-gold">
                  ·
                </span>
                <span className="text-secondary normal-case tracking-normal font-body italic">
                  {project.context}
                </span>
              </>
            )}
          </p>

          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-wide md:text-5xl">
            {project.title}
          </h1>

          <FiligreeDivider className="mx-auto mt-6 h-3.5 w-52 text-gold" />

          <p className="mx-auto mt-5 max-w-2xl font-body text-lg leading-relaxed text-muted-foreground">
            {project.description}
          </p>

          <div className="mt-7 flex justify-center gap-3">
            {project.href && (
              <Link href={project.href} target="_blank">
                <Button className="gap-2 rounded-sm bg-primary font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground hover:bg-primary/90">
                  <ExternalLink className="h-4 w-4" />
                  Live Preview
                </Button>
              </Link>
            )}
            {project.github && (
              <Link href={project.github} target="_blank">
                <Button
                  variant="outline"
                  className="gap-2 rounded-sm border-border font-heading text-xs font-semibold uppercase tracking-[0.15em] hover:border-gold/60 hover:bg-muted/40"
                >
                  <Github className="h-4 w-4" />
                  Source Code
                </Button>
              </Link>
            )}
          </div>
        </motion.div>
      </div>

      <div className="mx-auto max-w-5xl px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="mb-14 grid grid-cols-1 gap-4 md:grid-cols-2"
        >
          {project.images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <button
                  aria-label={`Enlarge ${project.title} plate ${index + 1}`}
                  className={`group relative cursor-pointer overflow-hidden border border-border bg-card p-2 transition-colors duration-300 hover:border-gold/60
                    ${index === 0 ? "aspect-video md:col-span-2" : "aspect-video"}`}
                >
                  <span className="relative block h-full w-full overflow-hidden">
                    <Image
                      src={typeof image === "string" ? image : image.src}
                      alt={`${project.title} screenshot ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="max-h-[90vh] max-w-[90vw] border-border bg-card p-2">
                <Image
                  src={typeof image === "string" ? image : image.src}
                  alt={`${project.title} screenshot ${index + 1}`}
                  width={1920}
                  height={1080}
                  className="max-h-[85vh] w-full object-contain"
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
                <h2 className="font-heading text-xl font-semibold tracking-wide">
                  The Account
                </h2>
                <div className="mt-4 border-l-2 border-gold/40 pl-5 font-body leading-relaxed text-muted-foreground">
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
                <h2 className="font-heading text-xl font-semibold tracking-wide">
                  Notable Features
                </h2>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 border border-border/70 bg-card p-3"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex-shrink-0 font-heading text-sm leading-none text-gold"
                      >
                        ✦
                      </span>
                      <span className="font-body text-sm leading-snug text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
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
                <h3 className="rubric !text-[10px] mb-3">Instruments</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech.name}
                      className="inline-flex items-center gap-1.5 border border-border/70 bg-card px-3 py-1.5 font-body text-xs text-foreground/85"
                    >
                      <span className="flex-shrink-0">{tech.Icon}</span>
                      {tech.name}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {project.pages && project.pages.length > 0 && (
              <div>
                <h3 className="rubric !text-[10px] mb-3">Pages</h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.pages.map((page) => (
                    <span
                      key={page}
                      className="border border-border/60 px-2 py-0.5 font-body text-xs text-muted-foreground"
                    >
                      {page}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="rubric !text-[10px] mb-3">Send Word</h3>
              <p className="font-body text-sm text-muted-foreground">
                Interested in this work?{" "}
                <Link
                  href="/contact"
                  className="text-accent underline-offset-4 hover:underline"
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
