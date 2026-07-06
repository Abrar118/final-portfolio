"use client";

import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";

/* A gilded stroke along the top edge: trickles while a route loads,
   completes when the new page renders. No dependencies — internal link
   clicks start it, the pathname change finishes it. */
export default function RouteProgress() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const running = useRef(false);
  const trickle = useRef<ReturnType<typeof setInterval> | null>(null);
  const safety = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimers = () => {
    if (trickle.current) clearInterval(trickle.current);
    if (safety.current) clearTimeout(safety.current);
    trickle.current = null;
    safety.current = null;
  };

  const complete = useCallback(() => {
    if (!running.current) return;
    running.current = false;
    clearTimers();
    setProgress(100);
    setTimeout(() => {
      setVisible(false);
      setTimeout(() => setProgress(0), 300);
    }, 350);
  }, []);

  const start = useCallback(() => {
    if (running.current) return;
    running.current = true;
    clearTimers();
    setVisible(true);
    setProgress(14);
    trickle.current = setInterval(() => {
      setProgress((p) => Math.min(p + Math.max((88 - p) * 0.1, 0.5), 90));
    }, 180);
    safety.current = setTimeout(complete, 6000);
  }, [complete]);

  // The new route has rendered — seal the stroke.
  useEffect(() => {
    complete();
  }, [pathname, complete]);

  // First visit: a quick flourish as the page comes alive.
  useEffect(() => {
    running.current = true;
    setVisible(true);
    setProgress(45);
    const t = setTimeout(complete, 450);
    return () => clearTimeout(t);
  }, [complete]);

  // Internal navigation begins on link click.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        e.defaultPrevented ||
        e.button !== 0 ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      )
        return;
      const anchor = (e.target as HTMLElement)?.closest?.("a");
      if (!anchor) return;
      if (anchor.target && anchor.target !== "_self") return;
      if (anchor.hasAttribute("download")) return;
      const href = anchor.getAttribute("href");
      if (!href || !href.startsWith("/")) return;
      if (/\.[a-z0-9]+$/i.test(href)) return; // static files (pdf, images)
      const url = new URL(anchor.href);
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      )
        return;
      start();
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [start]);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-[120]"
    >
      <div
        className={`transition-opacity duration-300 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
      >
        <div
          className="relative h-[3px] animate-shimmer motion-reduce:animate-none"
          style={{
            width: `${progress}%`,
            transition: "width 0.25s ease",
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--gild-1)), hsl(var(--gild-2)), hsl(var(--gild-1)), hsl(var(--gild-2)))",
            backgroundSize: "200% 100%",
            boxShadow: "0 0 8px hsl(var(--gold) / 0.55)",
          }}
        >
          {/* The quill nib at the stroke's leading edge */}
          <span
            className="absolute -right-1 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rotate-45 bg-gold"
            style={{ boxShadow: "0 0 10px 2px hsl(var(--gold) / 0.6)" }}
          />
        </div>
      </div>
    </div>
  );
}
