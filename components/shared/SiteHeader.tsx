import Link from "next/link";
import Navbar from "./Navbar";

export default function SiteHeader() {
  return (
    <header className="relative z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 border-b border-border px-6 py-5 md:px-12">
        <Link href="/" aria-label="Abrar Mahir Esam — home" className="group flex min-h-11 items-center gap-3">
          <span className="font-heading text-3xl italic leading-none text-accent">a.</span>
          <span className="hidden text-sm font-medium sm:block">Abrar Mahir Esam</span>
        </Link>
        <Navbar />
      </div>
    </header>
  );
}
