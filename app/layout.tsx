import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import Navbar from "@/components/shared/Navbar";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { Home } from "lucide-react";
import { navItems } from "@/data/home/navItems";
import { FloatingMenu } from "@/components/shared/FloatingMenu";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Abrar's Portfolio",
  description: "Developer portfolio of Abrar Mahir Esam",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <FloatingNav navItems={navItems} />
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
