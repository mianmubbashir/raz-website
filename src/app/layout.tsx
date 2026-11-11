import type { Metadata } from "next";
import { Cormorant_Garamond, Michroma, Outfit } from "next/font/google";
import { ScrollAnchors } from "@/components/ScrollAnchors";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const michroma = Michroma({
  variable: "--font-brand",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://razstitching.com"),
  title: "Raz Stitching | Premium Stitching Karachi",
  description:
    "Karachi’s specialist for special shalwar kameez stitching — plus kurta pajama, jubba/thobe, design suits, and ghum silai. Visit our Golden Tower shop.",
  icons: {
    icon: [
      { url: "/logo2.svg", type: "image/svg+xml" },
      { url: "/logo2-mark.png", type: "image/png" },
    ],
    shortcut: "/logo2-mark.png",
    apple: "/logo2-mark.png",
  },
  openGraph: {
    title: "Raz Stitching | Premium Stitching Karachi",
    description:
      "Crafted fit for every occasion. Special shalwar kameez and formal menswear stitching at our Golden Tower shop.",
    type: "website",
    images: [{ url: "/logo2-mark.png" }],
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
      className={`${outfit.variable} ${cormorant.variable} ${michroma.variable} h-full`}
    >
      <body className="min-h-full antialiased">
        <ScrollAnchors />
        {children}
      </body>
    </html>
  );
}
