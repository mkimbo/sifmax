"use client";
import React, { useState } from "react";

// import Admin from "../../containers/Admin/Admin";

import logo from "../../assets/icons/logo.png";
import classes from "./Footer.module.scss";
import { useTranslation } from "@/i18n";

const Footer = () => {
  const [admin, setAdmin] = useState(false);
  const t = useTranslation();
  const switchAdmin = () => {
    document.body.style.overflow = !admin ? "hidden" : "visible";
    setAdmin(!admin);
  };

  const closePanel = () => {
    document.body.style.overflow = "auto";
    setAdmin(false);
  };

  return (
    <div className={classes.Footer}>
      <div className={classes.Wrapper}>
        {/* <img className={classes.Logo} src={logo} alt='Sifmax Beauty Parlour Ealing Logo' /> */}
        <div className={classes.Content}>
          <p>
            &copy; {new Date().getFullYear()} Sifmax Beauty Parlour.{" "}
            <br className={classes.Break} />
            All Rights Reserved.
          </p>
          <p>
            Created by{" "}
            <span>
              <a
                href="https://acidcatdigital.com/"
                target="_blank"
                rel="noopener noreferrer"
              >
                AcidCat Digital
              </a>
            </span>
          </p>
        </div>
        {/* <button className={classes.Admin} onClick={switchAdmin}>
          Admin
        </button> */}
      </div>

      {/* {admin ? <Admin closePanel={() => closePanel()} /> : null} */}
    </div>
  );
};

export default Footer;
