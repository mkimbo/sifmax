"use client";
import React, { useState, useEffect } from "react";

import classes from "./Banner.module.scss";

import banner_01 from "../../assets/images/sifmax7.png";
import banner_02 from "../../assets/images/sifmax8.png";
import banner_03 from "../../assets/images/sifmax3.png";
import banner_04 from "../../assets/images/sifmax4.png";
import banner_05 from "../../assets/images/sifmax5.png";
import nails1 from "../../assets/images/nails1.jpeg";
import nails2 from "../../assets/images/nails3.jpeg";
import hair1 from "../../assets/images/hair2.jpeg";
import hair2 from "../../assets/images/hair1.jpeg";
import shortBlonde from "../../assets/images/review1.jpeg";
import nailsClient from "../../assets/images/review3.jpeg";
import Image from "next/image";
import localFont from "next/font/local";
import { useTranslation } from "@/i18n";
import { ChevronDown, MoveDown } from "lucide-react";
import { getBlurDataUrl } from "@/lib/utils";

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

const bannerItems = [
  { src: banner_01, alt: "Sifmax Beauty Parlour Dar es Salaam" },
  {
    src: hair1,
    alt: "A satisfied hair styling client at Sifmax Beauty Parlour Dar es Salaam",
  },
  {
    src: nails2,
    alt: "A satisfied manicure client at Sifmax Beauty Parlour Dar es Salaam",
  },
  {
    src: hair2,
    alt: "A satisfied hair styling client at Sifmax Beauty Parlour Dar es Salaam",
  },
  { src: banner_03, alt: "Sifmax Beauty Parlour Dar es Salaam" },
];

const Banner = () => {
  const [active, setActive] = useState(1);
  const t = useTranslation();
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(active + 1 <= bannerItems.length ? active + 1 : 1);
    }, 7000);

    return () => clearInterval(interval);
  });

  type BannerImage = {
    src: string;
    alt: string;
  };

  return (
    <div className={classes.Banner}>
      <div className={classes.Main}>
        <div className={classes.Holder}>
          <div className={classes.Text}>
            <h2 className={`${satisfy.variable}`}>the finest</h2>
            <h1 className={`${suranna.variable}`}>
              Hair & Beauty
              <br />
              Spot in Dar
            </h1>
            <div className={classes.Line} />
            <p>{t("banner.description")}</p>
            <a href="#services">{t("banner.cta")}</a>
          </div>

          <div className={classes.Images}>
            {bannerItems.map((banner, index) => (
              <Image
                key={index}
                className={[
                  classes.Image,
                  active === index + 1 ? classes.Active : "",
                  active === ((index + 2) % 3) + 1 ? classes.Hidden : "",
                ].join(" ")}
                src={banner.src}
                priority={true}
                blurDataURL={getBlurDataUrl()}
                placeholder="blur"
                alt={banner.alt}
              />
            ))}
          </div>
        </div>

        <div className={classes.Dots}>
          {bannerItems.map((dot, index) => (
            <div
              key={index + 1}
              className={[
                classes.Dot,
                active === index + 1 ? classes.Active : "",
              ].join(" ")}
              onClick={() => setActive(index + 1)}
            />
          ))}
        </div>
      </div>

      <a className={`${classes.Scroll} hidden md:flex `} href="#about">
        <ChevronDown className="animate-bounce" size={32} />
      </a>
    </div>
  );
};

export default Banner;
