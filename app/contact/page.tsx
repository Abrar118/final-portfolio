"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Phone, Send } from "lucide-react";
import { useState } from "react";
import { email as _email } from "@/lib/email";
import { toast } from "sonner";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      await _email(email, "abrarme118@gmail.com", name, message);
      setName("");
      setEmail("");
      setMessage("");
    } catch (error: any) {
      toast.error("Failed to send email", {
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto py-20 px-4 md:px-10 pb-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="mb-10"
      >
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-foreground">
          Get in touch
        </h1>
        <p className="text-muted-foreground mt-3 max-w-lg">
          Have a project in mind or just want to chat? Drop me a message and
          I&apos;ll get back to you.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-[1fr,300px] gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
        >
          <form className="space-y-5" onSubmit={handleSendMail}>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Name
              </Label>
              <Input
                id="name"
                placeholder="Your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-card/60 border-border/30 focus:border-accent/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                placeholder="you@example.com"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-card/60 border-border/30 focus:border-accent/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message" className="text-sm font-medium">
                Message
              </Label>
              <Textarea
                id="message"
                placeholder="Tell me about your project..."
                className="min-h-[140px] bg-card/60 border-border/30 focus:border-accent/50"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={loading}
              className="bg-accent hover:bg-accent/90 text-accent-foreground rounded-full
                px-6 gap-2 font-medium glow-purple-sm hover:glow-purple transition-shadow duration-300"
            >
              {loading ? (
                "Sending..."
              ) : (
                <>
                  Send Message
                  <Send className="h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="space-y-6"
        >
          <div>
            <h3 className="font-heading text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Contact Info
            </h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 mt-0.5 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  Mirpur DOHS, Dhaka-1216, Bangladesh
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-sm text-muted-foreground">
                  (+88) 015-58075365
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <Link
                  href="mailto:abrarme118@gmail.com"
                  className="text-sm text-muted-foreground hover:text-accent transition-colors"
                >
                  abrarme118@gmail.com
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
