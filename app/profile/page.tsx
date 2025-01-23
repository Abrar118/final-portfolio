import { Heading } from "@/components/ui/Heading";
import type { Metadata } from "next";
import About from "@/components/about/profileDetails";

export const metadata: Metadata = {
  title: "About | Abrar Mahir Esam",
  description:
    "Hi! I'm Abrar Mahir Esam. I specialize in building high-quality websites and applications.",
};

export default function Profile() {
  return (
    <main className="max-w-4xl w-full mx-auto py-20 px-4 md:px-10">
      <span className="text-4xl text-chart1">💬</span>
      <Heading className="text-foreground">About Me</Heading>
      <About />
    </main>
  );
}
