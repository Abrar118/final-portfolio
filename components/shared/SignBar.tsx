"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { ArrowUpRight, Moon, Sun } from "lucide-react";
import { lines, RESUME_URL, routes, type LineId } from "@/data/network";
import { useNetwork } from "@/lib/network-store";

const isActive = (pathname: string, path: string) =>
  path === "/" ? pathname === "/" : pathname.startsWith(path);

/* The sign along the top of every page, and on phones a dock along the bottom.
   Keys: 1–4 change page, a line's letter lights that line. */
export default function SignBar() {
  const pathname = usePathname();
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const toggleLine = useNetwork((s) => s.toggleLine);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const el = e.target as HTMLElement;
      if (el.closest?.("input, textarea, select, [contenteditable], [role=dialog]")) return;
      const route = routes.find((r) => r.hotkey === e.key);
      if (route) {
        router.push(route.path);
        return;
      }
      const letter = e.key.toUpperCase();
      if (lines.some((l) => l.id === letter)) toggleLine(letter as LineId);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, toggleLine]);

  // The server can't know the stored theme, so the icon waits for the client.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  return (
    <>
      <header className="signbar">
        <Link href="/" className="signbar-name">
          Abrar Mahir Esam
        </Link>
        <nav className="signbar-nav" aria-label="Main">
          {routes.map((r) => (
            <Link
              key={r.path}
              href={r.path}
              aria-current={isActive(pathname, r.path) ? "page" : undefined}
              className="signbar-link"
            >
              <kbd aria-hidden="true">{r.hotkey}</kbd>
              {r.label}
            </Link>
          ))}
        </nav>
        <div className="signbar-tools">
          <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="signbar-link">
            Résumé <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </a>
          <button
            type="button"
            className="signbar-icon"
            aria-label={dark ? "Switch to the light theme" : "Switch to the dark theme"}
            title={dark ? "Switch to the light theme" : "Switch to the dark theme"}
            onClick={() => setTheme(dark ? "light" : "dark")}
          >
            {dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>
      </header>

      <nav className="dock" aria-label="Main, mobile">
        {routes.map((r) => (
          <Link
            key={r.path}
            href={r.path}
            aria-current={isActive(pathname, r.path) ? "page" : undefined}
            className="dock-link"
          >
            {r.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
