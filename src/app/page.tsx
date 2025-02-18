import About from "@/components/About/About";
import Banner from "@/components/Banner/Banner";
import Contacts from "@/components/Contacts/Contacts";
import Footer from "@/components/Footer/Footer";
import Address from "@/components/Address/Address";
import Gallery from "@/components/Gallery/Gallery";
import Section from "@/components/Section/Section";
import Testimonials from "@/components/Testimonials/Testimonials";
import { ExpandableCardDemo } from "@/components/ExpandableCards/ExpandableCards";

export default function Home() {
  return (
    <>
      <Banner />
      <Section
        id="about"
        meta="about.meta"
        name="Sifmax Beauty Parlour"
        description="about.description"
      >
        <About />
      </Section>
      <Section
        id="services"
        meta="services.meta"
        name="nav.services"
        description="services.description"
      >
        <ExpandableCardDemo />
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
    </>
  );
}
