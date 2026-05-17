"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { IconCircleCheckFilled } from "@tabler/icons-react";
import { timeline } from "@/data/about/timeline";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tab2";
import { Briefcase, Trophy } from "lucide-react";
import { achievements } from "@/data/about/achievements";
import { Badge } from "@/components/ui/badge";

export default function About() {
  const images = [
    "/avatar.png",
    "/avatar2.jpg",
    "/avatar4.jpg",
    "/avatar5.jpg",
  ];

  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          About Me
        </h1>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 my-10">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
          >
            <Image
              src={image}
              width={200}
              height={400}
              alt="about"
              className="rounded-xl object-cover shadow-lg block w-full h-40 md:h-60
                hover:scale-[1.02] transition-transform duration-200
                border border-border/20"
              style={{ rotate: `${index % 2 === 0 ? 2 : -2}deg` }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="max-w-4xl space-y-4 text-muted-foreground leading-relaxed"
      >
        <p>
          Hey there, I&apos;m Abrar Mahir Esam — a passionate developer, avid
          artist, and a connoisseur of awesome design. I&apos;m a CSE
          undergraduate at Military Institute of Science and Technology with a
          passion for software development, competitive programming, and system
          design. Currently working as the Executive Director at MIST Computer
          Club.
        </p>
        <p>
          Since the early days of my journey, I have been captivated by the vast
          world of Mathematics. In my school days I participated in various math
          competitions and Olympiads. Later on, I found my interest in
          programming and started competitive programming on platforms like
          Codeforces, AtCoder, and LeetCode.
        </p>
        <p>
          But my journey doesn&apos;t stop at coding. With a heart full of words
          and a mind brimming with ideas, I&apos;ve ventured into the realm of
          writing and art — poems and sketches for Inktobers and beyond.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        className="mt-20"
      >
        <h2 className="font-heading text-2xl font-bold mb-6">Experience</h2>

        <Tabs defaultValue="timeline">
          <TabsList className="w-full bg-card/60 border border-border/30">
            <TabsTrigger value="timeline" className="w-full gap-2">
              <Briefcase className="h-4 w-4" /> Timeline
            </TabsTrigger>
            <TabsTrigger value="achievements" className="w-full gap-2">
              <Trophy className="h-4 w-4" /> Achievements
            </TabsTrigger>
          </TabsList>

          <TabsContent value="timeline">
            <div className="mt-8 space-y-0">
              {timeline.map((item, index) => (
                <div
                  className="relative flex gap-6 pb-10 last:pb-0"
                  key={`${item.company}-${index}`}
                >
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                    {index < timeline.length - 1 && (
                      <div className="w-px flex-1 bg-border/50 mt-2" />
                    )}
                  </div>

                  <div className="pb-2">
                    <p className="text-xs text-muted-foreground mb-1">
                      {item.date}
                    </p>
                    <h3 className="font-heading font-semibold text-accent">
                      {item.company}
                    </h3>
                    <p className="text-sm font-medium text-foreground">
                      {item.title}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1 mb-3">
                      {item.description}
                    </p>

                    {item.responsibilities.map((r) => (
                      <div
                        key={r}
                        className="flex items-start gap-2 my-1.5"
                      >
                        <IconCircleCheckFilled className="h-3.5 w-3.5 mt-0.5 text-accent/60 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">
                          {r}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="achievements">
            <div className="mt-8 space-y-0">
              {achievements.map((a, index) => (
                <div
                  className="relative flex gap-6 pb-10 last:pb-0"
                  key={`${a.title}-${index}`}
                >
                  <div className="flex flex-col items-center">
                    <div className="h-3 w-3 rounded-full bg-accent flex-shrink-0 mt-1.5" />
                    {index < achievements.length - 1 && (
                      <div className="w-px flex-1 bg-border/50 mt-2" />
                    )}
                  </div>

                  <div className="pb-2">
                    <p className="text-xs text-muted-foreground mb-1">
                      {a.date}
                    </p>
                    <h3 className="font-heading font-semibold text-accent">
                      {a.title}
                    </h3>
                    <p className="text-sm font-medium text-foreground">
                      {a.organization}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {a.description}
                    </p>
                    <Badge
                      variant="secondary"
                      className="mt-2 text-xs bg-accent/10 text-accent border-none"
                    >
                      {a.type}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}
