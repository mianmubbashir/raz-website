import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ContactPage } from "@/components/ContactPage";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contact Raz Stitching Karachi — Book Shalwar Kameez & Suit Silai",
  description: `Contact ${site.name} for the best stitching in Karachi. WhatsApp bookings for shalwar kameez, suit, pant coat, waist coat & silai at Golden Tower.`,
  alternates: { canonical: "/contact" },
  keywords: [
    "contact Raz Stitching",
    "stitching booking Karachi",
    "shalwar kameez tailor contact",
    "Golden Tower stitching",
  ],
};

export default function ContactRoutePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact", path: "/contact" },
        ])}
      />
      <ScrollProgress />
      <Header />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
