"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useWorld } from "@/lib/world";
import { zoneIndexFor } from "@/data/zones";
import { projects } from "@/data/home/projects";
import type { ForestWorld } from "./forest/ForestWorld";

/* Mounts the three.js forest behind the page and keeps it in step with the
   app: route → zone, theme → time of day, scroll → a few steps forward,
   pointer → look around. The scene module is its own chunk. */
export default function ForestCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const worldRef = useRef<ForestWorld | null>(null);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  const { resolvedTheme } = useTheme();

  const setStatus = useWorld((s) => s.setStatus);
  const introKey = useWorld((s) => s.introKey);
  const flareKey = useWorld((s) => s.flareKey);
  const focusSlug = useWorld((s) => s.focusSlug);

  // Latest values for the async boot to read without re-running it.
  const live = useRef({ pathname, theme: resolvedTheme });
  live.current = { pathname, theme: resolvedTheme };

  useEffect(() => {
    let cancelled = false;
    let world: ForestWorld | null = null;
    const canvas = canvasRef.current!;
    setStatus("loading", 15);

    const boot = async () => {
      const { ForestWorld } = await import("./forest/ForestWorld");
      if (cancelled) return;
      setStatus("loading", 60);
      // Let the progress paint before the (synchronous) world build.
      await new Promise((r) => requestAnimationFrame(() => r(null)));
      if (cancelled) return;
      const mobile = window.matchMedia("(max-width: 767px), (pointer: coarse)").matches;
      try {
        world = new ForestWorld(
          canvas,
          {
            theme: live.current.theme === "light" ? "light" : "dark",
            zone: zoneIndexFor(live.current.pathname),
            projectCount: projects.length,
            aerial: useWorld.getState().gateOpen,
            reducedMotion: window.matchMedia("(prefers-reduced-motion: reduce)").matches,
            mobile,
          },
          () => {
            if (cancelled) return;
            setStatus("ready", 100);
            setReady(true);
          },
        );
      } catch {
        // No WebGL (or it was refused): the static forest stays up.
        setStatus("failed", 0);
        return;
      }
      setStatus("loading", 85);
      worldRef.current = world;
      const syncShift = () =>
        world?.setViewShift(window.innerWidth >= 1024 ? 150 : 0);
      syncShift();
      onScroll();
      window.addEventListener("resize", syncShift);
      cleanupShift = () => window.removeEventListener("resize", syncShift);
    };

    let cleanupShift = () => {};
    const onResize = () => worldRef.current?.resize();
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      worldRef.current?.setScroll(max > 0 ? window.scrollY / max : 0);
    };
    const onPointer = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      worldRef.current?.setPointer(
        (e.clientX / window.innerWidth) * 2 - 1,
        (e.clientY / window.innerHeight) * 2 - 1,
      );
    };
    const onLost = (e: Event) => {
      e.preventDefault();
      setStatus("failed", 0);
    };

    boot();
    window.addEventListener("resize", onResize);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointer, { passive: true });
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      cancelled = true;
      cleanupShift();
      window.removeEventListener("resize", onResize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointer);
      canvas.removeEventListener("webglcontextlost", onLost);
      world?.dispose();
      worldRef.current = null;
      // A failure sticks, so the stage doesn't remount into the same error.
      if (useWorld.getState().status !== "failed") setStatus("idle", 0);
    };
  }, [setStatus]);

  useEffect(() => {
    worldRef.current?.setZone(zoneIndexFor(pathname));
    // New page, new scroll position.
    worldRef.current?.setScroll(0);
  }, [pathname, ready]);

  useEffect(() => {
    worldRef.current?.setTheme(resolvedTheme === "light" ? "light" : "dark");
  }, [resolvedTheme, ready]);

  useEffect(() => {
    if (introKey) worldRef.current?.playIntro();
  }, [introKey, ready]);

  useEffect(() => {
    if (flareKey) worldRef.current?.flare();
  }, [flareKey]);

  useEffect(() => {
    const i = projects.findIndex((p) => p.slug === focusSlug);
    worldRef.current?.setFocus(i);
  }, [focusSlug, ready]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={`forest-canvas ${ready ? "is-ready" : ""}`}
    />
  );
}
