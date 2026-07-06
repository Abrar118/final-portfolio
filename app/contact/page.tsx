"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Bird } from "lucide-react";
import { useState } from "react";
import { email as _email } from "@/lib/email";
import { toast } from "sonner";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { SectionHeading, WaxSeal } from "@/components/ui/ornaments";
import { socialMedia } from "@/data/home/socials";

/* Filled dove in flight, an envelope in its beak. Explicit width/height
   attributes cap the intrinsic size — CSS classes only ever shrink it. */
const FlyingDove = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 180 140"
    width="150"
    height="117"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M96 62 C104 34 94 14 68 8 C78 22 78 38 88 50 C91 55 93 59 96 62 Z"
      fill="currentColor"
      opacity="0.4"
    />
    <path
      d="M88 66 C82 38 92 16 120 10 C108 24 108 42 98 56 C95 60 91 64 88 66 Z"
      fill="currentColor"
    />
    <path
      d="M42 66 C46 58 54 54 62 54 C84 54 104 60 118 74 C130 84 146 88 160 86 C152 96 138 100 126 98 C130 104 138 108 146 110 C132 116 116 112 106 102 C88 104 68 98 56 86 C50 80 44 72 42 66 Z"
      fill="currentColor"
    />
    <circle cx="44" cy="62" r="9" fill="currentColor" />
    <path d="M36 60 L24 63 L36 66 Z" fill="currentColor" />
    <circle cx="42" cy="60" r="1.6" style={{ fill: "hsl(var(--background))" }} />
    <g transform="translate(14 66) rotate(8)">
      <rect
        x="0"
        y="0"
        width="20"
        height="14"
        rx="1.5"
        style={{ fill: "hsl(var(--background))" }}
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path
        d="M0 1 L10 8 L20 1"
        stroke="currentColor"
        strokeWidth="1.4"
        fill="none"
      />
    </g>
  </svg>
);

/* Plump pigeon at rest — perches on the letter frame. */
const PerchedDove = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 150 120"
    width="70"
    height="56"
    fill="none"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M46 50 C50 42 60 38 68 40 C86 44 98 56 100 70 C101 76 100 82 96 86 L122 104 C108 102 94 96 84 88 C72 92 58 88 52 78 C46 70 43 58 46 50 Z"
      fill="currentColor"
    />
    <path
      d="M66 50 C80 52 90 62 94 74 C86 78 74 74 68 64 C63 57 62 53 66 50 Z"
      style={{ fill: "hsl(var(--card))" }}
      opacity="0.28"
    />
    <circle cx="47" cy="44" r="8.5" fill="currentColor" />
    <path d="M40 42 L29 45 L40 48 Z" fill="currentColor" />
    <circle cx="45" cy="42" r="1.5" style={{ fill: "hsl(var(--card))" }} />
    <path
      d="M66 88 L64 102 M76 88 L76 102"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
    />
  </svg>
);

/* A quill feather, drifting. */
const Feather = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 120"
    width="64"
    height="64"
    fill="none"
    stroke="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path
      d="M24 104 C30 72 52 40 96 16 C76 52 52 84 28 102 Z"
      fill="currentColor"
      fillOpacity="0.12"
      strokeWidth="2"
    />
    <path d="M24 104 C44 76 68 46 96 16" strokeWidth="1.6" />
    <path
      d="M40 82 C48 80 55 76 60 70 M52 66 C60 64 66 60 71 54 M64 50 C71 48 77 44 82 38"
      strokeWidth="1.3"
      opacity="0.7"
    />
    <path d="M24 104 L14 114" strokeWidth="2" />
  </svg>
);

/* The dovecote tower, one pigeon on the ledge. */
const Dovecote = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 120 140"
    width="96"
    height="112"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.4"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M30 132 L30 58 M90 58 L90 132" />
    <path d="M20 62 L60 26 L100 62" strokeWidth="3" />
    <circle cx="60" cy="18" r="3.5" strokeWidth="2" />
    <path d="M60 26 L60 21.5" strokeWidth="2" />
    <path d="M52 74 A8 8 0 0 1 68 74 L68 88 L52 88 Z" />
    <path d="M40 106 A6 6 0 0 1 52 106 L52 116 L40 116 Z" strokeWidth="2" />
    <path d="M68 106 A6 6 0 0 1 80 106 L80 116 L68 116 Z" strokeWidth="2" />
    <path d="M44 94 L76 94" strokeWidth="2" />
    <path
      d="M70 90 C72 87 76 87 78 89 C79 91 77 93 74 94 L70 94 Z"
      fill="currentColor"
      stroke="none"
    />
    <path d="M22 132 L98 132" />
  </svg>
);

