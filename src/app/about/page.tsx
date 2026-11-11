import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AboutPage } from "@/components/AboutPage";
import { site } from "@/lib/content";

export const metadata: Metadata = {
  title: "About Us | Raz Stitching",
  description: `${site.name} — ${site.support} Learn our story, values, and craft at Golden Tower.`,
};

export default function AboutRoutePage() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
