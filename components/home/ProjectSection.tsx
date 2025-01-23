"use client";
import React, { useRef } from "react";
import { Heading } from "@/components/ui/Heading";
import type { Project } from "@/types/project";
import { projects } from "@/data/home/projects";
import Link from "next/link";
import Image from "next/image";
import { Paragraph } from "@/components/ui/Paragraph";
import { motion, useInView } from "framer-motion";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Badge } from "../ui/badge";
import Avatar from "./Avatar";
import { Button } from "../ui/button";

const ProjectSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });

  return (
    <div
      className="mx-4 mb-40 md:mx-[1%] lg:mx-[5%] xl:mx-[20%] pb-10 md:-mt-16 flex flex-col gap-5"
      id="projects"
      ref={ref}
    >
      <Heading
        as="h2"
        className="font-black text-xl md:text-2xl lg:text-5xl mb-4"
      >
        What I&apos;ve been working on
      </Heading>
      <p className="text-md text-foreground/60">
        Here are some of the projects I have worked on. Click on the project to
        learn more.
      </p>

      <Carousel
        className="w-full"
        opts={{
          align: "start",
          loop: true,
        }}
      >
        <CarouselContent className="-ml-1 md:mx-4">
          {projects.map((project: Project, idx: number) => (
            <CarouselItem
              key={project.slug}
              className="pl-2 md:ml-4 md:basis-2/3"
            >
              <motion.div
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
                    <div className="flex flex-wrap md:mb-1 md:mt-0 max-w-[90%]">
                      {/* {project.stack?.map((stack) => (
                        <Badge key={stack.name}>{stack.name}</Badge>
                      ))} */}
                      {project.stack?.map((stack) => (
                        <Badge
                          className="bg-muted border border-foreground/40 rounded-[50%] p-2"
                          key={stack.name}
                        >
                          {stack.Icon}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Link>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="flex justify-center">
        <Link href="/projects">
          <Button className="mt-4">View All Projects</Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectSection;
