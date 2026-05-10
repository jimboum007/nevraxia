import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import Features from "@/components/sections/Features";
import Benchmarking from "@/components/sections/Benchmarking";
import ScalingROI from "@/components/sections/ScalingROI";
import Pricing from "@/components/sections/Pricing";
import Testimonials from "@/components/sections/Testimonials";
import Contact from "@/components/sections/Contact";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  return (
    <main className="min-h-screen" style={{ background: "#0D1117" }}>
      <Navbar locale={locale} />
      <Hero />
      <Stats />
      <Features />
      <Benchmarking />
      <ScalingROI />
      <Pricing />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  );
}
