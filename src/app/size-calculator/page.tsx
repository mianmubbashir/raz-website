import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SizeCalculator } from "@/components/SizeCalculator";

export const metadata: Metadata = {
  title: "Size Calculator — Shalwar Kameez & Suit Fit | Raz Stitching",
  description:
    "Free size calculator for shalwar kameez, suit, pant coat, waist coat, kurta pajama, jubba & sherwani stitching at Raz Stitching Karachi.",
  alternates: { canonical: "/size-calculator" },
};

export default function SizeCalculatorPage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <SizeCalculator />
      </main>
      <Footer />
    </>
  );
}
