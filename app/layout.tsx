import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import SiteHeader from "@/components/shared/SiteHeader";
import AmbientBackdrop from "@/components/shared/AmbientBackdrop";
import Footer from "@/components/shared/Footer";
import RouteProgress from "@/components/shared/RouteProgress";
import { Toaster } from "@/components/ui/sonner";

const geist = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-body",
  weight: "100 900",
  display: "swap",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Abrar Mahir Esam — Software Engineer",
  description:
    "Full-stack software engineer and competitive programmer based in Dhaka, Bangladesh. Building web, mobile, and desktop systems with Spring Boot, Next.js, Flutter, and Rust.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geist.variable} ${geistMono.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <a href="#main-content" className="skip-link">Skip to content</a>
          <AmbientBackdrop />
          <RouteProgress />
          <SiteHeader />
          <div id="main-content" tabIndex={-1}>{children}</div>
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
