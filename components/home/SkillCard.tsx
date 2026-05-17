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

export default function SkillsCard({
  Icon,
  name,
  description,
  color,
  bgColor,
  size = "sm",
}: SkillCardProps) {
  return (
    <motion.div
      whileHover={{ y: -2, scale: 1.02 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className={`group relative flex items-center gap-4 p-4 rounded-xl
        bg-card border border-border/30
        hover:border-accent/30
        transition-colors duration-200 cursor-default
        ${size === "lg" ? "col-span-2 p-5" : ""}`}
    >
      <div
        className="flex-shrink-0 flex items-center justify-center rounded-lg p-2.5"
        style={{ backgroundColor: `${color}25`, color }}
      >
        <Icon size={size === "lg" ? 28 : 22} />
      </div>
      <div className="min-w-0">
        <h3 className="font-heading font-semibold text-sm text-foreground">
          {name}
        </h3>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
