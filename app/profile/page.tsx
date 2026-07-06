import type { Metadata } from "next";
import About from "@/components/about/profileDetails";

export const metadata: Metadata = {
  title: "The Chronicle | Abrar Mahir Esam",
  description:
    "The life, studies, and service of Abrar Mahir Esam — software engineer and competitive programmer.",
};

export default function Profile() {
  return (
    <main className="max-w-4xl w-full mx-auto py-16 px-4 md:px-10 pb-32">
      <About />
    </main>
  );
}
