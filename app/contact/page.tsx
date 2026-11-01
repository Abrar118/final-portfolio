"use client";

import { useState } from "react";
import { ArrowUpRight, Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MapHero, Route } from "@/components/network/parts";
import { email as sendEmail } from "@/lib/email";
import { socialMedia } from "@/data/home/socials";
import { useNetwork } from "@/lib/network-store";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const dispatch = useNetwork((s) => s.dispatch);

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
      setStatus("Message sent. Thanks for reaching out, I'll reply by email.");
      dispatch();
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setStatus("Your message could not be sent. Please try again, or email me directly at abrarme118@gmail.com.");
      toast.error("Couldn't send your message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      <MapHero height="short">
        <div className="sign-grid sign-grid-project">
          <h1 className="sign-name">Contact</h1>
          <div className="sign-aside">
            <p>A role, a project or an interesting problem. Send me a note and I&apos;ll reply by email.</p>
          </div>
        </div>
      </MapHero>

      <Route line="C">
        <section className="route-section contact-section">
          <div className="page-wrap contact-grid">
            <form onSubmit={handleSendMail} className="contact-form" aria-busy={loading}>
              <h2 className="section-title route-stop">Write to me</h2>
              <div className="contact-fields">
                <div>
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" name="name" autoComplete="name" required value={name} onChange={(e) => setName(e.target.value)} className="field" />
                </div>
                <div>
                  <Label htmlFor="email">Your email</Label>
                  <Input id="email" name="email" autoComplete="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="field" />
                </div>
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" name="message" required value={message} onChange={(e) => setMessage(e.target.value)} className="field field-area" />
              </div>
              <button type="submit" disabled={loading} className="btn btn-ink">
                {loading ? (
                  <>
                    Sending <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  </>
                ) : (
                  <>
                    Send message <Send className="h-4 w-4" aria-hidden="true" />
                  </>
                )}
              </button>
              <p role="status" className="contact-status">
                {status}
              </p>
            </form>

            <aside className="contact-direct">
              <h2 className="section-title">Directly</h2>
              <ul>
                <li>
                  <a href="mailto:abrarme118@gmail.com">abrarme118@gmail.com</a>
                </li>
                <li>Contact hours: 10 AM to 7 PM BDT</li>
              </ul>
              <ul className="contact-social">
                {socialMedia.map((s) => (
                  <li key={s.id}>
                    <a href={s.link} target="_blank" rel="noopener noreferrer">
                      {s.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          </div>
        </section>
      </Route>
    </main>
  );
}
