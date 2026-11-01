import type { StaticImageData } from "next/image";

export type ProjectCategory = "web" | "mobile" | "desktop" | "backend";

export type Project = {
  title: string;
  description: string;
  /** Absent for work with nothing public to show. */
  thumbnail?: StaticImageData | string;
  images: (StaticImageData | string)[];
  href?: string;
  /** Further links beside the live site and source. */
  links?: { label: string; href: string }[];
  slug?: string;
  stack?: {
    name: string;
    Icon: React.ReactNode;
  }[];
  content?: React.ReactNode | string;
  features?: string[];
  github?: string;
  tags?: string[];
  pages?: string[];
  category?: ProjectCategory;
  year?: string;
  context?: string;
  /** Decimal year on the map, when `year` alone would misplace it. */
  at?: number;
  /** Network lines, when the stack alone does not say. */
  lines?: string[];
};
