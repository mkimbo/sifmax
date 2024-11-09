import React from "react";

import classes from "./About.module.scss";

import salon from "../../assets/images/salon.jpeg";
import nails from "../../assets/icons/nails.png";
import waxing from "../../assets/icons/waxing.png";
import makeup from "../../assets/icons/makeup.png";
import massage from "../../assets/icons/massage.png";
import Image from "next/image";

const About = () => {
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
          <p className={classes.Description}>
            Professional nail care services that pamper your hands and feet
            while ensuring healthy, beautiful nails.
          </p>
        </div>

        <div className={classes.Service}>
          <Image className={classes.Icon} src={waxing} alt="Waxing" />
          <h2 className={classes.Name}>Waxing</h2>
          <p className={classes.Description}>
            Gentle and effective hair removal treatments using premium wax for
            smooth, long-lasting results.
          </p>
        </div>

        <div className={classes.Service}>
          <Image className={classes.Icon} src={makeup} alt="Make-up" />
          <h2 className={classes.Name}>Make-up</h2>
          <p className={classes.Description}>
            Expert makeup application using high-quality products to enhance
            your natural beauty for any occasion.
          </p>
        </div>

        <div className={classes.Service}>
          <Image
            className={classes.Icon}
            src={massage}
            alt="Massage & Treatment"
          />
          <h2 className={classes.Name}>Massage & Treatment</h2>
          <p className={classes.Description}>
            Relaxing therapeutic massages and body treatments designed to reduce
            stress and promote wellness.
          </p>
        </div>
      </div>

      <Image className={classes.Image} src={salon} alt="Beauty Salon" />
    </div>
  );
};

export default About;
