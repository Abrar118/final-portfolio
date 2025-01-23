"use client";
import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { projects } from "@/data/home/projects";
import type { Project } from "@/types/project";
import { Heading } from "@/components/ui/Heading";
import { Badge } from "@/components/ui/badge";


const Projects = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  return (
    <div
      ref={ref}
      className="mx-4 mb-40 md:mx-[1%] lg:mx-[5%] xl:mx-[20%] pb-10 mt-16 flex flex-col gap-5"
    >
      <span className="text-4xl">⚡</span>
      <Heading className="text-foreground">
        {" "}
        What I&apos;ve been working on
      </Heading>
      <p className="text-md text-foreground/60">
        Here are some of the projects I have worked on. Click on the project to
        learn more.
      </p>

      <div className="grid grid-cols-1  gap-10">
        {projects.map((project: Project, idx: number) => (
          <motion.div
            key={project.slug}
            initial={{
              opacity: 0,
              x: -50,
            }}
            animate={
              inView
                ? {
                    opacity: 1,
                    x: 0,
                  }
                : {
                    opacity: 0,
                    x: -50,
                  }
            }
            transition={{ duration: 0.2, delay: idx * 0.1 }}
          >
            <Link
              href={`/projects/${project.slug}`}
              key={project.href}
              className="group flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4
         dark:hover:bg-muted/30 hover:bg-muted rounded-2xl transition duration-200"
            >
              <Image
                src={project.thumbnail}
                alt="thumbnail"
                height="200"
                width="200"
                className="rounded-md h-[200px] w-[300px]"
              />
              <div className="flex flex-col justify-between">
                <div>
                  <Heading
                    as="h4"
                    className="text-foreground text-lg md:text-lg lg:text-lg mt-2"
                  >
                    {project.title}
                  </Heading>
                  <p className="max-w-[90%] text-foreground/60">
                    {project.description}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2 space-x-2 md:mb-1 md:mt-0 max-w-[90%]">
                  {project.stack?.map((stack) => (
                    <Badge key={stack.name}>{stack.name}</Badge>
                  ))}
                  {/* {project.stack?.map((stack) => (
                    <Badge className="bg-chart1" key={stack.name}>
                      {stack.Icon}
                    </Badge>
                  ))} */}
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
