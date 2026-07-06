import Link from "next/link";
import { cn } from "@/lib/utils";

/** Lozenge crest with the monogram "A" — the mark of the house. */
export const Crest = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 40 48"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M20 2 L38 24 L20 46 L2 24 Z"
      stroke="currentColor"
      strokeWidth="1.5"
    />
    <path
      d="M20 8 L33 24 L20 40 L7 24 Z"
      stroke="currentColor"
      strokeWidth="0.75"
      opacity="0.55"
    />
    <text
      x="20"
      y="29.5"
      textAnchor="middle"
      fontSize="15"
      fill="currentColor"
      style={{ fontFamily: "var(--font-heading), serif" }}
    >
      A
    </text>
  </svg>
);

/** Hairline rule with a central diamond fleuron. */
export const FiligreeDivider = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 220 14"
    fill="none"
    aria-hidden="true"
    className={className}
    preserveAspectRatio="xMidYMid meet"
  >
    <line x1="0" y1="7" x2="86" y2="7" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="94" cy="7" r="1.2" fill="currentColor" />
    <rect
      x="106"
      y="3"
      width="8"
      height="8"
      transform="rotate(45 110 7)"
      stroke="currentColor"
      strokeWidth="0.9"
    />
    <circle cx="126" cy="7" r="1.2" fill="currentColor" />
    <line x1="134" y1="7" x2="220" y2="7" stroke="currentColor" strokeWidth="0.75" />
  </svg>
);

/** Rubricated section opening: red-ink eyebrow, engraved title, filigree. */
export const SectionHeading = ({
  rubric,
  title,
  subtitle,
  className,
}: {
  rubric: string;
  title: string;
  subtitle?: string;
  className?: string;
}) => (
  <div className={cn("text-center", className)}>
    <p className="rubric">{rubric}</p>
    <h2 className="font-heading text-3xl md:text-4xl font-semibold tracking-wide text-foreground mt-3">
      {title}
    </h2>
    <FiligreeDivider className="mx-auto mt-5 h-3.5 w-48 text-gold" />
    {subtitle && (
      <p className="mt-4 font-body italic text-muted-foreground max-w-xl mx-auto text-base md:text-lg">
        {subtitle}
      </p>
    )}
  </div>
);

/** Social link pressed in oxblood wax. */
export const WaxSeal = ({
  href,
  label,
  children,
  className,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
  className?: string;
}) => (
  <Link
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    title={label}
    className={cn(
      "wax-seal inline-flex h-9 w-9 items-center justify-center",
      className
    )}
  >
    {children}
  </Link>
);

/** Concentric astrolabe rings with tick marks — ancient instrument motif. */
export const AstrolabeRing = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
    <circle cx="100" cy="100" r="96" stroke="currentColor" strokeWidth="0.75" />
    <circle
      cx="100"
      cy="100"
      r="80"
      stroke="currentColor"
      strokeWidth="0.5"
      strokeDasharray="2 7"
    />
    <circle cx="100" cy="100" r="58" stroke="currentColor" strokeWidth="0.75" />
    <circle cx="100" cy="100" r="3" fill="currentColor" />
    {Array.from({ length: 24 }, (_, i) => {
      const a = (i * Math.PI * 2) / 24;
      const long = i % 6 === 0;
      const r1 = long ? 88 : 91;
      return (
        <line
          key={i}
          x1={100 + r1 * Math.cos(a)}
          y1={100 + r1 * Math.sin(a)}
          x2={100 + 96 * Math.cos(a)}
          y2={100 + 96 * Math.sin(a)}
          stroke="currentColor"
          strokeWidth={long ? 1 : 0.5}
        />
      );
    })}
    <line x1="100" y1="42" x2="100" y2="158" stroke="currentColor" strokeWidth="0.4" opacity="0.6" />
    <line x1="42" y1="100" x2="158" y2="100" stroke="currentColor" strokeWidth="0.4" opacity="0.6" />
    <rect
      x="96"
      y="0"
      width="8"
      height="8"
      transform="rotate(45 100 4)"
      fill="currentColor"
      opacity="0.7"
    />
  </svg>
);

/** Thin corner marks that frame a block like a plate border. */
export const CornerOrnaments = ({ className }: { className?: string }) => (
  <div className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
    <span className="absolute left-0 top-0 h-8 w-8 border-l border-t border-gold/50" />
    <span className="absolute right-0 top-0 h-8 w-8 border-r border-t border-gold/50" />
    <span className="absolute bottom-0 left-0 h-8 w-8 border-b border-l border-gold/50" />
    <span className="absolute bottom-0 right-0 h-8 w-8 border-b border-r border-gold/50" />
  </div>
);
