import type { StaticImageData } from "next/image";

export type ProjectCategory = "web" | "mobile" | "desktop" | "backend";

export type Project = {
  title: string;
  description: string;
  thumbnail: StaticImageData | string;
  images: (StaticImageData | string)[];
  href?: string;
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
};
