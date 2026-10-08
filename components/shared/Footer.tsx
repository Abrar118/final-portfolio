import Link from "next/link";
import { ArrowUpRight, Flame } from "lucide-react";
import { socialMedia } from "@/data/home/socials";

export default function Footer() {
  return (
    <footer className="page-wrap pb-28 pt-6 lg:pb-10">
      <div className="glass flex flex-wrap items-center justify-between gap-6 px-6 py-7 md:px-9">
        <div>
          <p className="hud-label">End of the trail — for now</p>
          <p className="mt-2 font-display text-2xl font-semibold tracking-wide md:text-3xl">
            Have a quest in mind?
          </p>
        </div>
        <Link href="/contact" className="btn btn-primary">
          <Flame className="h-4 w-4" aria-hidden="true" /> Light the beacon
        </Link>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-5">
        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} Abrar Mahir Esam · Grown in Dhaka
        </p>
        <div className="flex gap-5">
          {socialMedia.map((s) => (
            <a
              key={s.id}
              href={s.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-primary"
            >
              {s.label}
              <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
