"use client";

import { AnimatedTestimonials } from "../ui/animated-testimonials";
import image from "../../assets/images/review1.jpeg";
import image2 from "../../assets/images/facial.webp";
import image3 from "../../assets/images/bridal.webp";

const reviews = [
  {
    id: 1,
    name: "Nana Mapozi",
    quote: "You have a very good service.. I love you for nothing.",
    src: image,
  },
  {
    id: 2,
    name: "Ramadhani Haji",
    quote:
      "I am very impressed with sifmax services they have good barbers and your services are good overall..I will come back again and again.",
    src: image2,
  },
  {
    id: 3,
    name: "Lisa",
    quote:
      "Great experience! Very professional and experienced. Also, I appreciated the staff for being very patient with me as they helped me choose the color for my foundation.",
    src: image3,
  },
];

const Testimonials = () => {
  return <AnimatedTestimonials testimonials={reviews} autoplay />;
};

export default Testimonials;
