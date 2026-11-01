"use client";

import { useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Bullet, LinePicker } from "@/components/network/parts";
import { categoryLabel, projectStops } from "@/data/network";
import { useNetwork } from "@/lib/network-store";

/* Work index: the list on one side, the live map on the other. Pointing at a
   row lifts its station and turns the camera toward it. */
export default function ProjectsPage() {
  const activeLine = useNetwork((s) => s.activeLine);
  const focusId = useNetwork((s) => s.focusId);
  const setFocus = useNetwork((s) => s.setFocus);
  const setInsets = useNetwork((s) => s.setInsets);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const measure = () => {
      const wide = window.innerWidth >= 1024;
      setInsets({
        top: 56,
        right: 0,
        left: wide ? (listRef.current?.getBoundingClientRect().right ?? 0) : 0,
        bottom: wide ? 0 : window.innerHeight * 0.52,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [setInsets]);

  const shown = useMemo(
    () => projectStops.filter((s) => !activeLine || s.lines.includes(activeLine)),
    [activeLine],
  );

  return (
    <main className="work">
      <div className="work-list" ref={listRef}>
        <header className="work-head">
          <h1 className="page-title">Work</h1>
          <p className="work-lede">
            {projectStops.length} projects on the network: shipped products, hackathon builds and tools. Choose a line to filter them.
          </p>
          <LinePicker showHelp={false} />
        </header>

        {shown.length === 0 && <p className="work-empty">No projects on this line yet. Its stops are jobs and research.</p>}

        <ul className="work-rows">
              {shown.map((s) => {
                const p = s.project!;
                return (
                  <li key={s.id} className={`work-row ${focusId === s.id ? "is-focus" : ""}`}>
                    <Link
                      href={s.href}
                      className="work-link"
                      onPointerEnter={() => setFocus(s.id)}
                      onPointerLeave={() => setFocus(null)}
                      onFocus={() => setFocus(s.id)}
                      onBlur={() => setFocus(null)}
                    >
                      <span className="work-title">{p.title}</span>
                      <span className="work-bullets">
                        {s.lines.map((l) => (
                          <Bullet key={l} id={l} size="sm" />
                        ))}
                      </span>
                      <span className="work-desc">{p.description}</span>
                      <span className="work-meta">
                        <span className="data">{p.year}</span>{" "}
                        {p.category ? categoryLabel[p.category] : "Project"}
                        {p.context ? `. ${p.context.split(" · ")[0]}` : ""}
                      </span>
                      <span className="work-view">
                        View project <ArrowRight className="h-4 w-4" aria-hidden="true" />
                      </span>
                    </Link>
                    {(p.href || p.github) && (
                      <span className="work-out">
                        {p.href && (
                          <a href={p.href} target="_blank" rel="noopener noreferrer" aria-label={`${p.title}, live site`}>
                            Live <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        )}
                        {p.github && (
                          <a href={p.github} target="_blank" rel="noopener noreferrer" aria-label={`${p.title}, source code`}>
                            Source <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </a>
                        )}
                      </span>
                    )}
                  </li>
                );
              })}
        </ul>
      </div>
    </main>
  );
}
