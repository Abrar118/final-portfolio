import SkillsSection from "@/components/home/GridLayout";
import Hero from "@/components/home/Hero";
import ProjectSection from "@/components/home/ProjectSection";
import { projects } from "@/data/home/projects";

export default function Home() {
  return (
    <main className="relative bg-background flex justify-center items-center flex-col overflow-hidden mx-auto">
      <div className="w-full">
        <Hero projectCount={projects.length} />
        <ProjectSection />
        <SkillsSection />
      </div>
    </main>
  );
}
