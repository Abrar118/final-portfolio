"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ExternalLink, Github, ArrowLeft } from "lucide-react";
import type { Project } from "@/types/project";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { motion } from "framer-motion";

export default function ProjectDetailsContainer({
  project,
}: {
  project: Project;
}) {
  return (
    <div className="min-h-screen bg-background text-foreground pb-32">
      <nav className="border-b border-border/30 px-4 md:px-[5%] lg:px-[10%] xl:px-[15%] py-4">
        <div className="flex items-center gap-2 text-sm">
          <Link
            href="/projects"
            className="text-muted-foreground hover:text-accent transition-colors duration-200 flex items-center gap-1"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Projects
          </Link>
          <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
          <span className="text-foreground font-medium">{project.title}</span>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-10"
        >
          <h1 className="font-heading text-3xl md:text-5xl font-bold">
            {project.title}
          </h1>
          <p className="text-lg text-muted-foreground mt-3 max-w-2xl">
            {project.description}
          </p>

          <div className="flex gap-3 mt-6">
            {project.href && (
              <Link href={project.href} target="_blank">
                <Button
                  variant="default"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full gap-2 font-medium"
                >
                  <ExternalLink className="h-4 w-4" />
                  Live Preview
                </Button>
              </Link>
            )}
            {project.github && (
              <Link href={project.github} target="_blank">
                <Button
                  variant="outline"
                  className="rounded-full gap-2 border-border/50"
                >
                  <Github className="h-4 w-4" />
                  Source Code
                </Button>
              </Link>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="grid gap-3 grid-cols-1 md:grid-cols-2 mb-12"
        >
          {project.images.map((image, index) => (
            <Dialog key={index}>
              <DialogTrigger asChild>
                <div
                  className={`relative overflow-hidden rounded-xl cursor-pointer group
                    ${index === 0 ? "md:col-span-2 aspect-video" : "aspect-video"}`}
                >
                  <Image
                    src={typeof image === "string" ? image : image.src}
                    alt={`${project.title} screenshot ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-colors duration-200" />
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

        <div className="grid gap-10 md:grid-cols-[1fr,280px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="space-y-8"
          >
            {project.content && (
              <div>
                <h2 className="font-heading text-xl font-semibold mb-3">
                  About
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
                <h2 className="font-heading text-xl font-semibold mb-3">
                  Key Features
                </h2>
                <ul className="space-y-2">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-start gap-3 text-muted-foreground"
                    >
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
            className="space-y-8"
          >
            {project.stack && project.stack.length > 0 && (
              <div>
                <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Tech Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <Badge
                      key={tech.name}
                      variant="secondary"
                      className="bg-muted/60 border border-border/30 font-normal gap-1.5 py-1.5 px-3"
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
                <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                  Pages
                </h3>
                <div className="flex flex-wrap gap-1.5">
                  {project.pages.map((page) => (
                    <Badge
                      key={page}
                      variant="outline"
                      className="border-border/30 text-muted-foreground font-normal text-xs"
                    >
                      {page}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                Contact
              </h3>
              <p className="text-sm text-muted-foreground">
                Interested in this project? Reach out at{" "}
                <Link
                  href="/contact"
                  className="text-accent hover:underline"
                >
                  abrarme118@gmail.com
                </Link>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
