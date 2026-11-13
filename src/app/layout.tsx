import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Michroma, Outfit } from "next/font/google";
import { ScrollAnchors } from "@/components/ScrollAnchors";
import { JsonLd } from "@/components/JsonLd";
import {
  defaultDescription,
  defaultTitle,
  localBusinessJsonLd,
  seoKeywords,
  siteUrl,
  websiteJsonLd,
} from "@/lib/seo";
import { site } from "@/lib/content";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
  preload: true,
});

const michroma = Michroma({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  preload: false,
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f2f0eb" },
    { media: "(prefers-color-scheme: dark)", color: "#0e1218" },
  ],
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: defaultTitle,
    template: `%s | ${site.name}`,
  },
  description: defaultDescription,
  applicationName: site.name,
  authors: [{ name: site.owner.name, url: siteUrl }],
  creator: site.name,
  publisher: site.name,
  category: "Tailoring & Stitching",
  keywords: [...seoKeywords],
  alternates: {
    canonical: "/",
  },
  icons: {
    icon: [
      { url: "/logo2-icon.webp", type: "image/webp" },
      { url: "/logo2-mark.png", type: "image/png" },
    ],
    shortcut: "/logo2-mark.png",
    apple: "/logo2-mark.png",
  },
  manifest: "/manifest.webmanifest",
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: siteUrl,
    siteName: site.name,
    locale: "en_PK",
    type: "website",
    images: [
      {
        url: "/logo2-mark.png",
        width: 512,
        height: 512,
        alt: "Raz Stitching — best stitching in Karachi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/logo2-mark.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "PK-SD",
    "geo.placename": "Karachi",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-PK"
      className={`${outfit.variable} ${cormorant.variable} ${michroma.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <JsonLd data={[localBusinessJsonLd(), websiteJsonLd()]} />
        <ScrollAnchors />
        {children}
      </body>
    </html>
  );
}
