"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useWorld } from "@/lib/world";
import { zones, zoneIndexFor, type Zone } from "@/data/zones";

/* "Entering: The Elder Grove" — the area title card games show when you
   cross into a new region. Decorative: each page has its own heading. */
export default function ZoneBanner() {
  const pathname = usePathname();
  const booted = useWorld((s) => s.booted);
  const gateOpen = useWorld((s) => s.gateOpen);
  const visit = useWorld((s) => s.visit);
  const [card, setCard] = useState<{ zone: Zone; fresh: boolean; key: number } | null>(null);
  const lastZone = useRef<string | null>(null);

  useEffect(() => {
    if (!booted || gateOpen) return;
    const zone = zones[zoneIndexFor(pathname)];
    if (lastZone.current === zone.id) return;
    lastZone.current = zone.id;
    const fresh = visit(zone.id);
    setCard({ zone, fresh, key: Date.now() });
  }, [pathname, booted, gateOpen, visit]);

  useEffect(() => {
    if (!card) return;
    const t = setTimeout(() => setCard(null), 2900);
    return () => clearTimeout(t);
  }, [card]);

  return (
    <div className="zone-banner-wrap" aria-hidden="true">
      <AnimatePresence>
        {card && (
          <motion.div
            key={card.key}
            className="zone-banner"
            initial={{ opacity: 0, y: -10, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -6, filter: "blur(6px)" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <p className="zone-banner-kicker">
              {card.fresh ? "New area discovered" : `Chapter ${card.zone.chapter}`}
            </p>
            <p className="zone-banner-title">{card.zone.place}</p>
            <span className="zone-banner-rule" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
