import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Cinzel } from "next/font/google";
import "./globals.css";

import { ThemeProvider } from "@/lib/providers/theme-provider";
import { worldBootScript } from "@/lib/world";
import WorldStage from "@/components/world/WorldStage";
import TitleScreen from "@/components/world/TitleScreen";
import ZoneBanner from "@/components/world/ZoneBanner";
import GameMenu from "@/components/shared/GameMenu";
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
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Abrar Mahir Esam — Software Engineer",
  description:
    "Full-stack software engineer and competitive programmer based in Dhaka, Bangladesh. Building web, mobile, and desktop systems with Spring Boot, Next.js, Flutter, and Rust.",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#06140f" },
    { media: "(prefers-color-scheme: light)", color: "#e6f0d8" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: worldBootScript }} />
      </head>
      <body
        className={`${geist.variable} ${geistMono.variable} ${cinzel.variable} font-body antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <WorldStage />
          <div id="app-shell">
            <a href="#main-content" className="skip-link">
              Skip to content
            </a>
            <RouteProgress />
            <GameMenu />
            <ZoneBanner />
            <div id="main-content" tabIndex={-1} className="app-main">
              {children}
              <Footer />
            </div>
          </div>
          <TitleScreen />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
