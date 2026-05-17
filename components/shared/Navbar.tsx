"use client";

import { Home, User, FolderOpen, Mail, Moon, Sun } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/profile", icon: User },
  { name: "Projects", path: "/projects", icon: FolderOpen },
  { name: "Contact", path: "/contact", icon: Mail },
];

const Navbar = () => {
  const pathname = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.4, ease: "easeOut" }}
        className="flex items-center gap-1 px-3 py-2 rounded-full
          bg-card/80 backdrop-blur-xl border border-border/50
          shadow-lg shadow-violet-950/20"
      >
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={cn(
                  "relative flex items-center gap-2 px-4 py-2.5 rounded-full transition-all duration-200",
                  isActive
                    ? "text-accent-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-accent rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                  />
                )}
                <Icon className="relative z-10 h-4 w-4" />
                <span
                  className={cn(
                    "relative z-10 text-sm font-medium hidden sm:block",
                    isActive ? "font-semibold" : ""
                  )}
                >
                  {item.name}
                </span>
              </div>
            </Link>
          );
        })}

        <div className="w-px h-6 bg-border/50 mx-1" />

        <button
          onClick={() =>
            setTheme(resolvedTheme === "dark" ? "light" : "dark")
          }
          className="p-2.5 rounded-full text-muted-foreground hover:text-foreground
            hover:bg-muted/50 transition-colors duration-200"
          aria-label="Toggle theme"
        >
          {mounted && resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>
      </motion.div>
    </nav>
  );
};

export default Navbar;
