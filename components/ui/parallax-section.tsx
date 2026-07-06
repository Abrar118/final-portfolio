"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/* Scroll-linked drift: the wrapped block moves against the scroll at its
   own rate. Layer different speeds (heading vs body vs cards) to make the
   depth visible. Transform/opacity only — stays on the compositor. */
export default function ParallaxSection({
  children,
  className,
  speed = 80,
  fade = false,
}: {
  children: React.ReactNode;
  className?: string;
  /** px of counter-drift across the section's viewport transit; negative reverses */
  speed?: number;
  fade?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.12, 0.88, 1],
    fade ? [0.2, 1, 1, 0.2] : [1, 1, 1, 1]
  );

  return (
    <div ref={ref}>
      <motion.div
        style={reduceMotion ? undefined : { y, opacity }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  );
}
