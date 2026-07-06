"use client";

import { ArrowRight, Download, Cog, Compass, ScrollText } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  CornerOrnaments,
  FiligreeDivider,
  AstrolabeRing,
} from "../ui/ornaments";

const stats = [
  { value: "IV", arabic: "4", label: "Companies served" },
  { value: "XIII", arabic: "13", label: "Works completed" },
  { value: "X", arabic: "10", label: "Honours earned" },
];

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay, ease: "easeOut" as const },
});

const Hero = () => {
  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  // Transform-only parallax: each layer drifts at its own rate on the
  // compositor — no layout work, no scroll listeners of our own.
  const drift1 = useTransform(scrollY, [0, 700], [0, -170]);
  const drift2 = useTransform(scrollY, [0, 700], [0, -110]);
  const drift3 = useTransform(scrollY, [0, 700], [0, 130]);
  const drift4 = useTransform(scrollY, [0, 700], [0, -70]);
  const cardFade = useTransform(scrollY, [0, 500], [1, 0]);
  const portraitDrift = useTransform(scrollY, [0, 800], [0, 40]);
  // The great astrolabe turns and swells behind the title page…
  const ringRotate = useTransform(scrollY, [0, 1200], [0, 120]);
  const ringScale = useTransform(scrollY, [0, 800], [1, 1.3]);
  // …while the page itself recedes like a closing folio.
  const pageScale = useTransform(scrollY, [0, 700], [1, 0.93]);
  const pageY = useTransform(scrollY, [0, 700], [0, 80]);
  const pageFade = useTransform(scrollY, [100, 750], [1, 0.25]);

  return (
    <section className="relative flex min-h-[88vh] items-center justify-center px-4 py-16 md:py-20">
      {/* The great astrolabe — turns with the reader's scroll */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
      >
        <motion.div
          style={reduceMotion ? undefined : { rotate: ringRotate, scale: ringScale }}
        >
          <AstrolabeRing className="h-[560px] w-[560px] text-gold/[0.14] md:h-[780px] md:w-[780px]" />
        </motion.div>
      </div>

      {/* Marginalia — instruments in the margins (decorative, wide screens) */}
      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: drift1, opacity: cardFade }}
        className="pointer-events-none absolute left-[3%] top-[16%] hidden xl:block 2xl:left-[7%]"
      >
        <div className="w-52 -rotate-3 animate-float border border-border/80 bg-card/90 p-4 shadow-sm">
          <p className="rubric !text-[9px] flex items-center gap-1.5">
            <Cog className="h-3 w-3" /> Guild Rank
          </p>
          <p className="mt-2 font-heading text-sm font-semibold text-foreground">
            Codeforces · Specialist
          </p>
          <p className="mt-0.5 font-body text-xs italic text-muted-foreground">
            highest rating 1425
          </p>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: drift2, opacity: cardFade }}
        className="pointer-events-none absolute right-[3%] top-[20%] hidden xl:block 2xl:right-[7%]"
      >
        <div className="w-56 rotate-2 animate-float border border-border/80 bg-card/90 p-4 shadow-sm [animation-delay:-2s]">
          <p className="rubric !text-[9px] flex items-center gap-1.5">
            <Compass className="h-3 w-3" /> Current Commission
          </p>
          <p className="mt-2 font-heading text-sm font-semibold text-foreground">
            Bengal Byte
          </p>
          <p className="mt-0.5 font-body text-xs italic text-muted-foreground">
            patient platform for a European healthcare provider
          </p>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: drift3, opacity: cardFade }}
        className="pointer-events-none absolute bottom-[14%] left-[5%] hidden xl:block 2xl:left-[9%]"
      >
        <div className="w-60 rotate-1 animate-float border border-border/80 bg-card/90 p-4 shadow-sm [animation-delay:-4s]">
          <p className="rubric !text-[9px] flex items-center gap-1.5">
            <ScrollText className="h-3 w-3" /> Incantation
          </p>
          <p className="mt-2 font-mono text-xs text-foreground">
            $ quickdev launch --all
          </p>
          <p className="mt-1 font-body text-xs italic text-muted-foreground">
            a dev environment, conjured in one command
          </p>
        </div>
      </motion.div>

      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: drift4, opacity: cardFade }}
        className="pointer-events-none absolute bottom-[16%] right-[6%] hidden xl:block 2xl:right-[10%]"
      >
        <AstrolabeRing className="h-32 w-32 animate-spin-slow text-gold/35 motion-reduce:animate-none" />
      </motion.div>

      <motion.div
        style={
          reduceMotion
            ? undefined
            : { scale: pageScale, y: pageY, opacity: pageFade }
        }
        className="relative mx-auto w-full max-w-3xl px-6 py-14 md:px-14 md:py-16"
      >
        <CornerOrnaments />

        <div className="flex flex-col items-center text-center">
          {/* Portrait medallion */}
          <motion.div
            {...fadeUp(0)}
            style={reduceMotion ? undefined : { y: portraitDrift }}
          >
            <div className="rounded-full border border-gold/60 p-1.5">
              <div className="rounded-full border border-gold/35 p-1">
                <div className="relative h-32 w-32 md:h-36 md:w-36 overflow-hidden rounded-full">
                  <Image
                    src="/hero-portrait.jpg"
                    alt="Portrait of Abrar Mahir Esam"
                    fill
                    sizes="144px"
                    className="object-cover object-top [filter:sepia(0.15)_saturate(0.92)]"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rubric */}
          <motion.p {...fadeUp(0.1)} className="rubric mt-8">
            Anno MMXXVI · Dhaka, Bangladesh
          </motion.p>

          {/* Illuminated title */}
          <motion.h1
            {...fadeUp(0.18)}
            className="font-display text-gilded mt-5 text-4xl font-bold leading-tight sm:text-5xl md:text-6xl"
          >
            Abrar Mahir Esam
          </motion.h1>

          <motion.div {...fadeUp(0.26)} className="w-full flex justify-center">
            <FiligreeDivider className="mt-6 h-3.5 w-56 text-gold" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            {...fadeUp(0.32)}
            className="mt-6 font-body text-lg italic text-foreground/90 md:text-xl"
          >
            Full-stack software engineer &amp; competitive programmer
          </motion.p>

          {/* Intro */}
          <motion.p
            {...fadeUp(0.4)}
            className="mt-4 max-w-xl font-body text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            Building scalable web, mobile, and desktop systems with Spring
            Boot, Next.js, Flutter, and Rust — presently in service at{" "}
            <span className="font-medium text-foreground">Bengal Byte</span>,
            crafting a privacy-focused patient platform for a European
            healthcare provider.
          </motion.p>

          {/* CTAs */}
          <motion.div
            {...fadeUp(0.48)}
            className="mt-9 flex flex-wrap items-center justify-center gap-3"
          >
            <Link href="/Abrar-Mahir-Esam-CV.pdf" target="_blank">
              <Button
                size="lg"
                className="gap-2 rounded-sm bg-primary px-6 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground hover:bg-primary/90"
              >
                Download CV
                <Download className="h-4 w-4" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button
                variant="ghost"
                size="lg"
                className="gap-2 rounded-sm font-heading text-xs font-semibold uppercase tracking-[0.15em] text-foreground hover:bg-muted/60 hover:text-accent"
              >
                View the Works
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          {/* Marginalia — the tally */}
          <motion.dl
            {...fadeUp(0.56)}
            className="mt-12 flex flex-wrap items-center justify-center gap-x-10 gap-y-4 border-t border-border/60 pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <dt className="sr-only">{stat.label}</dt>
                <dd
                  className="font-heading text-2xl font-semibold text-primary"
                  aria-label={stat.arabic}
                >
                  {stat.value}
                </dd>
                <dd className="mt-1 font-body text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {stat.label}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
