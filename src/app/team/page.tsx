import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TeamPage } from "@/components/TeamPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team — Master Tailors & Stitchman at Raz Stitching Karachi",
  description: `Meet the master tailors, stitchman, and factory team behind ${site.name} — best stitching & silai in Karachi at Golden Tower and Korangi.`,
  alternates: { canonical: "/team" },
};

export default function TeamRoutePage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <TeamPage />
      </main>
      <Footer />
    </>
  );
}
