import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { AboutPage } from "@/components/AboutPage";
import { JsonLd } from "@/components/JsonLd";
import { site } from "@/lib/content";
import { breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: "About Raz Stitching — Best Silai & Stitching in Karachi",
  description: `About ${site.name}: Karachi’s trusted house for shalwar kameez stitching, suit silai, pant coat, waist coat, and every type of stitch at Golden Tower.`,
  alternates: { canonical: "/about" },
  keywords: [
    "about Raz Stitching",
    "Raz Stitching Karachi",
    "best stitching in Karachi",
    "silai Karachi",
  ],
};

export default function AboutRoutePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <ScrollProgress />
      <Header />
      <main>
        <AboutPage />
      </main>
      <Footer />
    </>
  );
}
