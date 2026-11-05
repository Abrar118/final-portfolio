import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Archivo } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import NetworkStage from "@/components/network/NetworkStage";
import SignBar from "@/components/shared/SignBar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "@/components/ui/sonner";

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-sign",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.abrarmahiresam.tech"),
  title: "Abrar Mahir Esam, Software Engineer",
  description:
    "Full-stack software engineer in Dhaka, Bangladesh. Principal architect of Psycloud, a clinical platform serving 1,000+ users. Spring Boot, FastAPI, React, Flutter and Rust.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0e1216" },
    { media: "(prefers-color-scheme: light)", color: "#e9ebe6" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${archivo.variable} ${geistMono.variable} font-body antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <NetworkStage />
          <SignBar />
          <div id="main-content" tabIndex={-1} className="app-main">
            {children}
            <Footer />
          </div>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
