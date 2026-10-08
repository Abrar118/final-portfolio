"use client";

import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { skillsTabs } from "@/data/home/skillsTab";

const bagNames: Record<string, string> = {
  "web-development": "Web",
  "mobile-development": "Mobile",
  "software-and-systems": "Systems",
  databases: "Data",
};

/* Skills as a game inventory: one bag per discipline, each tool an item
   slot glowing in its own brand color. */
export default function Inventory() {
  const [active, setActive] = useState(0);
  const bag = skillsTabs[active];

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    let next = active;
    if (e.key === "ArrowRight") next = (active + 1) % skillsTabs.length;
    else if (e.key === "ArrowLeft") next = (active - 1 + skillsTabs.length) % skillsTabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = skillsTabs.length - 1;
    else return;
    e.preventDefault();
    setActive(next);
    e.currentTarget.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus();
  };

  return (
    <section id="inventory" className="page-wrap section" aria-labelledby="inventory-title">
      <div className="section-head">
        <div>
          <p className="hud-label">Skills &amp; tools</p>
          <h2 id="inventory-title" className="section-title">
            The Inventory
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-6 text-muted-foreground">
          Everything I carry on the trail. The tools change; the curiosity
          stays.
        </p>
      </div>

      <div className="glass inventory">
        <div role="tablist" aria-label="Skill bags" className="bag-tabs" onKeyDown={onKey}>
          {skillsTabs.map((t, i) => (
            <button
              key={t.value}
              role="tab"
              id={`bag-${t.value}`}
              aria-selected={i === active}
              aria-controls="bag-panel"
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className="bag-tab"
            >
              {bagNames[t.value] ?? t.title}
              <span className="bag-count">{t.contents.length}</span>
            </button>
          ))}
        </div>

        <div
          id="bag-panel"
          role="tabpanel"
          aria-labelledby={`bag-${bag.value}`}
          className="bag-panel"
        >
          <p className="sr-only">{bag.title}</p>
          <ul key={bag.value} className="slots">
            {bag.contents.map((item, i) => {
              const Icon = item.img;
              const white = /^#fff(f{3})?$/i.test(item.iconColor);
              return (
                <li
                  key={item.name}
                  className="slot"
                  style={
                    {
                      "--slot-color": white ? "hsl(var(--foreground))" : item.iconColor,
                      animationDelay: `${i * 35}ms`,
                    } as CSSProperties
                  }
                >
                  <span className="slot-icon" aria-hidden="true">
                    <Icon size={26} />
                  </span>
                  <span className="slot-name">{item.name}</span>
                  <span className="slot-desc">{item.desc}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
