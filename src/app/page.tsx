import Banner from "@/components/Banner/Banner";
import Contacts from "@/components/Contacts/Contacts";
import Footer from "@/components/Footer/Footer";
import Address from "@/components/Address/Address";
import Gallery from "@/components/Gallery/Gallery";
import Section from "@/components/Section/Section";
import Testimonials from "@/components/Testimonials/Testimonials";
import AboutSifmax from "@/components/About/ParallaxVideo";
import { ServiceCardsDemo } from "@/components/ExpandableCards/ServiceCards";

export default function Home() {
  return (
    <div className="min-h-[200vh]">
      <Banner />
      {/* <Section
        id="about"
        meta="about.meta"
        name="Sifmax Beauty Parlour"
        description="about.description"
      >
       
      </Section> */}

      <AboutSifmax />

      <Section
        id="services"
        meta="services.meta"
        name="Our Services"
        description="services.description"
      >
        {/* <ExpandableCardDemo /> */}
        <ServiceCardsDemo />
      </Section>
      <Section
        id="gallery"
        meta="gallery.meta"
        name="nav.gallery"
        description="gallery.description"
      >
        <Gallery />
      </Section>
      <Section
        id="testimonials"
        meta="testimonials.meta"
        name="nav.testimonials"
        description="testimonials.description"
      >
        <Testimonials />
      </Section>
      <Section
        id="contact"
        meta="contact.meta"
        name="nav.contact"
        description="contact.description"
      >
        <Contacts />
      </Section>
      <Address />
      <Footer />
    </div>
  );
}
