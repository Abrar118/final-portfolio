"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "next-themes";
import {
  ArrowUpRight,
  Flame,
  Gem,
  Moon,
  ScrollText,
  Settings2,
  Sun,
  Tent,
  X,
} from "lucide-react";
import { zones, zoneIndexFor, RESUME_URL } from "@/data/zones";
import { useWorld } from "@/lib/world";
import { socialMedia } from "@/data/home/socials";

const zoneIcons = {
  trailhead: Tent,
  grove: ScrollText,
  hollow: Gem,
  beacon: Flame,
} as const;

function WorldSettings() {
  const mode = useWorld((s) => s.mode);
  const setMode = useWorld((s) => s.setMode);
  const status = useWorld((s) => s.status);
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const theme = mounted ? resolvedTheme : undefined;

  return (
    <div className="menu-settings">
      <div className="seg-row">
        <span className="seg-label" id="world-label">
          World
        </span>
        <div className="seg" role="group" aria-labelledby="world-label">
          <button
            type="button"
            aria-pressed={mode === "3d"}
            onClick={() => setMode("3d")}
            title={status === "failed" ? "3D isn’t available on this device" : "Immersive 3D forest"}
          >
            3D
          </button>
          <button
            type="button"
            aria-pressed={mode === "static"}
            onClick={() => setMode("static")}
            title="Static, lightweight forest"
          >
            Static
          </button>
        </div>
      </div>
      <div className="seg-row">
        <span className="seg-label" id="time-label">
          Time
        </span>
        <div className="seg" role="group" aria-labelledby="time-label">
          <button
            type="button"
            aria-pressed={theme === "dark"}
            onClick={() => setTheme("dark")}
          >
            <Moon className="h-3.5 w-3.5" aria-hidden="true" /> Dusk
          </button>
          <button
            type="button"
            aria-pressed={theme === "light"}
            onClick={() => setTheme("light")}
          >
            <Sun className="h-3.5 w-3.5" aria-hidden="true" /> Dawn
          </button>
        </div>
      </div>
    </div>
  );
}

/* The game menu. Desktop: a pause-menu column pinned to the left — player
   card, chapters as horizontal bars with hotkeys, world settings. Mobile: a
   horizontal dock along the bottom with a settings sheet. */
export default function GameMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const active = zoneIndexFor(pathname);
  const visited = useWorld((s) => s.visited);
  const gateOpen = useWorld((s) => s.gateOpen);
  const [sheet, setSheet] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  // Number keys jump between chapters, like a game's quick-travel.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (gateOpen || e.metaKey || e.ctrlKey || e.altKey || e.repeat) return;
      const el = e.target as HTMLElement;
      if (el.closest("input, textarea, select, [contenteditable='true']")) return;
      const zone = zones.find((z) => z.hotkey === e.key);
      if (zone) router.push(zone.path);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [router, gateOpen]);

  useEffect(() => setSheet(false), [pathname]);

  useEffect(() => {
    if (!sheet) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setSheet(false);
    const onDown = (e: PointerEvent) => {
      if (!sheetRef.current?.contains(e.target as Node)) setSheet(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onDown);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onDown);
    };
  }, [sheet]);

  const explored = zones.filter((z) => visited.includes(z.id)).length;

  return (
    <>
      <aside className="game-menu" aria-label="Game menu">
        <div className="glass menu-shell">
          <Link href="/" className="player-card" aria-label="Abrar Mahir Esam — home">
            <span className="player-portrait">
              <Image src="/hero-portrait.jpg" alt="" width={52} height={52} />
            </span>
            <span className="min-w-0">
              <span className="player-name">Abrar Mahir Esam</span>
              <span className="player-class">Full-stack Engineer</span>
            </span>
          </Link>

          <div className="xp" aria-label={`Explored ${explored} of ${zones.length} areas`}>
            <div className="xp-head" aria-hidden="true">
              <span>Explored</span>
              <span>
                {explored}/{zones.length}
              </span>
            </div>
            <div className="xp-bar" aria-hidden="true">
              <i style={{ width: `${(explored / zones.length) * 100}%` }} />
            </div>
          </div>

          <nav aria-label="Main" className="mt-6">
            <ol className="menu-list">
              {zones.map((z, i) => {
                const Icon = zoneIcons[z.id];
                const current = i === active;
                return (
                  <li key={z.id}>
                    <Link
                      href={z.path}
                      aria-current={current ? "page" : undefined}
                      className="menu-item"
                      aria-keyshortcuts={z.hotkey}
                    >
                      <span className="menu-key" aria-hidden="true">
                        {z.hotkey}
                      </span>
                      <Icon className="menu-icon" aria-hidden="true" />
                      <span className="menu-text">
                        <span className="menu-label">{z.label}</span>
                        <span className="menu-place">{z.place}</span>
                      </span>
                      <span className="menu-chapter" aria-hidden="true">
                        {z.chapter}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="mt-auto pt-6">
            <WorldSettings />
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="menu-resume">
              View résumé <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
            <ul className="menu-socials">
              {socialMedia
                .filter((s) => ["GitHub", "LinkedIn", "Codeforces"].includes(s.label))
                .map((s) => (
                  <li key={s.id}>
                    <a href={s.link} target="_blank" rel="noopener noreferrer" aria-label={s.label}>
                      <s.img size={15} aria-hidden="true" />
                    </a>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </aside>

      <div className="game-dock-wrap" ref={sheetRef}>
        {sheet && (
          <div className="glass dock-sheet" id="dock-sheet">
            <div className="flex items-center justify-between">
              <p className="hud-label">Settings</p>
              <button type="button" className="icon-btn" onClick={() => setSheet(false)} aria-label="Close settings">
                <X className="h-4 w-4" />
              </button>
            </div>
            <WorldSettings />
            <a href={RESUME_URL} target="_blank" rel="noopener noreferrer" className="menu-resume">
              View résumé <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        )}
        <nav aria-label="Main" className="glass game-dock">
          {zones.map((z, i) => {
            const Icon = zoneIcons[z.id];
            return (
              <Link key={z.id} href={z.path} aria-current={i === active ? "page" : undefined} className="dock-item">
                <Icon className="h-5 w-5" aria-hidden="true" />
                <span>{z.label}</span>
              </Link>
            );
          })}
          <button
            type="button"
            className="dock-item"
            aria-expanded={sheet}
            aria-controls="dock-sheet"
            onClick={() => setSheet((s) => !s)}
          >
            <Settings2 className="h-5 w-5" aria-hidden="true" />
            <span>World</span>
          </button>
        </nav>
      </div>
    </>
  );
}
