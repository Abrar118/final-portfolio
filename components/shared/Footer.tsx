import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { socialMedia } from "@/data/home/socials";

export default function Footer() {
  const links = socialMedia.filter((s) => ["GitHub", "LinkedIn", "Codeforces"].includes(s.label));
  return (
    <footer className="terminus">
      <div className="page-wrap">
        <Link href="/contact" className="terminus-link">
          <span className="terminus-ring" aria-hidden="true" />
          <span>Next stop: say hello</span>
          <ArrowRight className="terminus-arrow" aria-hidden="true" />
        </Link>
        <div className="terminus-meta">
          <p>© {new Date().getFullYear()} Abrar Mahir Esam. Dhaka, Bangladesh.</p>
          <ul>
            {links.map((s) => (
              <li key={s.id}>
                <a href={s.link} target="_blank" rel="noopener noreferrer">
                  {s.label}
                  <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
