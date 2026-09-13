"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const items = [
  { name: "Work", path: "/projects" },
  { name: "About", path: "/profile" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const path = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <nav aria-label="Main navigation" className="flex items-center gap-4 sm:gap-8">
      {items.map(item => (
        <Link key={item.path} href={item.path} aria-current={path.startsWith(item.path) ? "page" : undefined}
          className="studio-nav-link inline-flex min-h-11 items-center text-xs transition-colors hover:text-accent sm:text-sm">
          {item.name}
        </Link>
      ))}
      <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        aria-label="Toggle color theme" className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border transition-colors hover:border-accent hover:text-accent">
        {mounted && resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      </button>
    </nav>
  );
}
