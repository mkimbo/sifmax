"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import localFont from "next/font/local";
import { useTranslation } from "@/i18n";
import { ChevronDown } from "lucide-react";
import { getBlurDataUrl } from "@/lib/utils";

// Example image imports – replace with your own
import banner_01 from "../../assets/images/sifmax7.png";
import banner_02 from "../../assets/images/sifmax8.png";
import banner_03 from "../../assets/images/sifmax3.png";

// Load local fonts
const satisfy = localFont({
  src: "../../app/fonts/Satisfy.ttf",
  variable: "--font-satisfy",
  weight: "400",
});

const suranna = localFont({
  src: "../../app/fonts/Suranna.ttf",
  variable: "--font-suranna",
  weight: "400",
});

const BannerTailwind = () => {
  const [active, setActive] = useState(1);
  const t = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => (prev + 1 <= 3 ? prev + 1 : 1));
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`
        relative w-full h-[calc(100vh-4em)] mt-[4em]
        md:h-auto md:mt-[5em]
        lg:h-[calc(100vh-5em)]
      `}
    >
      {/* Main Section */}
      <div
        className={`
          relative w-full h-[calc(100vh-4em-3vh)] bg-black
          md:h-auto md:py-[3.5em] md:flex md:items-center
          lg:h-[calc(100vh-5em-4vh)] lg:p-0
        `}
      >
        <div
          className={`
            flex flex-col-reverse w-full
            md:w-[90%] md:mx-auto md:flex-row md:justify-between
            lg:w-[85%] lg:h-[80%] lg:mx-auto
          `}
        >
          {/* Text Area */}
          <div
            className={`
              w-[90%] mx-auto
              md:w-[45vw] md:h-[45vw] md:flex md:flex-col md:justify-between
              lg:w-[calc(100vw-(100%-30%))] lg:h-full lg:m-0
            `}
          >
            <h2
              className={`
                ${satisfy.variable} text-[6vh] text-white leading-none
                md:text-[6vw] md:m-0
                lg:text-[6vw]
              `}
            >
              the finest
            </h2>
            <h1
              className={`
                ${suranna.variable} text-[7vh] uppercase leading-none
                text-[#C2A359] /* Replace with your gold color */
                md:text-[7.75vw] md:m-0
                lg:text-[7vw]
              `}
            >
              Hair &amp; Beauty
              <br />
              Spot in Dar
            </h1>

            <div
              className={`
                w-16 h-[3px] bg-white my-[2.5vh]
                md:my-[1.5vh]
                lg:w-[5em] lg:h-[4px] lg:my-[1.5vh]
              `}
            />

            <p
              className={`
                text-gray-300 text-[4vw] leading-[1.5em] mb-[1.5em]
                font-[Poppins,sans-serif]
                md:text-[2vw] md:mb-[0.5em] md:w-[87.5%]
                lg:text-[1.25em] lg:w-[90%]
              `}
            >
              {t("banner.description")}
            </p>

            <a
              href="#services"
              className={`
                inline-block h-[3.5em] leading-[3.5em] px-6
                text-white text-sm border border-[#C2A359]
                transition-all duration-300
                hover:bg-[#C2A359] hover:text-black
                md:text-base
                lg:text-[1em]
              `}
            >
              {t("banner.cta")}
            </a>
          </div>

          {/* Images / Carousel */}
          <div
            className={`
              w-full mb-[2.5vh]
              md:w-[45vw] md:h-[45vw] md:relative md:mb-0
              lg:w-[40vw] lg:h-[40vw] lg:max-w-[calc((100vh-5em-4vh)*0.8)] lg:max-h-full
            `}
          >
            {/* Banner 1 */}
            <Image
              src={banner_01}
              alt="Sifmax Beauty Parlour Dar es Salaam"
              placeholder="blur"
              blurDataURL={getBlurDataUrl()}
              priority={true}
              className={`
                transition-all duration-300 w-full h-[40vh] object-cover hidden
                ${active === 1 ? "block" : ""}
                ${active === 3 ? "hidden" : ""}
                md:absolute md:bottom-0 md:left-0 md:w-[42.5vw] md:h-[42.5vw] md:brightness-50
                ${
                  active === 1
                    ? "md:top-0 md:right-0 md:bottom-auto md:left-auto md:z-40 md:brightness-100 md:shadow-[0_2px_44px_rgba(0,0,0,0.16)]"
                    : ""
                }
              `}
            />
            {/* Banner 2 */}
            <Image
              src={banner_02}
              alt="Sifmax Beauty Parlour Dar es Salaam"
              placeholder="blur"
              blurDataURL={getBlurDataUrl()}
              priority={true}
              className={`
                transition-all duration-300 w-full h-[40vh] object-cover hidden
                ${active === 2 ? "block" : ""}
                ${active === 1 ? "hidden" : ""}
                md:absolute md:bottom-0 md:left-0 md:w-[42.5vw] md:h-[42.5vw] md:brightness-50
                ${
                  active === 2
                    ? "md:top-0 md:right-0 md:bottom-auto md:left-auto md:z-40 md:brightness-100 md:shadow-[0_2px_44px_rgba(0,0,0,0.16)]"
                    : ""
                }
              `}
            />
            {/* Banner 3 */}
            <Image
              src={banner_03}
              alt="Sifmax Beauty Parlour Dar es Salaam"
              placeholder="blur"
              blurDataURL={getBlurDataUrl()}
              priority={true}
              className={`
                transition-all duration-300 w-full h-[40vh] object-cover hidden
                ${active === 3 ? "block" : ""}
                ${active === 2 ? "hidden" : ""}
                md:absolute md:bottom-0 md:left-0 md:w-[42.5vw] md:h-[42.5vw] md:brightness-50
                ${
                  active === 3
                    ? "md:top-0 md:right-0 md:bottom-auto md:left-auto md:z-40 md:brightness-100 md:shadow-[0_2px_44px_rgba(0,0,0,0.16)]"
                    : ""
                }
              `}
            />
          </div>
        </div>

        {/* Dots */}
        <div
          className={`
            hidden md:flex md:flex-col absolute right-0
          `}
        >
          <div
            onClick={() => setActive(1)}
            className={`
              w-[0.75em] h-[0.75em] bg-white rounded-full cursor-pointer
              my-[5px] mr-[1.75vw] transition-all duration-300
              hover:bg-[#a28282]
              ${active === 1 ? "bg-[#C2A359]" : ""}
            `}
          />
          <div
            onClick={() => setActive(2)}
            className={`
              w-[0.75em] h-[0.75em] bg-white rounded-full cursor-pointer
              my-[5px] mr-[1.75vw] transition-all duration-300
              hover:bg-[#a28282]
              ${active === 2 ? "bg-[#C2A359]" : ""}
            `}
          />
          <div
            onClick={() => setActive(3)}
            className={`
              w-[0.75em] h-[0.75em] bg-white rounded-full cursor-pointer
              my-[5px] mr-[1.75vw] transition-all duration-300
              hover:bg-[#a28282]
              ${active === 3 ? "bg-[#C2A359]" : ""}
            `}
          />
        </div>
      </div>

      {/* Scroll Down Arrow */}
      <a
        className={`
          hidden md:flex justify-center items-center
          w-[6vh] h-[6vh] mx-auto mt-[-3vh]
          shadow-[0_0_18px_rgba(0,0,0,0.06)]
          text-[#C2A359]
          transition-all duration-300
          lg:w-[6.5vh] lg:h-[6.5vh] lg:flex
        `}
        href="#about"
      >
        <ChevronDown className="animate-bounce" size={32} />
      </a>
    </div>
  );
};

export default BannerTailwind;
