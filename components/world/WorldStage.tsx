"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useWorld } from "@/lib/world";
import { zones, zoneIndexFor } from "@/data/zones";
import StaticForest from "./StaticForest";

const ForestCanvas = dynamic(() => import("./ForestCanvas"), { ssr: false });

/* The fixed world behind every page. The static forest paints immediately;
   the 3D forest (when chosen) loads in idle time — or right away while the
   title screen is up — and fades in over it. */
export default function WorldStage() {
  const booted = useWorld((s) => s.booted);
  const mode = useWorld((s) => s.mode);
  const gateOpen = useWorld((s) => s.gateOpen);
  const status = useWorld((s) => s.status);
  const boot = useWorld((s) => s.boot);
  const pathname = usePathname();
  const [load3d, setLoad3d] = useState(false);

  useEffect(() => boot(), [boot]);

  useEffect(() => {
    if (!booted || mode !== "3d") {
      setLoad3d(false);
      return;
    }
    if (gateOpen) {
      setLoad3d(true);
      return;
    }
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, o?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(() => setLoad3d(true), { timeout: 1500 });
      return () => w.cancelIdleCallback?.(id);
    }
    const t = setTimeout(() => setLoad3d(true), 600);
    return () => clearTimeout(t);
  }, [booted, mode, gateOpen]);

  const zone = zones[zoneIndexFor(pathname)].id;
  const live = load3d && status !== "failed";

  return (
    <div className="world-stage" data-zone={zone} aria-hidden="true">
      <StaticForest />
      {live && <ForestCanvas />}
      <div className="world-scrim" />
    </div>
  );
}
