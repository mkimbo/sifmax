"use client";
import React, { useState, useEffect } from "react";

import classes from "./Banner.module.scss";

import banner_01 from "../../assets/images/sifmax7.png";
import banner_02 from "../../assets/images/sifmax8.png";
import banner_03 from "../../assets/images/sifmax3.png";
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

const Banner = () => {
  const [active, setActive] = useState(1);
  const t = useTranslation();
  useEffect(() => {
    const interval = setInterval(() => {
      setActive(active + 1 <= 3 ? active + 1 : 1);
    }, 7000);

    return () => clearInterval(interval);
  });

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
            <Image
              className={[
                classes.Image,
                active === 1 ? classes.Active : "",
                active === 3 ? classes.Hidden : "",
              ].join(" ")}
              src={banner_01}
              priority={true}
              blurDataURL={getBlurDataUrl()}
              placeholder="blur"
              alt="Sifmax Beauty Parlour Dar es Salaam"
            />
            <Image
              className={[
                classes.Image,
                active === 2 ? classes.Active : "",
                active === 1 ? classes.Hidden : "",
              ].join(" ")}
              src={banner_02}
              priority={true}
              blurDataURL={getBlurDataUrl()}
              placeholder="blur"
              alt="Sifmax Beauty Parlour Dar es Salaam"
            />
            <Image
              className={[
                classes.Image,
                active === 3 ? classes.Active : "",
                active === 2 ? classes.Hidden : "",
              ].join(" ")}
              priority={true}
              src={banner_03}
              blurDataURL={getBlurDataUrl()}
              placeholder="blur"
              alt="Sifmax Beauty Parlour Dar es Salaam"
            />
          </div>
        </div>

        <div className={classes.Dots}>
          <div
            className={[classes.Dot, active === 1 ? classes.Active : ""].join(
              " "
            )}
            onClick={() => setActive(1)}
          />
          <div
            className={[classes.Dot, active === 2 ? classes.Active : ""].join(
              " "
            )}
            onClick={() => setActive(2)}
          />
          <div
            className={[classes.Dot, active === 3 ? classes.Active : ""].join(
              " "
            )}
            onClick={() => setActive(3)}
          />
        </div>
      </div>

      <a className={`${classes.Scroll} hidden md:flex`} href="#about">
        <ChevronDown className="animate-bounce" size={32} />
      </a>
    </div>
  );
};

export default Banner;
