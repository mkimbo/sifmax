import About from "@/components/About/About";
import Banner from "@/components/Banner/Banner";
import Contacts from "@/components/Contacts/Contacts";
import Footer from "@/components/Footer/Footer";
import Address from "@/components/Address/Address";
import Gallery from "@/components/Gallery/Gallery";
import Section from "@/components/Section/Section";
import Services from "@/components/Services/Services";
import Testimonials from "@/components/Testimonials/Testimonials";

export default function Home() {
  return (
    <>
      <Banner />
      <Section
        id="about"
        meta="Welcome to"
        name="Sifmax Beauty Parlour"
        description="Your premier beauty destination in Sinza, Dar es Salaam. We offer expert hair styling, professional makeup, manicures, pedicures, and comprehensive beauty treatments. Our skilled team combines modern techniques with personalized care to enhance your natural beauty."
      >
        <About />
      </Section>
      <Section
        id="services"
        meta="What we do"
        name="Services"
        description="Experience excellence at Sifmax Beauty Parlour. We pride ourselves on using quality products and modern techniques to ensure every client leaves feeling beautiful and confident. Visit our salon for the best beauty services in Sinza, Dar es Salaam."
      >
        <Services />
      </Section>
      <Section
        id="gallery"
        meta="Our work"
        name="Gallery"
        description="Discover our stunning portfolio of transformative beauty services at Sifmax Beauty Parlour in Sinza. Browse through our collection of professional hair styling, makeup artistry, and nail care results that showcase our expertise and dedication to beauty excellence in Dar es Salaam."
      >
        <Gallery />
      </Section>
      <Section
        id="testimonials"
        meta="What clients say"
        name="Testimonials"
        description="Our customers love our professional beauty services, friendly staff, and exceptional results. Join our growing community of happy clients who trust us for all their beauty needs."
      >
        <Testimonials />
      </Section>
      <Section
        id="contact"
        meta="Where to find us"
        name="Contacts"
        description="Visit Sifmax Beauty Parlour in Sinza, Dar es Salaam for professional beauty services. Contact us for consultations, pricing information, and special offers. Our friendly team is ready to enhance your beauty experience."
      >
        <Contacts />
      </Section>
      <Address />
      <Footer />
    </>
  );
}