/* Distant flock — three gull-marks. */
const FlockMarks = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 150 80"
    width="110"
    height="59"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    className={className}
    aria-hidden="true"
  >
    <path d="M20 30 Q26 22 32 30 Q38 22 44 30" />
    <path d="M70 16 Q75 10 80 16 Q85 10 90 16" opacity="0.7" />
    <path d="M108 40 Q112 35 116 40 Q120 35 124 40" opacity="0.5" />
  </svg>
);

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [flying, setFlying] = useState(false);
  const reduceMotion = useReducedMotion();

  const handleSendMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await _email(email, "abrarme118@gmail.com", name, message);
      setName("");
      setEmail("");
      setMessage("");
      if (!reduceMotion) setFlying(true);
      toast.success("Your pigeon is away", {
        description: "It carries your words — I will write back soon.",
      });
    } catch (error: any) {
      toast.error("The pigeon returned undelivered", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative mx-auto w-full max-w-4xl px-4 py-16 pb-32 md:px-10">
      {/* ── The sky: a distant flock crosses the page ── */}
      <FlockMarks className="pointer-events-none absolute left-[4%] top-24 text-foreground/30" />
      <FlockMarks className="pointer-events-none absolute right-[6%] top-40 -scale-x-100 text-foreground/20" />

      {/* Drifting feathers about the writing desk (wide screens) */}
      <Feather className="pointer-events-none absolute -left-14 top-[46%] hidden rotate-[18deg] animate-float text-foreground/35 lg:block" />
      <Feather className="pointer-events-none absolute -right-10 bottom-40 hidden h-12 w-12 -rotate-[24deg] -scale-x-100 animate-float text-foreground/25 [animation-delay:-3s] lg:block" />

      {/* The pigeon departs with the letter */}
      <AnimatePresence>
        {flying && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.85 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: ["0vw", "-16vw", "-40vw", "-68vw"],
              y: ["0vh", "-12vh", "-32vh", "-60vh"],
              rotate: [0, 4, 8, 10],
              scale: [0.85, 1, 0.75, 0.5],
            }}
            transition={{
              duration: 2.4,
              ease: "easeOut",
              times: [0, 0.15, 0.6, 1],
            }}
            onAnimationComplete={() => setFlying(false)}
            className="pointer-events-none fixed bottom-[32%] right-[14%] z-[110] text-foreground"
          >
            <FlyingDove className="h-[104px] w-[134px]" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <SectionHeading
          rubric="By Wing from the Dovecote"
          title="Send Word"
          subtitle="Write your letter below — a carrier pigeon stands ready at the tower window, and it knows the way."
          className="mb-16"
        />
      </motion.div>

      <div className="grid gap-8 md:grid-cols-[1fr,300px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="relative"
        >
          {/* The pigeon waits, perched on the letter's frame */}
          <PerchedDove className="absolute -top-12 right-4 z-10 h-14 w-[4.375rem] text-foreground/80" />

          <form
            className="frame-double relative space-y-5 bg-card p-6 md:p-8"
            onSubmit={handleSendMail}
          >
            <div className="space-y-2">
              <Label
                htmlFor="name"
                className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-foreground"
              >
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="rounded-sm border-border bg-background font-body focus:border-gold/60"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-foreground"
              >
                Email
              </Label>
              <Input
                id="email"
                placeholder="you@example.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="rounded-sm border-border bg-background font-body focus:border-gold/60"
              />
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="message"
                className="font-heading text-xs font-semibold uppercase tracking-[0.15em] text-foreground"
              >
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Tell me about your project..."
                className="min-h-[140px] rounded-sm border-border bg-background font-body focus:border-gold/60"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="gap-2 rounded-sm bg-primary px-6 font-heading text-xs font-semibold uppercase tracking-[0.15em] text-primary-foreground hover:bg-primary/90"
            >
              {loading ? (
                "Fastening the letter..."
              ) : (
                <>
                  Release the Pigeon
                  <Bird className="h-4 w-4" />
                </>
              )}
            </Button>
            <p className="!mt-3 font-body text-xs italic text-muted-foreground">
              Every pigeon finds me. Every letter gets an answer.
            </p>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="space-y-8"
        >
          {/* The tower the pigeons fly home to */}
          <div className="flex justify-center md:justify-start">
            <Dovecote className="h-28 w-24 text-foreground/70" />
          </div>

          <div>
            <h3 className="rubric !text-[10px] mb-4">Where the Pigeon Flies</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary" />
                <span className="font-body text-sm text-muted-foreground">
                  Mirpur DOHS, Dhaka-1216, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 flex-shrink-0 text-primary" />
                <span className="font-body text-sm text-muted-foreground">
                  +880 1341-759355
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 flex-shrink-0 text-primary" />
                <Link
                  href="mailto:abrarme118@gmail.com"
                  className="font-body text-sm text-muted-foreground transition-colors hover:text-accent"
                >
                  abrarme118@gmail.com
                </Link>
              </div>
            </div>
          </div>

          <div>
            <h3 className="rubric !text-[10px] mb-4">By Other Roads</h3>
            <div className="flex items-center gap-2.5">
              {socialMedia.map((social) => (
                <WaxSeal
                  key={social.id}
                  href={social.link}
                  label={social.label}
                >
                  <social.img size={13} />
                </WaxSeal>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
