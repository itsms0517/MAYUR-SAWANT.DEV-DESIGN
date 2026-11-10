import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { Toaster } from "@/components/SonnerToaster";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mayursawant.dev"),
  title: {
    default: "Mayur Sawant — Full-Stack Developer & UI/UX Designer",
    template: "%s | Mayur Sawant",
  },
  description:
    "Portfolio of Mayur Sawant, a multidisciplinary Full-Stack Software Engineer and UI/UX Designer specialized in building high-performance web applications, scalable backends, and brand design systems.",
  keywords: [
    "Mayur Sawant",
    "Full-Stack Developer",
    "UI/UX Designer",
    "Next.js Developer",
    "FastAPI",
    "Python Developer",
    "React Engineer",
    "India",
    "Freelance Web Developer",
  ],
  authors: [{ name: "Mayur Sawant", url: "https://mayursawant.dev" }],
  creator: "Mayur Sawant",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mayursawant.dev",
    title: "Mayur Sawant — Full-Stack Developer & UI/UX Designer",
    description:
      "Crafting high-performance web apps, scalable APIs, and distinctive visual identities.",
    siteName: "Mayur Sawant Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mayur Sawant Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mayur Sawant — Full-Stack Developer & UI/UX Designer",
    description: "Crafting modern web applications, scalable APIs, and UI/UX systems.",
    images: ["/og-image.png"],
    creator: "@mayur_0518_",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="min-h-screen bg-background text-ink font-sans antialiased selection:bg-accent selection:text-background">
        <Navbar />
        <main className="min-h-[calc(100vh-20rem)]">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
