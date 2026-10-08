import type { ProjectCategory } from "@/types/project";

export const categoryLabel: Record<ProjectCategory, string> = {
  web: "Web",
  mobile: "Mobile",
  desktop: "Desktop",
  backend: "Backend",
};

export const toRoman = (n: number): string => {
  const table: [number, string][] = [
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let out = "";
  for (const [v, s] of table) {
    while (n >= v) {
      out += s;
      n -= v;
    }
  }
  return out;
};
