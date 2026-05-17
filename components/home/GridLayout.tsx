"use client";

import React, { useRef } from "react";
import { skillsTabs } from "@/data/home/skillsTab";
import SkillsCard from "./SkillCard";
import { motion, useInView } from "framer-motion";
import { Code2, Smartphone, Cpu, Database } from "lucide-react";

const categoryIcons: Record<string, React.ReactNode> = {
  "web-development": <Code2 className="h-5 w-5" />,
  "mobile-development": <Smartphone className="h-5 w-5" />,
  "software-and-systems": <Cpu className="h-5 w-5" />,
  databases: <Database className="h-5 w-5" />,
};

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      className="mx-4 md:mx-[5%] lg:mx-[10%] xl:mx-[15%] py-20"
      id="about"
      ref={ref}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-12"
      >
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Technologies I work with
        </h2>
        <p className="text-muted-foreground mt-3 max-w-xl">
          Building with modern tools across the full stack — from frontend
          frameworks to system-level programming.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {skillsTabs.map((category, catIdx) => (
          <motion.div
            key={category.value}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.4,
              delay: catIdx * 0.1,
              ease: "easeOut",
            }}
          >
            <div className="flex items-center gap-2.5 mb-4">
              <div className="p-2 rounded-lg bg-accent/10 text-accent">
                {categoryIcons[category.value]}
              </div>
              <h3 className="font-heading font-semibold text-foreground">
                {category.title}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
