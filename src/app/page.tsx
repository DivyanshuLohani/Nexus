import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import Philosophy from "@/components/landing/Philosphy";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

export async function generateMetadata() {
  return {
    title: "Nexus | Your Digital Identity, Simplified",
    description: "A monochromatic landscape for your professional presence. Create your surgical, high-precision link-in-bio profile.",
    openGraph: {
      title: "Nexus | Your Digital Identity, Simplified",
      description: "A monochromatic landscape for your professional presence.",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "Nexus | Your Digital Identity, Simplified",
      description: "A monochromatic landscape for your professional presence.",
    },
    icons: {
      icon: "/favicon.ico",
    },
    manifest: "/manifest.json",
  };
}


export default function Home() {
  return (
    <main className="bg-white text-black">
      <Navbar />
      <Hero />
      <Features />
      <Philosophy />
      <CTA />
      <Footer />
    </main>
  );
}