"use client";
import React, { useEffect, useRef } from "react";

import classes from "./About.module.scss";

import salon from "../../assets/images/salon.jpeg";
import nails from "../../assets/icons/nails.png";
import waxing from "../../assets/icons/waxing.png";
import makeup from "../../assets/icons/makeup.png";
import massage from "../../assets/icons/massage.png";
import hair from "../../assets/icons/hair-2.png";

import Image from "next/image";
import { useTranslation } from "@/i18n";

const About = () => {
  const t = useTranslation();

  const videoRef = useRef<HTMLVideoElement>(null);
  // const [showFallback] = useState<boolean>()

  useEffect(() => {
    const { current: video } = videoRef;
    if (video) {
      video.addEventListener("suspend", () => {
        // setShowFallback(true);
        // console.warn('Video was suspended, rendering fallback image.')
      });
    }
  }, []);
  return (
    <div className={classes.About}>
      <div className={classes.Services}>
        <div className={classes.Service}>
          <Image
            className={classes.Icon}
            src={nails}
            alt="Manicure & Pedicure"
          />
          <h2 className={classes.Name}>Manicure & Pedicure</h2>
          <p className={classes.Description}>{t("about.nails")}</p>
        </div>

        <div className={classes.Service}>
          <Image className={classes.Icon} src={massage} alt="Waxing" />
          <h2 className={classes.Name}>Body Care & Treatments</h2>
          <p className={classes.Description}>{t("about.body")}</p>
        </div>

        <div className={classes.Service}>
          <Image className={classes.Icon} src={makeup} alt="Make-up" />
          <h2 className={classes.Name}>Make Up</h2>
          <p className={classes.Description}>{t("about.makeup")}</p>
        </div>

        <div className={classes.Service}>
          <Image className={classes.Icon} src={hair} alt="Hair Styling" />
          <h2 className={classes.Name}>Hair Styling</h2>
          <p className={classes.Description}>{t("about.hair")}</p>
        </div>
      </div>

      {/* <Image className={classes.Image} src={salon} alt="Sifmax Beauty Parlour" /> */}
      <video
        autoPlay
        className={classes.Image}
        controls={false}
        loop
        muted
        onClick={() => {}}
        playsInline
        ref={videoRef}
      >
        <source src={`${process.env.NEXT_PUBLIC_SITE_URL}/sifmax.mp4`} />
      </video>
    </div>
  );
};

export default About;
