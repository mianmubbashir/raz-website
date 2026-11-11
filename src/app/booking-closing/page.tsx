import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BookingClosing } from "@/components/BookingClosing";

export const metadata: Metadata = {
  title: "Booking Closing | Raz Stitching",
  description:
    "Last booking dates for Eid and festive season delivery at Raz Stitching — garment-wise deadlines at our Golden Tower shop.",
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
