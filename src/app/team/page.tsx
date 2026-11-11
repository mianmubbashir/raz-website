import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { TeamPage } from "@/components/TeamPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our Team | Raz Stitching",
  description: `Meet the tailors, cutters, fitters, and shop team behind ${site.name} — Golden Tower and the Korangi factory.`,
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
