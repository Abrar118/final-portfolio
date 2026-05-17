import SkillsSection from "@/components/home/GridLayout";
import Hero from "@/components/home/Hero";
import ProjectSection from "@/components/home/ProjectSection";

export default function Home() {
  return (
    <main className="relative bg-background flex justify-center items-center flex-col overflow-hidden mx-auto">
      <div className="w-full">
        <Hero />
        <SkillsSection />
        <ProjectSection />
      </div>
    </main>
  );
}
