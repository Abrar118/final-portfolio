"use client";
import { Paragraph } from "@/components/ui/Paragraph";
import Image from "next/image";

import { motion } from "framer-motion";
import { Heading } from "../ui/Heading";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { timeline } from "@/data/about/timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab2";
import { FcTimeline } from "react-icons/fc";
import { GrAchievement } from "react-icons/gr";
import { achievements } from "@/data/about/achievements";
import { Badge } from "../ui/badge";

export default function About() {
  const images = [
    "/avatar.png",
    "/avatar2.jpg",
    "/avatar4.jpg",
    "/avatar5.jpg",
  ];
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 my-10">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{
              opacity: 0,
              y: -50,
              rotate: 0,
            }}
            animate={{
              opacity: 1,
              y: 0,
              rotate: index % 2 === 0 ? 3 : -3,
            }}
            transition={{ duration: 0.2, delay: index * 0.1 }}
          >
            <Image
              src={image}
              width={200}
              height={400}
              alt="about"
              className="rounded-md object-cover rotate-3 shadow-xl block w-full h-40 md:h-60 hover:rotate-0 transition duration-200"
            />
          </motion.div>
        ))}
      </div>

      <div className="max-w-4xl">
        <Paragraph className=" mt-4 text-foreground">
          Hey there, I&apos;m Abrar Mahir Esam - a passionate developer, avid
          artist, and a connoisseur of awesome design. Welcome to my corner of
          the digital world! I'm a CSE undergraduate at Military Institute of
          Science and Technology with a passion for software development,
          competitive programming, and system design. Currently working as the
          Executive Director at MIST Computer Club.
        </Paragraph>
        <Paragraph className=" mt-4 text-foreground">
          Since the early days of my journey, I have captivate by the vast world
          of Mathematics. So, in my school days I used to participate in various
          math competitions and Olympiads. Later on, I found my interest in
          programming and started competitive programming. I have been
          participating in various online contests and have been solving
          problems from various online judges like Codeforces, AtCoder,
          LeetCode, etc.
        </Paragraph>

        <Paragraph className=" mt-4 text-foreground">
          But my journey doesn&apos;t stop at coding. With a heart full of words
          and a mind brimming with ideas, I&apos;ve ventured into the realm of
          writing an art. I have been writing poems and doing sketches for a
          long time for leisure and for Inktobers.
        </Paragraph>

        <Paragraph className=" mt-4 text-foreground">
          Join me on this journey of bytes and narratives, logic and creativity,
          code and prose. Together, we can explore the boundless possibilities
          of technology and storytelling, all while reveling in the sheer beauty
          of thoughtful design.
        </Paragraph>
        <Paragraph className=" mt-4 text-foreground">
          Thank you for being here, and I can&apos;t wait to embark on this
          adventure with you.
        </Paragraph>
      </div>

      <div className="mt-20">
        <span className="text-4xl">💼</span>
        <Heading className="font-black mb-5">Work History</Heading>

        <Tabs defaultValue="timeline">
          <TabsList className="w-full">
            <TabsTrigger value="timeline" className="w-full">
              <FcTimeline size={20} className="mr-3" /> Timeline
            </TabsTrigger>
            <TabsTrigger value="achievements" className="w-full">
              <GrAchievement size={20} className="mr-3" /> Achievements
            </TabsTrigger>
          </TabsList>
          <TabsContent value="timeline">
            <div>
              {timeline.map((item, index) => (
                <div
                  className="flex md:flex-row flex-col space-y-10 md:space-y-0 space-x-10 my-20 relative"
                  key={item.company}
                >
                  <Paragraph className="w-40 text-foreground">
                    {item.date}
                  </Paragraph>
                  <div>
                    <Heading
                      as="h5"
                      className="text-lg md:text-lg lg:text-lg text-chart2"
                    >
                      {item.company}
                    </Heading>
                    <Paragraph className="text-base md:text-base lg:text-base font-semibold text-foreground">
                      {item.title}
                    </Paragraph>
                    <Paragraph className="text-sm md:text-sm lg:text-sm mb-4 text-foreground">
                      {item.description}
                    </Paragraph>

                    {item.responsibilities.map((responsibility, index) => (
                      <Step key={responsibility}>{responsibility}</Step>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="achievements">
            <div>
              {achievements.map((achievement, index) => (
                <div
                  className="flex md:flex-row flex-col space-y-10 md:space-y-0 space-x-10 my-20 relative"
                  key={`achievement-${achievement.title}`}
                >
                  <Paragraph className="w-40 text-foreground">
                    {achievement.date}
                  </Paragraph>
                  <div>
                    <Heading
                      as="h5"
                      className="text-lg md:text-lg lg:text-lg text-chart2"
                    >
                      {achievement.title}
                    </Heading>
                    <Paragraph className="text-base md:text-base lg:text-base font-semibold text-foreground">
                      {achievement.organization}
                    </Paragraph>
                    <Paragraph className="text-sm md:text-sm lg:text-sm mb-4 text-foreground">
                      {achievement.description}
                    </Paragraph>
                    <Badge variant="secondary" className="mt-2">
                      {achievement.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

const Step = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex space-x-1 items-start my-2">
      <IconCircleCheckFilled className="h-3 w-4 mt-1 text-foreground" />
      <Paragraph className="text-sm md:text-sm lg:text-sm text-foreground">
        {children}
      </Paragraph>
    </div>
  );
};
