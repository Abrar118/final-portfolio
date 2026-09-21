/** Per-project accent hues ("H S%" triples for hsl()). Each project gets its
    own color so cards feel lively against the neutral black/grey glass. */
export const projectAccents: Record<string, string> = {
  astryn: "262 85%",        // violet
  nudge: "172 75%",         // teal
  crimelens: "350 82%",     // rose
  quickdev: "38 95%",       // amber
  eduverse: "205 90%",      // sky
  acpscm: "235 80%",        // indigo
  greencycle: "145 65%",    // green
  spendsplit: "190 85%",    // cyan
  "mist-pioneers": "25 92%",// orange
  elyria: "300 75%",        // fuchsia
  "resource-hub": "220 88%",// blue
  "bank-system": "215 50%", // steel
  "prompt-finder": "330 82%",// pink
  "sniff-n-paws": "12 85%", // coral
};

export const DEFAULT_ACCENT = "262 85%";

export const accentFor = (slug?: string | null): string =>
  (slug && projectAccents[slug]) || DEFAULT_ACCENT;
