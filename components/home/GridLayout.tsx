"use client";

import React, { useRef } from "react";
import { skillsTabs } from "@/data/home/skillsTab";
import SkillsCard from "./SkillCard";
import { motion, useInView } from "framer-motion";
import { Code2, Smartphone, Cpu, Database } from "lucide-react";
import { SectionHeading } from "../ui/ornaments";
import ParallaxSection from "../ui/parallax-section";

const categoryIcons: Record<string, React.ReactNode> = {
  "web-development": <Code2 className="h-4 w-4" />,
  "mobile-development": <Smartphone className="h-4 w-4" />,
  "software-and-systems": <Cpu className="h-4 w-4" />,
  databases: <Database className="h-4 w-4" />,
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="mx-auto max-w-5xl px-4 py-20 md:px-8"
      id="armory"
      ref={ref}
    >
      <ParallaxSection speed={150} fade>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <SectionHeading
            rubric="Folio II"
            title="The Armory"
            subtitle="The instruments of the craft — languages, frameworks, and tools kept sharp through daily practice."
            className="mb-14"
          />
        </motion.div>
      </ParallaxSection>

      <ParallaxSection speed={45}>
      <div className="grid grid-cols-1 gap-10 md:grid-cols-2">
        {skillsTabs.map((category, catIdx) => (
          <ParallaxSection
            key={category.value}
            speed={catIdx % 2 === 0 ? 35 : -35}
          >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: catIdx * 0.1,
              ease: "easeOut",
            }}
          >
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center border border-border bg-card text-primary">
                {categoryIcons[category.value]}
              </div>
              <h3 className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-foreground">
                {category.title}
              </h3>
              <div className="h-px flex-1 bg-border/70" />
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {category.contents.map((skill) => (
                <SkillsCard
                  key={skill.name}
                  Icon={skill.img}
                  name={skill.name}
                  description={skill.desc}
                  color={skill.iconColor}
                  bgColor={skill.bgColor}
                />
              ))}
            </div>
          </motion.div>
          </ParallaxSection>
        ))}
      </div>
      </ParallaxSection>
    </section>
  );
};

export default SkillsSection;
