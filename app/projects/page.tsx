"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/home/projects";
import type { Project } from "@/types/project";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import ProjectCard from "@/components/projects/ProjectCard";


const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  return (
    <div
      ref={ref}
      className="mx-4 mb-40 md:mx-[1%] lg:mx-[5%] xl:mx-[20%] pb-10 mt-16 flex flex-col gap-5"
    >
      <span className="text-4xl">⚡</span>
      <Heading className="text-foreground">
        {" "}
        What I&apos;ve been working on
      </Heading>
      <p className="text-md text-foreground/60">
        Here are some of the projects I have worked on. Click on the project to
        learn more.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {projects.map((project: Project, idx: number) => (
          <Link href={`/projects/${project.slug}`} key={project.href}>
            <ProjectCard project={project} idx={idx} />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
