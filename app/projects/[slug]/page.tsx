import ProjectDetailsContainer from "@/components/projects/ProjectDetailsContainer";
import { projects } from "@/data/home/projects";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.flatMap((p) => (p.slug ? [{ slug: p.slug }] : []));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (project) {
    return {
      title: `${project.title} | Abrar Mahir Esam`,
      description: project.description,
    };
  }

  return {
    title: "Quest Log | Abrar Mahir Esam",
    description: "Projects by Abrar Mahir Esam.",
  };
}

const ProjectDetails = async ({ params }: Props) => {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);

  if (index === -1) {
    redirect("/projects");
  }

  const neighbor = (i: number) => {
    const p = projects[i];
    return p?.slug ? { slug: p.slug, title: p.title } : null;
  };

  return (
    <ProjectDetailsContainer
      project={projects[index]}
      number={index + 1}
      prev={neighbor(index - 1)}
      next={neighbor(index + 1)}
    />
  );
};

export default ProjectDetails;
