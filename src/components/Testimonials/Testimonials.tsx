"use client";

import { AnimatedTestimonials } from "../ui/animated-testimonials";
import image from "../../assets/images/review1.jpeg";
import image2 from "../../assets/images/bride.jpeg";
import image3 from "../../assets/images/review3.jpeg";

const reviews = [
  {
    id: 1,
    name: "Sarah",
    quote:
      "Amazing! Very professional, environment was calm, clean and soothing to be in. The massage was very relaxing, and my face was feeling extremely smooth afterwards.",
    src: image,
  },
  {
    id: 2,
    name: "Emma",
    quote:
      "Staff were very kind, welcoming, carried out my waxing so efficiently and results were great. The parlour is beautiful, very clean and welcoming, relaxing and comfortable. Thank you",
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
