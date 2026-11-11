import { Header } from "@/components/Header";
import { ScrollProgress } from "@/components/ScrollProgress";
import { Hero } from "@/components/Hero";
import { Marquee } from "@/components/Marquee";
import { Lookbook } from "@/components/Lookbook";
import { Signature } from "@/components/Signature";
import { Services } from "@/components/Services";
import { Craft } from "@/components/Craft";
import { Franchises } from "@/components/Franchises";
import { Contact } from "@/components/Contact";
import { Stats } from "@/components/Stats";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Signature />
        <Lookbook />
        <Services />
        <Craft />
        <Franchises />
        <Contact />
      </main>
      <Stats />
      <Footer />
    </>
  );
}
