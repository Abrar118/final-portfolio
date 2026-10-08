import Hero from "@/components/home/Hero";
import Inventory from "@/components/home/Inventory";
import FeaturedQuests from "@/components/home/FeaturedQuests";
import { projects } from "@/data/home/projects";

export default function Home() {
  return (
    <main>
      <Hero questCount={projects.length} />
      <FeaturedQuests />
      <Inventory />
    </main>
  );
}
