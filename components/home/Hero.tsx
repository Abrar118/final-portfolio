import MagicButton from "@/components/ui/MagicButton";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { Download } from "lucide-react";

const Hero = () => {
  return (
    <section className="pt-36">
      {/* spotlights */}
      <div>
        <Spotlight
          className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
          fill="blue"
        />
        <Spotlight
          className="h-[80vh] w-[50vw] top-10 left-full"
          fill="white"
        />
        <Spotlight className="h-[80vh] w-[50vw] top-32 left-full" fill="red" />
        <Spotlight className="left-96 top-20 h-[80vh] w-[50vw]" fill="red" />
        <Spotlight className="left-80 top-28 h-[80vh] w-[50vw]" fill="white" />
      </div>

      <div className="flex justify-center relative my-20 z-10">
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[60vw] flex flex-col items-center justify-center">
          <p className="tracking-widest text-xs text-center text-foreground max-w-80">
            Hi! I am Abrar Mahir Esam. I am a
          </p>

          <TextGenerateEffect
            words="Fullstack Software Developer and Competitive Programmer"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-2xl">
            I am passionate about building{" "}
            <span className="text-chart1 font-bold">Web applications</span>,{" "}
            <span className="text-chart2 font-bold">Desktop applications</span>,{" "}
            <span className="text-chart3 font-bold">Mobile applications</span>,{" "}
            <span className="text-chart5 font-bold">System Designs</span>, and{" "}
            <span className="text-chart4 font-bold">
              Competitive Programming
            </span>
            .
          </p>

          <a href="#about">
            <MagicButton
              title="Download my resume"
              icon={<Download size={20} />}
              position="right"
              callResume={true}
            />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;
