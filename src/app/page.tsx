import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd, defaultDescription, defaultTitle } from "@/lib/seo";

export const metadata: Metadata = {
  title: { absolute: defaultTitle },
  description: defaultDescription,
  alternates: { canonical: "/" },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    url: "/",
  },
};

const Signature = dynamic(() =>
  import("@/components/Signature").then((m) => ({ default: m.Signature })),
);
const ScrollStory = dynamic(() =>
  import("@/components/ScrollStory").then((m) => ({ default: m.ScrollStory })),
);
const Lookbook = dynamic(() =>
  import("@/components/Lookbook").then((m) => ({ default: m.Lookbook })),
);
const Services = dynamic(() =>
  import("@/components/Services").then((m) => ({ default: m.Services })),
);
const Craft = dynamic(() =>
  import("@/components/Craft").then((m) => ({ default: m.Craft })),
);
const Franchises = dynamic(() =>
  import("@/components/Franchises").then((m) => ({ default: m.Franchises })),
);
const Contact = dynamic(() =>
  import("@/components/Contact").then((m) => ({ default: m.Contact })),
);
const Stats = dynamic(() =>
  import("@/components/Stats").then((m) => ({ default: m.Stats })),
);
const Footer = dynamic(() =>
  import("@/components/Footer").then((m) => ({ default: m.Footer })),
);

export default function Home() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([{ name: "Raz Stitching", path: "/" }])}
      />
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Signature />
        <ScrollStory />
        <Lookbook />
        <Services />
        <Craft />
        <Franchises />
        <Contact />
        <section className="border-t border-ink/10 bg-mist px-5 py-16 md:px-10 md:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[11px] uppercase tracking-[0.32em] text-mist-muted">
              Official website
            </p>
            <h2 className="mt-4 font-display text-3xl text-ink md:text-4xl">
              Raz Stitching —{" "}
              <span className="text-brass-deep">Karachi&apos;s trusted silai</span>
            </h2>
            <p className="mt-5 text-sm leading-relaxed text-ink/60 md:text-base">
              razstitching.com is the official home of Raz Stitching at Golden
              Tower (Shop 23–30). Expert shalwar kameez stitching, suit silai,
              pant coat, waist coat, and every type of stitch — book online or
              visit the shop.
            </p>
          </div>
        </section>
      </main>
      <Stats />
      <Footer />
    </>
  );
}
