import GridLayout from "@/components/home/GridLayout";
import Hero from "@/components/home/Hero";
import ParticlesContainer from "@/components/shared/Particles";

export default function Home() {
  return (
    <main
      className="relative bg-background flex justify-center items-center 
    flex-col overflow-hidden mx-auto sm:px-10 px-5"
    >
      <div className="w-full">
        <ParticlesContainer />
        <Hero />
        <GridLayout />
      </div>
    </main>
  );
}
