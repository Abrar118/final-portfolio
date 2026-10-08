"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, Flame, Loader2, Mail, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { email as sendEmail } from "@/lib/email";
import { toast } from "sonner";
import { socialMedia } from "@/data/home/socials";
import { useWorld } from "@/lib/world";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const flare = useWorld((s) => s.flare);

  const handleSendMail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatus("");
    try {
      await sendEmail(email, "abrarme118@gmail.com", name, message);
      setName("");
      setEmail("");
      setMessage("");
      setStatus("The beacon is lit — your message is on its way. Thanks for reaching out!");
      flare();
    } catch {
      setStatus("Your message could not be sent. Please try again or email me directly.");
      toast.error("Couldn’t send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="page-wrap page-top">
      <div className="mb-12 max-w-2xl">
        <p className="chapter-chip">
          <span className="chapter-dot" aria-hidden="true" />
          Chapter IV · Beacon Hill
        </p>
        <h1 className="page-title mt-5">
          Light the <span className="text-glow">Beacon</span>
        </h1>
        <p className="mt-6 max-w-lg leading-7 text-muted-foreground">
          A project, a collaboration, or an interesting problem — send a
          signal and I&apos;ll find my way to you.
        </p>
      </div>

      <div className="grid items-start gap-6 lg:grid-cols-[1.35fr,1fr]">
        <form onSubmit={handleSendMail} className="glass space-y-6 p-6 md:p-9" aria-busy={loading}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2.5">
              <Label htmlFor="name">Your name</Label>
              <Input id="name" name="name" autoComplete="name" placeholder="Alex Smith" required value={name} onChange={(e) => setName(e.target.value)} className="field" />
            </div>
            <div className="space-y-2.5">
              <Label htmlFor="email">Where can I reply?</Label>
              <Input id="email" name="email" autoComplete="email" type="email" placeholder="alex@example.com" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
            </div>
          </div>
          <div className="space-y-2.5">
            <Label htmlFor="message">Your message</Label>
            <Textarea id="message" name="message" placeholder="A little about your project or idea…" required value={message} onChange={(e) => setMessage(e.target.value)} className="field min-h-[190px] py-4" />
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">Goes straight to my inbox.</p>
            <button type="submit" disabled={loading} className="btn btn-primary disabled:cursor-wait disabled:opacity-60">
              {loading ? (
                <>
                  Sending… <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                </>
              ) : (
                <>
                  <Flame className="h-4 w-4" aria-hidden="true" /> Light the beacon
                </>
              )}
            </button>
          </div>
          <p role="status" className="text-sm leading-relaxed text-muted-foreground">
            {status}
          </p>
        </form>

        <aside className="glass p-6 md:p-8">
          <p className="hud-label">Waypoints</p>
          <h2 className="mt-2 font-display text-2xl font-semibold tracking-wide">Prefer a direct hello?</h2>
          <ul className="mt-6 space-y-2 text-sm">
            <li>
              <a href="mailto:abrarme118@gmail.com" className="waypoint">
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span className="break-all">abrarme118@gmail.com</span>
                <ArrowUpRight className="ml-auto h-4 w-4 shrink-0" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href="tel:+8801341759355" className="waypoint">
                <Phone className="h-4 w-4" aria-hidden="true" />
                +880 1341-759355
              </a>
            </li>
            <li className="waypoint">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              Mirpur DOHS, Dhaka-1216, Bangladesh
            </li>
          </ul>
          <div className="mt-6 border-t border-border/60 pt-5">
            <p className="hud-label">Elsewhere</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {socialMedia.map((social) => (
                <a key={social.id} href={social.link} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="btn btn-icon">
                  <social.img size={17} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
