import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { socialMedia } from "@/data/home/socials";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 pb-6 pt-14 md:px-12 md:pt-20">
        <p className="mb-5 font-mono text-xs text-muted-foreground">Have an interesting problem?</p>
        <Link href="/contact" className="group flex items-center justify-between gap-6 border-b border-border pb-10 font-heading text-[clamp(3rem,7vw,7rem)] leading-none tracking-tight">
          Let’s make it happen.<ArrowUpRight className="h-10 w-10 shrink-0 text-accent md:h-20 md:w-20" />
        </Link>
        <div className="flex flex-wrap items-center justify-between gap-6 py-6">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Abrar Mahir Esam · Built in Dhaka</p>
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            {socialMedia.filter(s => ["GitHub", "LinkedIn", "Codeforces"].includes(s.label)).map(s => (
              <a key={s.id} href={s.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-xs hover:text-accent">{s.label}<ArrowUpRight className="h-3 w-3" /></a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
