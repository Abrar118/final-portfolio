import { create } from "zustand";
// import { devtools, persist } from "zustand/middleware";

interface ParticleState {
  showParticles: boolean;
  toggleParticles: () => void;
}

export const useParticleStore = create<ParticleState>()((set) => ({
  showParticles: false,
  toggleParticles: () =>
    set((state) => ({ showParticles: !state.showParticles })),
}));
