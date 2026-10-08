/** Two times of day for the same forest. Dusk (dark theme) is a teal night
    lit by chartreuse spirit-light and an aurora; dawn (light theme) is a pale
    misty morning. Everything the scene colors comes from here. */
export type ForestPalette = {
  skyTop: string;
  skyHorizon: string;
  skyGlow: string;
  moon: string;
  aurora: number;
  auroraA: string;
  auroraB: string;
  fog: string;
  fogDensity: number;
  hemiSky: string;
  hemiGround: string;
  hemiIntensity: number;
  sun: string;
  sunIntensity: number;
  ground: [string, string];
  path: string;
  foliage: string[];
  bark: string;
  rock: string;
  mountain: string;
  glowA: string;
  glowB: string;
  glowOpacity: number;
  stars: number;
  rays: number;
};

export const dusk: ForestPalette = {
  skyTop: "#020c0b",
  skyHorizon: "#0f3d36",
  skyGlow: "#5fd6b8",
  moon: "#eef8d0",
  aurora: 1,
  auroraA: "#2ee6c1",
  auroraB: "#b8f03a",
  fog: "#0c342e",
  fogDensity: 0.0145,
  hemiSky: "#57b8a4",
  hemiGround: "#0a1810",
  hemiIntensity: 1.4,
  sun: "#d6f2b8",
  sunIntensity: 1.2,
  ground: ["#123323", "#1b4a2a"],
  path: "#5c8a52",
  foliage: ["#1a472c", "#215a36", "#2a663a", "#174d45", "#3f7a24", "#1d533c"],
  bark: "#2b2218",
  rock: "#3a4a42",
  mountain: "#0b2722",
  glowA: "#c4f53a",
  glowB: "#3df0cf",
  glowOpacity: 1,
  stars: 0.9,
  rays: 0.55,
};

export const dawn: ForestPalette = {
  skyTop: "#6fc3b8",
  skyHorizon: "#e8f3c8",
  skyGlow: "#fff6c8",
  moon: "#fffbe6",
  aurora: 0,
  auroraA: "#2ee6c1",
  auroraB: "#b8f03a",
  fog: "#d3e6c4",
  fogDensity: 0.0115,
  hemiSky: "#e9f7d8",
  hemiGround: "#4c6b34",
  hemiIntensity: 1.6,
  sun: "#fff3c4",
  sunIntensity: 1.9,
  ground: ["#5d8a3a", "#78a443"],
  path: "#c2b48a",
  foliage: ["#2f6b3a", "#3f7f3c", "#4f8f2f", "#2a6b5e", "#6a9a2a", "#357a4a"],
  bark: "#5a4632",
  rock: "#8a9a88",
  mountain: "#9cc2a8",
  glowA: "#a8d61e",
  glowB: "#14b8a0",
  glowOpacity: 0.7,
  stars: 0,
  rays: 0.35,
};
