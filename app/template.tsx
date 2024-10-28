"use client";
import Transition from "@/components/shared/Transition";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

const Template = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const path = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={path}>
        <Transition />
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Template;
