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
          Hey there, I&apos;m Abrar Mahir Esam — a Software Engineer currently
          at Bengal Byte, working on a German psychiatric facility&apos;s
          patient management system. I graduated with a BSc in CSE from
          Military Institute of Science and Technology (CGPA: 3.56/4.00) and
          am now pursuing my MSc.
        </p>
        <p>
          I&apos;ve shipped production software across the stack — fullstack
          web apps with Next.js and Spring Boot, cross-platform desktop tools
          with Tauri + Rust, mobile apps with Flutter, and scalable backend
          systems with microservices. I also did contractual work for the
          Chief Advisor&apos;s Office of Bangladesh, engineering a horizontally
          scalable backend with Spring Boot and PostgreSQL.
        </p>
        <p>
          On the competitive side, I hold a Specialist rank on Codeforces
          (rating 1425) and mentored three batches of juniors in competitive
          programming at MIST Computer Club. My research on AI-enhanced waste
          recycling was published at the 2025 IEEE QPAIN conference.
        </p>
        <p>
          Beyond code, I&apos;m an avid artist — poems and sketches for
          Inktobers and beyond. I believe great software is where engineering
          meets thoughtful design.
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
