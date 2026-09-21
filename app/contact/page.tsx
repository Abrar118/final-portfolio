"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, Loader2, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { email as sendEmail } from "@/lib/email";
import { toast } from "sonner";
import { socialMedia } from "@/data/home/socials";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSendMail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setStatus("");
    try {
      await sendEmail(email, "abrarme118@gmail.com", name, message);
      setName(""); setEmail(""); setMessage("");
      setStatus("Message sent. Thanks for getting in touch!");
    } catch {
      setStatus("Your message could not be sent. Please try again or email me directly.");
      toast.error("Couldn’t send your message. Please try again.");
    } finally { setLoading(false); }
  };

  return (
    <main className="page-shell">
      <div className="mb-12 max-w-2xl"><p className="section-kicker">Get in touch</p><h1 className="page-title">Good things start<br />with a conversation.</h1><p className="mt-6 max-w-lg leading-7 text-muted-foreground">A project, a collaboration, or an interesting problem. Tell me what you have in mind.</p></div>
      <div className="grid items-start gap-8 lg:grid-cols-[1.35fr,1fr]">
        <form onSubmit={handleSendMail} className="glass-panel space-y-6 p-6 md:p-9" aria-busy={loading}>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2.5"><Label htmlFor="name">Your name</Label><Input id="name" name="name" autoComplete="name" placeholder="Alex Smith" required value={name} onChange={e => setName(e.target.value)} className="glass-field" /></div>
            <div className="space-y-2.5"><Label htmlFor="email">Email address</Label><Input id="email" name="email" autoComplete="email" type="email" placeholder="alex@example.com" required value={email} onChange={e => setEmail(e.target.value)} className="glass-field" /></div>
          </div>
          <div className="space-y-2.5"><Label htmlFor="message">What are you thinking?</Label><Textarea id="message" name="message" placeholder="A little about your project or idea…" required value={message} onChange={e => setMessage(e.target.value)} className="glass-field min-h-[190px] py-4" /></div>
          <div className="flex flex-wrap items-center justify-between gap-4"><p className="text-xs text-muted-foreground">Straight to my inbox.</p><button type="submit" disabled={loading} className="glass-button glass-button-primary disabled:cursor-wait disabled:opacity-60">{loading ? <>Sending… <Loader2 className="h-4 w-4 animate-spin" /></> : <>Send message <Send className="h-4 w-4" /></>}</button></div>
          <p role="status" className="text-sm leading-relaxed text-muted-foreground">{status}</p>
        </form>
        <aside className="p-2 md:p-6">
          <h2 className="text-2xl font-medium tracking-tight">Prefer a direct hello?</h2>
          <a href="mailto:abrarme118@gmail.com" className="mt-5 inline-flex min-h-11 items-center gap-2 break-all text-base text-accent sm:text-lg">abrarme118@gmail.com <ArrowUpRight className="h-4 w-4 shrink-0" /></a>
          <div className="mt-8 space-y-5 text-sm text-muted-foreground">
            <p className="flex items-start gap-3"><MapPin className="h-5 w-5 shrink-0" />Mirpur DOHS, Dhaka-1216, Bangladesh</p>
            <a href="tel:+8801341759355" className="flex min-h-11 items-center gap-3 hover:text-accent"><Phone className="h-5 w-5" />+880 1341-759355</a>
          </div>
          <div className="mt-8 border-t border-border/70 pt-6"><p className="mb-4 text-sm">Elsewhere on the internet</p><div className="flex flex-wrap gap-2">{socialMedia.map(social => <a key={social.id} href={social.link} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="glass-button !h-11 !min-h-11 !w-11 !px-0"><social.img size={17} /></a>)}</div></div>
        </aside>
      </div>
    </main>
  );
}
