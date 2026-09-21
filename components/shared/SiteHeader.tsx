import Link from "next/link";
import Navbar from "./Navbar";

export default function SiteHeader() {
  return (
    <header className="site-header">
      <div className="glass-panel flex items-center justify-between gap-2 px-3 py-2 md:px-5">
        <Link href="/" aria-label="Abrar Mahir Esam — home" className="flex min-h-11 items-center gap-3 pl-1">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-foreground text-xl font-medium tracking-tighter text-background">a.</span>
          <span className="hidden text-sm font-medium sm:block">Abrar Mahir Esam<span className="mt-0.5 block text-[11px] font-normal text-muted-foreground">Software engineer</span></span>
        </Link>
        <Navbar />
      </div>
    </header>
  );
}
