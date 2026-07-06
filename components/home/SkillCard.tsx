"use client";

import type { IconType } from "react-icons/lib";
import { motion } from "framer-motion";

interface SkillCardProps {
  Icon: IconType;
  name: string;
  description: string;
  color: string;
  bgColor: string;
  size?: "sm" | "lg";
}

/* Each skill is a small stone tablet: chiseled corners, carved face,
   letterpress-engraved name. Icons render in ink, not brand colors. */
export default function SkillsCard({
  Icon,
  name,
  description,
  size = "sm",
}: SkillCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`tablet-frame cursor-default ${size === "lg" ? "col-span-2" : ""}`}
    >
      <div
        className={`tablet flex items-center gap-3.5 p-3.5 ${
          size === "lg" ? "p-5" : ""
        }`}
      >
        <div
          className="flex h-10 w-10 flex-shrink-0 items-center justify-center
            bg-black/[0.07] text-foreground/70 shadow-[inset_0_1px_3px_rgba(0,0,0,0.28)]
            dark:bg-black/30"
        >
          <Icon size={size === "lg" ? 24 : 19} />
        </div>
        <div className="min-w-0">
          <h3 className="engraved font-heading text-[13px] font-semibold tracking-wide text-foreground">
            {name}
          </h3>
          <p className="mt-0.5 truncate font-body text-xs italic text-muted-foreground">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
