import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeProvider";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CursorGlow from "@/components/CursorGlow";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Science Knowledge Hub | Explore the Universe of Science",
    template: "%s | Science Knowledge Hub",
  },
  description:
    "The largest modern scientific knowledge platform covering Space, Astronomy, Physics, Quantum Mechanics, Biology, AI, Technology, and more. Make science accessible to everyone.",
  keywords: [
    "science", "knowledge", "space", "astronomy", "physics", "quantum physics",
    "biology", "artificial intelligence", "technology", "scientists", "education",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Science Knowledge Hub",
    title: "Science Knowledge Hub | Explore the Universe of Science",
    description:
      "The largest modern scientific knowledge platform covering Space, Astronomy, Physics, Quantum Mechanics, Biology, AI, Technology, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Science Knowledge Hub",
    description:
      "Explore the Universe of Knowledge — The largest modern scientific knowledge platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#000814] text-[#f0f0ec]" suppressHydrationWarning>
        <ThemeProvider>
          <CursorGlow />
          <Header />
          <main className="flex-1 relative z-10">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
