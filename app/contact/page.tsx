"use client";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Map as MapIcon, Phone } from "lucide-react";
import { useState } from "react";
import { email as _email } from "@/lib/email";
import { toast } from "sonner";

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
      setLoading(false);
    } catch (error: any) {
      console.log(error);
      toast.error("Failed to send email", {
        description: error.message,
      });
    }
  };

  return (
    <div className="max-w-4xl w-full mx-auto py-20 px-4 md:px-10">
      <div className="my-4">
        <h2 className="text-3xl font-bold">Get in touch</h2>
        <p className="text-muted-foreground">
          Feel free to leave any enquiries below and I will get back to you as
          soon as possible.
        </p>
      </div>

      <div className="space-y-4">
        <Card className="bg-muted/20">
          <CardHeader>
            <h3 className="text-2xl font-bold">Contact Details</h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapIcon />
                <span>Mirpur DOHS, Dhaka -1216, Bangladesh</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone />
                <span>(+88) 015-58075365</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail />
                <Link href="#" prefetch={false}>
                  abrarme118@gmail.com
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-muted/20">
          <CardHeader>
            <h3 className="text-2xl font-bold">Leave a Message</h3>
          </CardHeader>
          <CardContent>
            <form className="space-y-2" onSubmit={handleSendMail}>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="Enter your email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Enter your message"
                className="min-h-[100px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <Button type="submit">
                {loading ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
