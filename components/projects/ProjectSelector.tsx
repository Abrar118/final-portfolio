import React from "react";
import type { Project } from "@/types/project";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ProjectSelectorProps {
  projects: Project[];
  activeProject: Project;
  onProjectSelect: (project: Project) => void;
}

const ProjectSelector: React.FC<ProjectSelectorProps> = ({
  projects,
  activeProject,
  onProjectSelect,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {projects.map((project) => (
        <div
          key={project.slug}
          onMouseOver={() => onProjectSelect(project)}
          className={cn(
            "cursor-pointer p-2 rounded-lg transition-all duration-300 flex items-center gap-4",
            {
              "bg-muted/50": activeProject.slug === project.slug,
            }
          )}
        >
          <Image
            src={project.thumbnail}
            alt={project.title}
            width={80}
            height={80}
            className={cn("rounded-lg object-cover transition-all duration-300", {
              "scale-110": activeProject.slug === project.slug,
              "scale-90 opacity-50": activeProject.slug !== project.slug,
            })}
          />
          <h3
            className={cn("text-lg font-semibold transition-all duration-300", {
              "text-foreground": activeProject.slug === project.slug,
              "text-foreground/50": activeProject.slug !== project.slug,
            })}
          >
            {project.title}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default ProjectSelector;
