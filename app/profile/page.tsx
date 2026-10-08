import type { Metadata } from "next";
import About from "@/components/about/profileDetails";

export const metadata: Metadata = {
  title: "The Lore | Abrar Mahir Esam",
  description:
    "The story, path and achievements of Abrar Mahir Esam — software engineer and competitive programmer.",
};

export default function Profile() {
  return (
    <main className="page-wrap page-top">
      <About />
    </main>
  );
}
