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
  metadataBase: new URL("https://mayurprofile.com"),
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
  authors: [{ name: "Mayur Sawant", url: "https://mayurprofile.com" }],
  creator: "Mayur Sawant",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mayurprofile.com",
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

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://mayurprofile.com/#person",
      name: "Mayur Sawant",
      jobTitle: "Full-Stack Software Engineer & UI/UX Designer",
      url: "https://mayurprofile.com",
      image: "https://mayurprofile.com/og-image.png",
      sameAs: [
        "https://github.com/itsms0517",
        "https://linkedin.com/in/mayur-chandanshive-1125293a7/",
        "https://instagram.com/mayur_0518_",
      ],
      knowsAbout: [
        "Full-Stack Web Development",
        "Next.js",
        "React",
        "FastAPI",
        "Python",
        "PostgreSQL",
        "TypeScript",
        "Tailwind CSS",
        "UI/UX Design",
        "Figma",
      ],
      address: {
        "@type": "PostalAddress",
        addressCountry: "IN",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://mayurprofile.com/#website",
      url: "https://mayurprofile.com",
      name: "Mayur Sawant — Developer & Designer",
      publisher: {
        "@id": "https://mayurprofile.com/#person",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} dark`}>
      <body className="min-h-screen bg-background text-ink font-sans antialiased selection:bg-accent selection:text-background">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        <main className="min-h-[calc(100vh-20rem)]">{children}</main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
