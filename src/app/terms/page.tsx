import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TermsAndConditions } from "@/components/TermsAndConditions";

export const metadata: Metadata = {
  title: "Terms & Conditions | Raz Stitching",
  description:
    "Booking, payment, delivery, alterations, and cancellation terms for Raz Stitching orders at our Golden Tower shop.",
};

export default function TermsPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <TermsAndConditions />
      </main>
      <Footer />
    </>
  );
}
