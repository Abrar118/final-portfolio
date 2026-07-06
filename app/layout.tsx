import type { Metadata } from "next";
import { Cinzel, Cinzel_Decorative, EB_Garamond } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import Navbar from "@/components/shared/Navbar";
import SiteHeader from "@/components/shared/SiteHeader";
import Footer from "@/components/shared/Footer";
import RouteProgress from "@/components/shared/RouteProgress";
import { Toaster } from "@/components/ui/sonner";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const cinzelDecorative = Cinzel_Decorative({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "700", "900"],
  display: "swap",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
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
        className={`${cinzel.variable} ${cinzelDecorative.variable} ${ebGaramond.variable} ${geistMono.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <RouteProgress />
          <SiteHeader />
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
