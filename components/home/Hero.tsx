"use client";

import { Spotlight } from "@/components/ui/spotlight";
import { ArrowRight, Download } from "lucide-react";
import { Button } from "../ui/button";
import { socialMedia } from "@/data/home/socials";
import Link from "next/link";
import { motion } from "framer-motion";

const roles = [
  "Fullstack Developer",
  "Competitive Programmer",
  "System Designer",
];

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-32">
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="#7C3AED"
      />
      <Spotlight
        className="h-[80vh] w-[50vw] top-10 left-full"
        fill="#A78BFA"
      />

      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />

      <div className="relative z-10 max-w-[90vw] md:max-w-3xl flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-8"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
          </span>
          Based in Dhaka, Bangladesh
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1]"
        >
          Hi, I&apos;m{" "}
          <span className="text-gradient">Abrar Mahir Esam</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap items-center justify-center gap-2 mt-5"
        >
          {roles.map((role, i) => (
            <span key={role} className="flex items-center gap-2">
              <span className="text-lg md:text-xl text-muted-foreground font-medium">
                {role}
              </span>
              {i < roles.length - 1 && (
                <span className="text-accent/50 text-lg">|</span>
              )}
            </span>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="mt-6 text-muted-foreground text-base md:text-lg max-w-xl leading-relaxed"
        >
          I specialize in building high-quality websites and applications with
          modern technologies. Currently studying CSE at MIST.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
          className="flex items-center gap-3 mt-8"
        >
          <Link href="/Abrar Mahir Esam - CV System.pdf" target="_blank">
            <Button
              size="lg"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold
                rounded-full px-6 gap-2 glow-purple-sm hover:glow-purple transition-shadow duration-300"
            >
              Download Resume
              <Download className="h-4 w-4" />
            </Button>
          </Link>
          <Link href="/projects">
            <Button
              variant="ghost"
              size="lg"
              className="rounded-full gap-2 text-foreground hover:text-accent"
            >
              View Projects
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="flex items-center gap-4 mt-10"
        >
          {socialMedia.map((info) => (
            <Link
              href={info.link}
              target="_blank"
              key={info.id}
              className="w-10 h-10 flex items-center justify-center rounded-full
                bg-muted/50 border border-border/50 text-muted-foreground
                hover:text-accent hover:border-accent/30 hover:bg-accent/5
                transition-all duration-200"
            >
              {typeof info.img === "string" ? (
                <img src={info.img} alt="icon" width={18} height={18} />
              ) : (
                <info.img size={18} />
              )}
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
