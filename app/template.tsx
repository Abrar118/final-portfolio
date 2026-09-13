"use client";
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { usePathname } from "next/navigation";

const Template = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const path = usePathname();

  // The landing hero (including its LCP candidates) must be visible at paint.
  if (path === "/") return <>{children}</>;

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </MotionConfig>
  );
};

export default Template;
