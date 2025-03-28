import { AboutSection } from "@/components/About";
import Hero from "@/components/Hero";
import { ServicesSection } from "@/components/Services";
import { GallerySection } from "@/components/Gallery";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Booking from "@/components/Booking";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <Hero />
        <ServicesSection />
        <AboutSection />
        <GallerySection />
        <Testimonials />
        <Booking />
        <Contact />
      </main>
    </div>
  );
}
