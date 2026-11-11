import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { SizeCalculator } from "@/components/SizeCalculator";

export const metadata: Metadata = {
  title: "Size Calculator | Raz Stitching",
  description:
    "Estimate your shalwar kameez, kurta pajama, pant coat, jubba, or sherwani size at Raz Stitching — enter chest, waist, and height in inches.",
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
