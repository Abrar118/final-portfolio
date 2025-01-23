import MagicButton from "@/components/ui/MagicButton";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/TextGenerateEffect";
import { ArrowRight, Download } from "lucide-react";
import { HoverBorderGradient } from "../ui/hover-border-gradient";
import { Button } from "../ui/button";
import { socialMedia } from "@/data/home/socials";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="pt-44 mb-80">
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
        <div className="max-w-[89vw] md:max-w-2xl lg:max-w-[65vw] flex flex-col items-center justify-center">
          <HoverBorderGradient
            containerClassName="rounded-full"
            as="button"
            className="bg-background text-foreground flex items-center space-x-2"
          >
            <span>Based in Dhaka, Bangladesh</span>
          </HoverBorderGradient>

          <TextGenerateEffect
            words="Fullstack Software Developer and Competitive Programmer"
            className="text-center text-[40px] md:text-5xl lg:text-6xl"
          />

          <p className="text-center md:tracking-wider mb-4 text-sm md:text-lg lg:text-xl">
            Hi! I'm{" "}
            <span className="font-bold text-chart2">Abrar Mahir Esam</span>. I
            specialize in building high-quality websites and applications.
          </p>

          <div className="flex items-end gap-4">
            <MagicButton
              title="Download resume"
              icon={<Download size={20} />}
              position="right"
              callResume={true}
            />
            <Button variant={"ghost"}>
              <Link href={"#projects"}>See my work</Link>
              <ArrowRight size={20} />
            </Button>
          </div>

          <div className="flex items-center md:gap-3 gap-6 mt-5">
            {socialMedia.map((info) => (
              <Link
                href={info.link}
                target="_blank"
                key={info.id}
                className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter 
              backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
              >
                {typeof info.img === "string" ? (
                  <img src={info.img} alt="icons" width={20} height={20} />
                ) : (
                  <info.img size={20} />
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
