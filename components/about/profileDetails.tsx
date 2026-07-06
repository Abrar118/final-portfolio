"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { timeline } from "@/data/about/timeline";
import { achievements } from "@/data/about/achievements";
import { SectionHeading } from "@/components/ui/ornaments";

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
        <SectionHeading
          rubric="Folio I"
          title="The Chronicle"
          subtitle="Of the life, studies, and service of Abrar Mahir Esam."
        />
      </motion.div>

      <div className="my-12 grid grid-cols-2 gap-4 md:grid-cols-4">
        {images.map((image, index) => (
          <motion.div
            key={image}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.08 }}
          >
            <Image
              src={image}
              width={200}
              height={400}
              alt="Portrait miniature of Abrar"
              className="block h-40 w-full border border-border bg-card object-cover p-1.5 md:h-60
                shadow-sm transition-transform duration-200 hover:scale-[1.02]
                [filter:sepia(0.12)_saturate(0.95)]"
              style={{ rotate: `${index % 2 === 0 ? 1.5 : -1.5}deg` }}
            />
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
        className="mx-auto max-w-3xl space-y-4 font-body text-base leading-relaxed text-muted-foreground md:text-lg"
      >
        <p className="drop-cap">
          Here begins the account of Abrar Mahir Esam — a software engineer
          presently at Bengal Byte, building a privacy-focused patient
          management platform for a European healthcare provider. He earned
          his BSc in Computer Science and Engineering from the Military
          Institute of Science and Technology (CGPA 3.56/4.00) and now
          pursues his MSc at the same institution.
        </p>
        <p>
          He has shipped production software across the whole of the stack —
          web applications with Next.js and Spring Boot, cross-platform
          desktop tools with Tauri and Rust, mobile apps with Flutter, and
          horizontally scalable backends. In contractual service to the
          Government of Bangladesh, he architected a Spring Boot and
          PostgreSQL platform for large-scale personnel and duty management,
          hardened with Redis-backed caching, JWT auth, and rate limiting.
        </p>
        <p>
          In contest he holds the rank of Specialist upon Codeforces (highest
          rating 1425) and mentored three batches of juniors in competitive
          programming at the MIST Computer Club. His research on AI-enhanced
          waste recycling was published at the 2025 IEEE QPAIN conference.
        </p>
        <p>
          Beyond the craft of code, he is an avid artist — of poems and
          sketches, Inktobers and beyond — holding that great software is
          where engineering meets thoughtful design.
        </p>
      </motion.div>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
        className="mt-24"
      >
        <SectionHeading
          rubric="Folio II"
          title="Deeds & Service"
          className="mb-12"
        />

        <div className="mx-auto max-w-3xl">
          {timeline.map((item, index) => (
            <div
              className="relative flex gap-6 pb-12 last:pb-0"
              key={`${item.company}-${index}`}
            >
              <div className="flex flex-col items-center">
                <span
                  aria-hidden="true"
                  className="mt-1 h-2.5 w-2.5 flex-shrink-0 rotate-45 border border-gold bg-card"
                />
                {index < timeline.length - 1 && (
                  <div className="mt-2 w-px flex-1 bg-border" />
                )}
              </div>

              <div className="pb-2">
                <p className="rubric !text-[10px] mb-1.5">{item.date}</p>
                <h3 className="font-heading font-semibold tracking-wide text-primary">
                  {item.company}
                </h3>
                <p className="font-body text-sm font-medium italic text-foreground">
                  {item.title}
                </p>
                <p className="mb-3 mt-1 font-body text-sm text-muted-foreground">
                  {item.description}
                </p>

                <ul>
                  {item.responsibilities.map((r) => (
                    <li key={r} className="my-1.5 flex items-start gap-2.5">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 flex-shrink-0 text-xs leading-relaxed text-gold"
                      >
                        ❧
                      </span>
                      <span className="font-body text-sm text-muted-foreground">
                        {r}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
        className="mt-24"
      >
        <SectionHeading
          rubric="Folio III"
          title="Honours & Feats"
          className="mb-12"
        />

        <div className="mx-auto grid max-w-3xl gap-4 sm:grid-cols-2">
          {achievements.map((a, index) => (
            <div
              key={`${a.title}-${index}`}
              className="border border-border/70 bg-card p-4 transition-colors duration-200 hover:border-gold/60"
            >
              <p className="rubric !text-[10px] flex items-center gap-2">
                <span>{a.type}</span>
                <span aria-hidden="true" className="text-gold">
                  ·
                </span>
                <span className="text-muted-foreground">{a.date}</span>
              </p>
              <h3 className="mt-1.5 font-heading text-sm font-semibold tracking-wide text-foreground">
                {a.title}
              </h3>
              <p className="mt-0.5 font-body text-sm italic text-secondary">
                {a.organization}
              </p>
              <p className="mt-1 font-body text-sm text-muted-foreground">
                {a.description}
              </p>
            </div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}
