"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Heading } from "@/components/ui/Heading";
import type { Project } from "@/types/project";

interface ProjectCardProps {
  project: Project;
  idx: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, idx }) => {
  return (
    <motion.div
      key={project.slug}
      initial={{
        opacity: 0,
        x: -50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      transition={{ duration: 0.2, delay: idx * 0.1 }}
      className="group block w-full h-full bg-background border border-border rounded-xl overflow-hidden transform transition-transform duration-300 ease-in-out hover:scale-105"
    >
      <Image
        src={project.thumbnail}
        alt="thumbnail"
        height={400}
        width={600}
        className="object-cover w-full h-48"
      />
      <div className="p-4">
        <Heading
          as="h4"
          className="text-foreground text-lg md:text-lg lg:text-lg mt-2"
        >
          {project.title}
        </Heading>
        <p className="max-w-[90%] text-foreground/60 mt-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.stack?.map((stack) => (
            <Badge key={stack.name}>{stack.name}</Badge>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
