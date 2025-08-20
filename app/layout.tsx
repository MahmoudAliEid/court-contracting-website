import type React from "react";
import type { Metadata } from "next";
import { Inter, Cairo } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/components/language-provider";
import QueryProvider from "@/components/QueryProvider";
import AppToaster from "./toaster";
import { Footer } from "@/components/footer";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cairo = Cairo({ subsets: ["arabic"], variable: "--font-cairo" });

export const metadata: Metadata = {
  title: "Court Contracting Company | شركة كورت للمقاولات",
  description:
    "Professional construction and contracting services in Saudi Arabia. We specialize in residential and commercial buildings, renovation, and finishing works.",
  keywords:
    "construction, contracting, Saudi Arabia, residential, commercial, renovation, finishing",
  authors: [{ name: "Soft Masters" }],
  creator: "Soft Masters",
  openGraph: {
    title: "Court Contracting Company | شركة كورت للمقاولات",
    description:
      "Professional construction and contracting services in Saudi Arabia",
    url: "https://court.sa",
    siteName: "Court Contracting Company",
    images: [
      {
        url: "/images/court-logo.webp",
        width: 1200,
        height: 630,
        alt: "Court Contracting Company Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Court Contracting Company | شركة كورت للمقاولات",
    description:
      "Professional construction and contracting services in Saudi Arabia",
    images: ["/images/court-logo.png"],
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
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* SEO: Preconnect to font and CDN resources for faster loading */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          rel="preconnect"
          href="https://cdnjs.cloudflare.com"
          crossOrigin="anonymous"
        />

        {/* SEO: Favicon and icons */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
  <link rel="manifest" href="/manifest.webmanifest" />

        {/* SEO: Canonical URL */}
  <link rel="canonical" href="https://court.sa" />

        {/* SEO: Structured Data (JSON-LD) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Court Contracting Company",
              url: "https://court.sa",
              logo: "https://court.sa/images/court-logo.webp",
              sameAs: [],
              description:
                "Professional construction and contracting services in Saudi Arabia. We specialize in residential and commercial buildings, renovation, and finishing works.",
            }),
          }}
        />

        {/* GSAP Scripts */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js"></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js"></script>
      </head>
      <QueryProvider>
        <body
          className={`${inter.variable} ${cairo.variable} font-sans antialiased`}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={false}
            disableTransitionOnChange={false}
          >
            <LanguageProvider>{children}</LanguageProvider>
          </ThemeProvider>
          {/* Toast notifications */}
          <AppToaster />
        </body>
      </QueryProvider>
    </html>
  );
}
