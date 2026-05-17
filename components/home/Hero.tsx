"use client";

import { Spotlight } from "@/components/ui/spotlight";
import { ArrowRight, Download, Briefcase, Trophy, Code2 } from "lucide-react";
import { Button } from "../ui/button";
import { socialMedia } from "@/data/home/socials";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const stats = [
  { icon: Briefcase, value: "3+", label: "Companies" },
  { icon: Code2, value: "9+", label: "Projects" },
  { icon: Trophy, value: "8+", label: "Awards" },
];

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-16 pb-32 overflow-x-clip">
      <Spotlight
        className="-top-40 -left-10 md:-left-32 md:-top-20 h-screen"
        fill="#7C3AED"
      />
      <Spotlight
        className="h-[80vh] w-[50vw] top-10 left-full"
        fill="#A78BFA"
      />

      <div className="absolute inset-0 bg-gradient-glow pointer-events-none" />
      <div className="absolute inset-0 pointer-events-none dark:hidden bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.12)_0%,transparent_50%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.1)_0%,transparent_50%)]" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div className="order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
                bg-accent/10 border border-accent/20 text-accent text-sm font-medium mb-6"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent" />
              </span>
              Open to opportunities
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.08, ease: "easeOut" }}
              className="leading-[0.95] overflow-visible"
            >
              <span className="block font-display text-5xl md:text-6xl lg:text-7xl font-medium text-foreground">
                Abrar
              </span>
              <span className="block font-display text-5xl md:text-6xl lg:text-7xl font-bold italic text-gradient mt-1 whitespace-nowrap">
                Mahir Esam
              </span>
              <span className="block font-mono text-xs md:text-sm tracking-[0.25em] uppercase text-muted-foreground mt-5">
                Full Stack Software Engineer
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.16, ease: "easeOut" }}
              className="mt-5 text-muted-foreground text-base md:text-lg leading-relaxed max-w-lg"
            >
              Software Engineer building fullstack web apps, cross-platform
              desktop tools with{" "}
              <span className="text-foreground font-medium">Tauri + Rust</span>,
              and mobile apps with{" "}
              <span className="text-foreground font-medium">Flutter</span>.
              Currently at{" "}
              <span className="text-accent font-medium">Bengal Byte</span>.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.24, ease: "easeOut" }}
              className="flex flex-wrap items-center gap-3 mt-8"
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

            {/* Stats strip */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.32, ease: "easeOut" }}
              className="flex items-center gap-6 mt-10 pt-8 border-t border-border/20"
            >
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="flex items-center gap-2.5">
                    <div className="p-2 rounded-lg bg-accent/10">
                      <Icon className="h-4 w-4 text-accent" />
                    </div>
                    <div>
                      <p className="font-heading font-bold text-lg text-foreground leading-none">
                        {stat.value}
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {stat.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </motion.div>

            {/* Socials */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.4 }}
              className="flex items-center gap-3 mt-8"
            >
              {socialMedia.map((info) => (
                <Link
                  href={info.link}
                  target="_blank"
                  key={info.id}
                  className="w-9 h-9 flex items-center justify-center rounded-full
                    bg-muted/40 border border-border/30 text-muted-foreground
                    hover:text-accent hover:border-accent/30 hover:bg-accent/5
                    transition-all duration-200"
                >
                  {typeof info.img === "string" ? (
                    <img src={info.img} alt="icon" width={16} height={16} />
                  ) : (
                    <info.img size={16} />
                  )}
                </Link>
              ))}
            </motion.div>
          </div>

          {/* Right — Portrait */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className="order-1 lg:order-2 flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow behind image */}
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-accent/20 via-secondary/10 to-transparent blur-2xl" />

              {/* Main image */}
              <div className="relative w-72 h-80 md:w-80 md:h-[26rem] lg:w-[22rem] lg:h-[28rem] rounded-2xl overflow-hidden border-2 border-border/20">
                <Image
                  src="/hero-portrait.jpg"
                  alt="Abrar Mahir Esam"
                  fill
                  className="object-cover object-top"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </div>

              {/* Floating badge — top right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
                className="absolute -top-3 -right-3 md:-right-6 px-3 py-2 rounded-xl
                  bg-card/90 backdrop-blur-xl border border-border/30 shadow-lg"
              >
                <p className="text-xs font-medium text-accent">Full Stack</p>
                <p className="text-[10px] text-muted-foreground">Software Engineer</p>
              </motion.div>

              {/* Floating badge — bottom left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.6, ease: "easeOut" }}
                className="absolute -bottom-3 -left-3 md:-left-6 px-3 py-2 rounded-xl
                  bg-card/90 backdrop-blur-xl border border-border/30 shadow-lg"
              >
                <p className="text-xs font-medium text-accent">Codeforces</p>
                <p className="text-[10px] text-muted-foreground">
                  Specialist &middot; 1425
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
