"use client";
import React, { useState } from "react";
import { projects } from "@/data/home/projects";
import type { Project } from "@/types/project";
import { Heading } from "@/components/ui/Heading";
import ProjectDetails from "@/components/projects/ProjectDetails";
import ProjectSelector from "@/components/projects/ProjectSelector";

const Projects = () => {
  const [activeProject, setActiveProject] = useState<Project>(projects[0]);

  return (
    <div className="mx-4 md:mx-[1%] lg:mx-[5%] xl:mx-[10%] pb-10 mt-16 flex flex-col gap-5">
      <span className="text-4xl">⚡</span>
      <Heading className="text-foreground">
        What I&apos;ve been working on
      </Heading>
      <p className="text-md text-foreground/60">
        Here are some of the projects I have worked on. Hover over a project to
        learn more.
      </p>

      <div className="flex flex-col md:flex-row gap-10 mt-8">
        <div className="w-full md:w-1/2">
          <ProjectDetails project={activeProject} />
        </div>
        <div className="w-full md:w-1/2">
          <ProjectSelector
            projects={projects}
            activeProject={activeProject}
            onProjectSelect={setActiveProject}
          />
        </div>
      </div>
    </div>
  );
};

export default Projects;
