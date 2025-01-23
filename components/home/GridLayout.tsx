"use client";
import React, { useRef } from "react";
import { Tabs } from "../ui/tabs";
import { skillsTabs } from "@/data/home/skillsTab";
import SkillsCard from "./SkillCard";
import { AnimatePresence, motion, useInView } from "framer-motion";

const SkillsSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  const skillsTabContent = skillsTabs.map((tab) => {
    return {
      title: tab.title,
      value: tab.value,
      content: (
        <div
          className={`grid grid-cols-1 gap-3 md:grid-cols-2 ${
            tab.contents.length < 4 ? "lg:grid-cols-3" : "lg:grid-cols-4"
          }`}
        >
          {tab.contents.map((content) => {
            return (
              <SkillsCard
                key={content.name}
                Icon={content.img}
                name={content.name}
                description={content.desc}
                color={content.iconColor}
                bgColor={content.bgColor}
              />
            );
          })}
        </div>
      ),
    };
  });

  return (
    <section
      className="mx-4 md:mx-[1%] lg:mx-[5%] xl:mx-[20%] py-10 flex flex-col gap-5"
      id="about"
      ref={ref}
    >
      {/* header */}
      <AnimatePresence mode="wait">
        <motion.div
          className="flex flex-col gap-3"
          initial={{ x: "-50%", opacity: 0 }}
          animate={inView ? { x: "0%", opacity: 1 } : { x: "-50%", opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        >
          <h1 className="text-5xl font-bold">My technologies</h1>
          <p className="text-md text-foreground/60">
            I have expertise in various contemporary technologies that enable me
            to create highly effective solutions.{" "}
            <br className="md:block hidden" /> Here are some of the key
            technologies I use.
          </p>
        </motion.div>
      </AnimatePresence>

      {/* skills tab */}
      <motion.div
        initial={{ y: "30%", opacity: 0 }}
        animate={inView ? { y: "0%", opacity: 1 } : { y: "30%", opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut", delay: 0.1 }}
        className="h-[20rem] md:h-[40rem] [perspective:1000px] relative flex 
      flex-col max-w-7xl w-full items-start justify-start my-10"
      >
        <Tabs tabs={skillsTabContent} contentClassName="bg-background" />
      </motion.div>
    </section>
  );
};

export default SkillsSection;
