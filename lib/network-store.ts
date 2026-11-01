import { create } from "zustand";
import type { LineId } from "@/data/network";

export type MapMode = "3d" | "flat";
export type SceneStatus = "idle" | "loading" | "ready" | "failed";
export type Insets = { top: number; right: number; bottom: number; left: number };

const MODE_KEY = "network-map-mode";

const safe = <T,>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

type NetworkState = {
  booted: boolean;
  mode: MapMode;
  status: SceneStatus;
  /** The line chosen with a bullet: it rises, the rest drain. */
  activeLine: LineId | null;
  /** The stop being pointed at or read: it lifts and shows its ticket. */
  focusId: string | null;
  /** Screen space the map must stay clear of (nav, sign, list). */
  insets: Insets;
  /** Bumped when a message is sent: a train runs to the Next stop. */
  dispatchKey: number;
  boot: () => void;
  setMode: (mode: MapMode) => void;
  setStatus: (status: SceneStatus) => void;
  toggleLine: (line: LineId) => void;
  setActiveLine: (line: LineId | null) => void;
  setFocus: (id: string | null) => void;
  setInsets: (insets: Partial<Insets>) => void;
  dispatch: () => void;
};

export const useNetwork = create<NetworkState>()((set, get) => ({
  booted: false,
  mode: "3d",
  status: "idle",
  activeLine: null,
  focusId: null,
  insets: { top: 56, right: 0, bottom: 0, left: 0 },
  dispatchKey: 0,

  boot: () => {
    if (get().booted) return;
    const saved = safe(() => localStorage.getItem(MODE_KEY), null);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const preferFlat =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches || connection?.saveData === true;
    const mode: MapMode = saved === "3d" || saved === "flat" ? saved : preferFlat ? "flat" : "3d";
    set({ booted: true, mode });
  },

  setMode: (mode) => {
    safe(() => localStorage.setItem(MODE_KEY, mode), undefined);
    set((s) => ({ mode, status: s.status === "failed" ? "idle" : s.status }));
  },
  setStatus: (status) => set({ status }),
  toggleLine: (line) => set((s) => ({ activeLine: s.activeLine === line ? null : line })),
  setActiveLine: (activeLine) => set({ activeLine }),
  setFocus: (focusId) => set({ focusId }),
  setInsets: (insets) => set((s) => ({ insets: { ...s.insets, ...insets } })),
  dispatch: () => set((s) => ({ dispatchKey: s.dispatchKey + 1 })),
}));
