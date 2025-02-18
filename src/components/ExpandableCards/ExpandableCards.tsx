"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOutsideClick } from "@/hooks/use-outside-click";
import nails from "../../assets/images/nail.webp";
import waxing from "../../assets/images/waxing.webp";
import facial from "../../assets/images/facial2.jpg";
import massage from "../../assets/images/body.webp";
import bridal from "../../assets/images/bridal.webp";
import hair from "../../assets/images/hair.webp";
import { ServiceCard } from "./ServiceCard";
import { sifmaxServiceBook, sifmaxServiceTypes } from "./servicebook";

function generateKey(title: string): string {
  return title.replace(/\/|\s|\)|\(/g, "").toLowerCase();
}

export function ExpandableCardDemo() {
  const [active, setActive] = useState<
    (typeof services)[number] | boolean | null
  >(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: {
                  delay: 0.8,
                },
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-[64px] right-5 lg:hidden items-center justify-center bg-[#f5c970] rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full mt-[64px] max-w-[500px] h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white sm:rounded-3xl "
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <Image
                  priority
                  width={500}
                  height={500}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div className="h-full">
                <div className="flex justify-between items-start p-2">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-neutral-700 dark:text-neutral-200 text-xl dancing-script"
                    >
                      {active.title}
                    </motion.h3>
                  </div>

                  {/* <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a> */}
                </div>
                <div className="h-full">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-neutral-600 text-xs md:text-sm lg:text-base h-auto service-list-height md:h-fit pb-10 flex flex-col items-start gap-2 overflow-auto dark:text-neutral-400  [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {Object.entries(
                      active.content.reduce(
                        (
                          acc: Record<string, typeof active.content>,
                          service
                        ) => {
                          const category = service.category;
                          if (!acc[category]) {
                            acc[category] = [];
                          }
                          acc[category].push(service);
                          return acc;
                        },
                        {}
                      )
                    ).map(([category, services], index, array) => (
                      <div key={category} className="w-full">
                        {array.length > 1 && (
                          <h4 className="font-medium text-lg text-center">
                            {category}
                          </h4>
                        )}
                        {services.map(
                          (service: { title: string; price: string }) => (
                            <ServiceCard
                              key={generateKey(service.title)}
                              id={generateKey(service.title)}
                              title={service.title}
                              price={service.price}
                            />
                          )
                        )}
                      </div>
                    ))}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 items-start gap-4  p-2">
        {services.map((service, index) => (
          <motion.div
            layoutId={`card-${service.title}-${id}`}
            key={service.title}
            onClick={() => setActive(service)}
            className="flex flex-col   cursor-pointer"
          >
            <div className="flex flex-col  w-full hover:grayscale">
              <motion.div layoutId={`image-${service.title}-${id}`}>
                <Image
                  width={1000}
                  height={1000}
                  src={service.src}
                  alt={service.title}
                  className="h-60 w-full  object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center gradient-bg items-center flex-col pt-4">
                <motion.h3
                  layoutId={`title-${service.title}-${id}`}
                  className="font-bold text-black text-center md:text-left text-xl dancing-script"
                >
                  {service.title}
                </motion.h3>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const getServices = (serviceIds: string[]) => {
  return sifmaxServiceBook.filter((service) =>
    serviceIds.includes(service.category)
  );
};

const services = sifmaxServiceTypes.map((service) => {
  return {
    id: service.id,
    title: service.name,
    src: service.icon,
    content: getServices(service.services),
  };
});

const cards = [
  {
    description: "Hair Styling",
    title: "Hair Styling",
    src: hair,
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Lana Del Rey, an iconic American singer-songwriter, is celebrated for
          her melancholic and cinematic music style. Born Elizabeth Woolridge
          Grant in New York City, she has captivated audiences worldwide with
          her haunting voice and introspective lyrics. <br /> <br /> Her songs
          often explore themes of tragic romance, glamour, and melancholia,
          drawing inspiration from both contemporary and vintage pop culture.
          With a career that has seen numerous critically acclaimed albums, Lana
          Del Rey has established herself as a unique and influential figure in
          the music industry, earning a dedicated fan base and numerous
          accolades.
        </p>
      );
    },
  },
  {
    description: "Body Care & Treatments",
    title: "Body Care & Treatments",
    src: massage,
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Babu Maan, a legendary Punjabi singer, is renowned for his soulful
          voice and profound lyrics that resonate deeply with his audience. Born
          in the village of Khant Maanpur in Punjab, India, he has become a
          cultural icon in the Punjabi music industry. <br /> <br /> His songs
          often reflect the struggles and triumphs of everyday life, capturing
          the essence of Punjabi culture and traditions. With a career spanning
          over two decades, Babu Maan has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },

  {
    description: "Manicure & Pedicure",
    title: "Manicure & Pedicure",
    src: nails,
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Metallica, an iconic American heavy metal band, is renowned for their
          powerful sound and intense performances that resonate deeply with
          their audience. Formed in Los Angeles, California, they have become a
          cultural icon in the heavy metal music industry. <br /> <br /> Their
          songs often reflect themes of aggression, social issues, and personal
          struggles, capturing the essence of the heavy metal genre. With a
          career spanning over four decades, Metallica has released numerous hit
          albums and singles that have garnered them a massive fan following
          both in the United States and abroad.
        </p>
      );
    },
  },
  {
    description: "Facial & Makeup",
    title: "Facial & Makeup",
    src: facial,
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Himesh Reshammiya, a renowned Indian music composer, singer, and
          actor, is celebrated for his distinctive voice and innovative
          compositions. Born in Mumbai, India, he has become a prominent figure
          in the Bollywood music industry. <br /> <br /> His songs often feature
          a blend of contemporary and traditional Indian music, capturing the
          essence of modern Bollywood soundtracks. With a career spanning over
          two decades, Himesh Reshammiya has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },
  {
    description: "Waxing",
    title: "Waxing",
    src: waxing,
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Himesh Reshammiya, a renowned Indian music composer, singer, and
          actor, is celebrated for his distinctive voice and innovative
          compositions. Born in Mumbai, India, he has become a prominent figure
          in the Bollywood music industry. <br /> <br /> His songs often feature
          a blend of contemporary and traditional Indian music, capturing the
          essence of modern Bollywood soundtracks. With a career spanning over
          two decades, Himesh Reshammiya has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },
  {
    description: "Bridal Packages",
    title: "Bridal Packages",
    src: bridal,
    ctaText: "Visit",
    ctaLink: "https://ui.aceternity.com/templates",
    content: () => {
      return (
        <p>
          Himesh Reshammiya, a renowned Indian music composer, singer, and
          actor, is celebrated for his distinctive voice and innovative
          compositions. Born in Mumbai, India, he has become a prominent figure
          in the Bollywood music industry. <br /> <br /> His songs often feature
          a blend of contemporary and traditional Indian music, capturing the
          essence of modern Bollywood soundtracks. With a career spanning over
          two decades, Himesh Reshammiya has released numerous hit albums and
          singles that have garnered him a massive fan following both in India
          and abroad.
        </p>
      );
    },
  },
];
