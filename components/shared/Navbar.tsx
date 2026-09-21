"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const items = [{ name: "Work", path: "/projects" }, { name: "About", path: "/profile" }, { name: "Contact", path: "/contact" }];

export default function Navbar() {
  const path = usePathname();
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return (
    <nav aria-label="Main navigation" className="flex items-center gap-0.5 sm:gap-1">
      {items.map(item => (
        <Link key={item.path} href={item.path} aria-current={path.startsWith(item.path) ? "page" : undefined} className="nav-link">{item.name}</Link>
      ))}
      <span aria-hidden="true" className="mx-1 h-5 w-px bg-border sm:mx-3" />
      <button type="button" onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")} aria-label="Toggle color theme" className="inline-flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground">
        {mounted && resolvedTheme === "dark" ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
      </button>
    </nav>
  );
}
