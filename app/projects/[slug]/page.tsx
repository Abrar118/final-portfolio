import ProjectDetailsContainer from "@/components/projects/ProjectDetailsContainer";
import { projects } from "@/data/home/projects";
import type { Project } from "@/types/project";
import type { Metadata } from "next";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = params.slug;
  const product = projects.find((p) => p.slug === slug) as Project | undefined;
  if (product) {
    return {
      title: product.title,
      description: product.description,
    };
  }

  return {
    title: "Projects | Abrar Mahir Esam",
    description:
      "Here are some of the projects I have worked on. Click on the project to learn more.",
  };
}

const ProjectDetails = ({ params }: { params: { slug: string } }) => {
  const slug = params.slug;
  const product = projects.find((p) => p.slug === slug);

  if (!product) {
    redirect("/projects");
  }

  return <ProjectDetailsContainer project={product} />;
};

export default ProjectDetails;
