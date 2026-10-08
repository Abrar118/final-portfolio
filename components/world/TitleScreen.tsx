"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useWorld, type WorldMode } from "@/lib/world";

/* The "press start" screen. Shown once per session when landing on the home
   page; the 3D forest loads behind it during the flyover, and choosing a path
   swoops the camera down onto the trail. */
export default function TitleScreen() {
  const pathname = usePathname();
  const booted = useWorld((s) => s.booted);
  const gateOpen = useWorld((s) => s.gateOpen);
  const mode = useWorld((s) => s.mode);
  const status = useWorld((s) => s.status);
  const progress = useWorld((s) => s.progress);
  const enter = useWorld((s) => s.enter);
  const beginRef = useRef<HTMLButtonElement>(null);

  // Before boot the inline script (via html[data-gate]) decides visibility.
  const open = pathname === "/" && (!booted || gateOpen);
  // Return visitors never saw it: unmount without playing the exit.
  const shown = useRef(false);
  if (booted && open) shown.current = true;

  useEffect(() => {
    const shell = document.getElementById("app-shell");
    if (!booted) return;
    if (open) {
      shell?.setAttribute("inert", "");
      beginRef.current?.focus();
    } else {
      shell?.removeAttribute("inert");
    }
    return () => shell?.removeAttribute("inert");
  }, [open, booted]);

  useEffect(() => {
    if (!open || !booted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        enter(mode);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, booted, enter, mode]);

  const choose = (m: WorldMode) => enter(m);

  const onMenuKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const buttons = Array.from(e.currentTarget.querySelectorAll("button"));
    const i = buttons.indexOf(document.activeElement as HTMLButtonElement);
    const next = (i + (e.key === "ArrowDown" ? 1 : -1) + buttons.length) % buttons.length;
    buttons[next]?.focus();
  };

  const loading = mode === "3d" && status !== "ready" && status !== "failed";
  const pct = status === "ready" ? 100 : Math.max(progress, 6);

  if (booted && !shown.current) return null;

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="title"
          className={`title-screen ${booted ? "" : "is-preboot"}`}
          role="dialog"
          aria-modal="true"
          aria-labelledby="title-name"
          aria-describedby="title-sub"
          initial={false}
          exit={{ opacity: 0, scale: 1.04, filter: "blur(6px)" }}
          transition={{ duration: 0.9, ease: [0.6, 0, 0.3, 1] }}
        >
          <div className="title-vignette" aria-hidden="true" />
          <div className="title-inner">
            <p className="title-kicker">
              <span aria-hidden="true" className="title-rule" />
              A portfolio in four chapters
              <span aria-hidden="true" className="title-rule" />
            </p>
            <p id="title-name" className="title-name">
              Abrar <span>Mahir</span> Esam
            </p>
            <p id="title-sub" className="title-sub">
              and the Forest of Code
            </p>

            <div className="title-menu" onKeyDown={onMenuKey}>
              <button
                ref={beginRef}
                type="button"
                className="title-option is-primary"
                onClick={() => choose("3d")}
              >
                <span className="title-caret" aria-hidden="true">
                  ▸
                </span>
                <span>
                  Begin the journey
                  <small>Explore the 3D forest</small>
                </span>
              </button>
              <button
                type="button"
                className="title-option"
                onClick={() => choose("static")}
              >
                <span className="title-caret" aria-hidden="true">
                  ▸
                </span>
                <span>
                  Take the quiet path
                  <small>Static &amp; lightweight</small>
                </span>
              </button>
            </div>

            <div
              className="title-loader"
              data-state={mode === "3d" ? status : "static"}
              role="status"
            >
              <div className="title-loader-bar" aria-hidden="true">
                <i style={{ width: `${mode === "3d" ? pct : 100}%` }} />
              </div>
              <span>
                {mode !== "3d"
                  ? "Quiet path selected — the forest will stay still"
                  : status === "failed"
                    ? "3D isn’t available here — the quiet path is ready"
                    : loading
                      ? `Growing the forest… ${Math.round(pct)}%`
                      : "The forest is awake"}
              </span>
            </div>

            <p className="title-hint">
              <kbd>Enter</kbd> to choose · <kbd>Esc</kbd> to skip · switch
              worlds anytime from the menu
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
