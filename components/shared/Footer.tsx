import { socialMedia } from "@/data/home/socials";
import { Crest, FiligreeDivider, WaxSeal } from "@/components/ui/ornaments";

const toRoman = (num: number): string => {
  const table: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];
  let result = "";
  let n = num;
  for (const [value, numeral] of table) {
    while (n >= value) {
      result += numeral;
      n -= value;
    }
  }
  return result;
};

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border/60 pb-28">
      <div className="mx-auto max-w-3xl px-4 py-12 flex flex-col items-center gap-5 text-center">
        <Crest className="h-10 w-auto text-primary" />

        <div className="flex items-center gap-3">
          {socialMedia.map((social) => (
            <WaxSeal key={social.id} href={social.link} label={social.label}>
              <social.img size={13} />
            </WaxSeal>
          ))}
        </div>

        <FiligreeDivider className="h-3 w-44 text-gold/70" />

        <p className="font-body italic text-sm text-muted-foreground max-w-md">
          Here ends this codex — set in Cinzel &amp; EB Garamond, illuminated
          at Dhaka.
        </p>
        <p className="font-heading text-xs tracking-[0.25em] uppercase text-muted-foreground">
          <span aria-hidden="true">{toRoman(year)}</span>
          <span className="sr-only">{year}</span>
          <span aria-hidden="true"> · </span>Abrar Mahir Esam
        </p>
      </div>
    </footer>
  );
};

export default Footer;
