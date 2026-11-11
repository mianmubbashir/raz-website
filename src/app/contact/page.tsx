import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { ContactPage } from "@/components/ContactPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact Us | Raz Stitching",
  description: `Contact ${site.name} on WhatsApp or visit our Golden Tower shop — bookings, order help, fittings, and directions.`,
};

export default function ContactRoutePage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <ContactPage />
      </main>
      <Footer />
    </>
  );
}
