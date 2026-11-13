import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TrackSuit } from "@/components/TrackSuit";

export const metadata: Metadata = {
  title: "Track Your Suit — Raz Stitching Order Status Karachi",
  description:
    "Track your Raz Stitching order in Karachi — shalwar kameez, suit, pant coat, waist coat & silai status from fabric to fitting to pickup.",
  alternates: { canonical: "/track-suit" },
};

type TrackSuitPageProps = {
  searchParams: Promise<{ id?: string; phone?: string }>;
};

export default async function TrackSuitPage({ searchParams }: TrackSuitPageProps) {
  const { id, phone } = await searchParams;

  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <TrackSuit initialOrderId={id ?? ""} initialPhone={phone ?? ""} />
      </main>
      <Footer />
    </>
  );
}
