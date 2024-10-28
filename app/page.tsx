import GridLayout from "@/components/home/GridLayout";
import Hero from "@/components/home/Hero";
import ProjectSection from "@/components/home/ProjectSection";
import ParticlesContainer from "@/components/shared/Particles";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { navItems } from "@/data/home/navItems";

export default function Home() {
  return (
    <main
      className="relative bg-background flex justify-center items-center 
    flex-col overflow-hidden mx-auto sm:px-10 px-5"
    >
      <FloatingNav navItems={navItems} />

      <div className="w-full">
        <ParticlesContainer />
        <Hero />
        <GridLayout />
        <ProjectSection />
      </div>
    </main>
  );
}
