import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BookingClosing } from "@/components/BookingClosing";

export const metadata: Metadata = {
  title: "Booking Closing Dates — Eid & Festive Silai | Raz Stitching",
  description:
    "Raz Stitching Karachi booking closing dates for Eid and festive shalwar kameez, suit & silai delivery at Golden Tower.",
  alternates: { canonical: "/booking-closing" },
};

export default function BookingClosingPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <BookingClosing />
      </main>
      <Footer />
    </>
  );
}
