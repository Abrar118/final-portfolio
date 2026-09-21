import type { Metadata } from "next";
import About from "@/components/about/profileDetails";

export const metadata: Metadata = {
  title: "About | Abrar Mahir Esam",
  description:
    "The life, studies, and service of Abrar Mahir Esam — software engineer and competitive programmer.",
};

export default function Profile() {
  return (
    <main className="page-shell">
      <About />
    </main>
  );
}
