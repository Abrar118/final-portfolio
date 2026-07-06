import Link from "next/link";
import { socialMedia } from "@/data/home/socials";
import { Crest, WaxSeal } from "@/components/ui/ornaments";

const SiteHeader = () => {
  return (
    <header className="relative z-10 border-b border-border/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-8">
        <Link
          href="/"
          className="group flex items-center gap-3 text-foreground"
          aria-label="Abrar Mahir Esam — home"
        >
          <Crest className="h-9 w-auto text-primary transition-colors duration-200 group-hover:text-gold" />
          <span className="font-heading text-sm font-semibold uppercase tracking-[0.22em] hidden sm:block">
            Abrar Mahir Esam
          </span>
        </Link>

        <div className="flex items-center gap-2.5">
          {socialMedia.map((social) => (
            <WaxSeal key={social.id} href={social.link} label={social.label}>
              <social.img size={13} />
            </WaxSeal>
          ))}
        </div>
      </div>
    </header>
  );
};

export default SiteHeader;
