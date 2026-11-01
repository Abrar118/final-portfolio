import type { Metadata } from "next";
import About from "@/components/about/profileDetails";

export const metadata: Metadata = {
  title: "About | Abrar Mahir Esam",
  description:
    "Career, research and contest record of Abrar Mahir Esam, a full-stack software engineer and competitive programmer.",
};

export default function Profile() {
  return <About />;
}
