import { create } from "zustand";

export type WorldMode = "3d" | "static";
export type SceneStatus = "idle" | "loading" | "ready" | "failed";

const MODE_KEY = "forest-world";
const ENTERED_KEY = "forest-entered";
const VISITED_KEY = "forest-visited";

/* Runs inline in <head> before first paint, so the title screen and the
   chosen world mode never flash on a return visit. Keep it tiny and in sync
   with the keys above. */
export const worldBootScript = `(function(){var d=document.documentElement;try{var m=localStorage.getItem("${MODE_KEY}");if(m!=="3d"&&m!=="static"){var c=navigator.connection;m=(matchMedia("(prefers-reduced-motion: reduce)").matches||(c&&c.saveData))?"static":"3d"}d.dataset.world=m;d.dataset.gate=location.pathname==="/"&&!sessionStorage.getItem("${ENTERED_KEY}")?"open":"closed"}catch(e){d.dataset.world="static";d.dataset.gate="closed"}})()`;

type WorldState = {
  /** False until the client has read the boot script's decisions. */
  booted: boolean;
  mode: WorldMode;
  gateOpen: boolean;
  /** Bumped when the player leaves the title screen — the camera swoops in. */
  introKey: number;
  status: SceneStatus;
  progress: number;
  /** Project the Crystal Hollow should light up. */
  focusSlug: string | null;
  /** Bumped when a message is sent — Beacon Hill flares. */
  flareKey: number;
  visited: string[];
  boot: () => void;
  setMode: (mode: WorldMode) => void;
  enter: (mode: WorldMode) => void;
  setStatus: (status: SceneStatus, progress?: number) => void;
  setFocusSlug: (slug: string | null) => void;
  flare: () => void;
  visit: (zoneId: string) => boolean;
};

const safe = <T,>(fn: () => T, fallback: T): T => {
  try {
    return fn();
  } catch {
    return fallback;
  }
};

export const useWorld = create<WorldState>()((set, get) => ({
  booted: false,
  mode: "3d",
  gateOpen: false,
  introKey: 0,
  status: "idle",
  progress: 0,
  focusSlug: null,
  flareKey: 0,
  visited: [],

  boot: () => {
    if (get().booted) return;
    const d = document.documentElement.dataset;
    const visited = safe<string[]>(
      () => JSON.parse(localStorage.getItem(VISITED_KEY) || "[]"),
      [],
    );
    set({
      booted: true,
      mode: d.world === "static" ? "static" : "3d",
      gateOpen: d.gate === "open",
      visited: Array.isArray(visited) ? visited : [],
    });
  },

  setMode: (mode) => {
    document.documentElement.dataset.world = mode;
    safe(() => localStorage.setItem(MODE_KEY, mode), undefined);
    set({ mode });
  },

  enter: (mode) => {
    document.documentElement.dataset.gate = "closed";
    safe(() => sessionStorage.setItem(ENTERED_KEY, "1"), undefined);
    get().setMode(mode);
    set((s) => ({ gateOpen: false, introKey: s.introKey + 1 }));
  },

  setStatus: (status, progress) =>
    set((s) => ({ status, progress: progress ?? s.progress })),

  setFocusSlug: (focusSlug) => set({ focusSlug }),

  flare: () => set((s) => ({ flareKey: s.flareKey + 1 })),

  /** Records a zone visit. Returns true the first time a zone is discovered. */
  visit: (zoneId) => {
    const { visited } = get();
    if (visited.includes(zoneId)) return false;
    const next = [...visited, zoneId];
    safe(() => localStorage.setItem(VISITED_KEY, JSON.stringify(next)), undefined);
    set({ visited: next });
    return true;
  },
}));
