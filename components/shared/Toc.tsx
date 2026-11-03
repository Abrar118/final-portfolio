"use client";

import { useEffect, useMemo, useState } from "react";
import type { TocItem } from "@/lib/toc";

/* "On this page": a tree of the page's headings. The one being read is marked
   as you scroll. `inline` is the collapsible version for narrow screens. */
export default function Toc({ items, inline = false }: { items: TocItem[]; inline?: boolean }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    if (inline) return;
    const els = items
      .map((i) => [i.id, document.getElementById(i.id)] as const)
      .filter((e): e is readonly [string, HTMLElement] => !!e[1]);
    if (!els.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.35;
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      // The current section is the last one whose top has passed the line.
      let current = els[0][0];
      for (const [id, el] of els) if (el.getBoundingClientRect().top <= line) current = id;
      setActive(atEnd ? els[els.length - 1][0] : current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [items, inline]);

  // Level-3 items hang under the level-2 item before them.
  const tree = useMemo(() => {
    const out: { item: TocItem; children: TocItem[] }[] = [];
    for (const item of items) {
      if (item.level === 3 && out.length) out[out.length - 1].children.push(item);
      else out.push({ item, children: [] });
    }
    return out;
  }, [items]);

  if (items.length < 2) return null;

  const list = (
    <ol>
      {tree.map(({ item, children }) => (
        <li key={item.id}>
          <a href={`#${item.id}`} aria-current={active === item.id ? "true" : undefined}>
            {item.label}
          </a>
          {children.length > 0 && (
            <ol>
              {children.map((c) => (
                <li key={c.id}>
                  <a href={`#${c.id}`} aria-current={active === c.id ? "true" : undefined}>
                    {c.label}
                  </a>
                </li>
              ))}
            </ol>
          )}
        </li>
      ))}
    </ol>
  );

  if (inline)
    return (
      <details className="toc toc-inline">
        <summary>On this page</summary>
        <nav aria-label="On this page, mobile">{list}</nav>
      </details>
    );

  return (
    <nav className="toc" aria-label="On this page">
      <p className="toc-title">On this page</p>
      {list}
    </nav>
  );
}
