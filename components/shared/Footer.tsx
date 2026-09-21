import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { socialMedia } from "@/data/home/socials";

export default function Footer() {
  return (
    <footer className="mx-auto max-w-7xl px-6 pt-8 md:px-12">
      <div className="flex flex-wrap items-center justify-between gap-8 border-y border-border/70 py-12 md:py-16">
        <div><p className="mb-3 text-sm text-muted-foreground">Have something in mind?</p><h2 className="section-title">Let’s build something good.</h2></div>
        <Link href="/contact" className="glass-button glass-button-primary">Let’s talk <ArrowUpRight className="h-4 w-4" /></Link>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 py-6">
        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Abrar Mahir Esam · Made in Dhaka</p>
        <div className="flex gap-5">{socialMedia.filter(s => ["GitHub", "LinkedIn", "Codeforces"].includes(s.label)).map(s => (
          <a key={s.id} href={s.link} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-1 text-xs text-muted-foreground hover:text-accent">{s.label}<ArrowUpRight className="h-3 w-3" /></a>
        ))}</div>
      </div>
    </footer>
  );
}
