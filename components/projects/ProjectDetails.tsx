import React from "react";
import type { Project } from "@/types/project";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { FiExternalLink } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";

interface ProjectDetailsProps {
  project: Project;
}

const ProjectDetails: React.FC<ProjectDetailsProps> = ({ project }) => {
  return (
    <div className="p-6 rounded-lg bg-muted/20 flex flex-col gap-4 h-full">
      <AnimatePresence mode="wait">
        <motion.div
          key={project.href}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <Heading>{project.title}</Heading>
          <p className="text-foreground/60 mt-2">{project.description}</p>
          {project.stack && (
            <div className="flex flex-wrap gap-2 mt-4">
              {project.stack.map((tech) => (
                <Badge key={tech.name} variant="secondary">
                  {tech.name}
                </Badge>
              ))}
            </div>
          )}
          <Link
            href={`/projects/${project.slug}`}
            className="text-sm text-foreground/60 hover:text-foreground transition-colors flex items-center gap-2 mt-4"
          >
            View Project <FiExternalLink />
          </Link>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ProjectDetails;
