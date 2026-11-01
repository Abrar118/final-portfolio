import type { LineId } from "@/data/network";

/** CSS variables that paint an element in one line's colour. */
export const lineVars = (id: LineId) =>
  ({ "--line": `var(--line-${id})`, "--line-ink": `var(--line-${id}-ink)` }) as React.CSSProperties;
