"use client";
import React, { useState, useEffect } from "react";
import Logo from "../../assets/icons/logo-small.png";
import classes from "./Navigation.module.scss";
import { Languages, Menu, X } from "lucide-react";
import { useAppContext, useAppDispatch } from "@/context/GlobalContext";
import { useTranslation } from "@/i18n";
import Image from "next/image";
import { useToast } from "@/hooks/use-toast";
import { useCart } from "@/context/CartContext";
import CartIcon from "../CartIcon/CartIcon";
import { useMediaQuery } from "@/hooks/use-media-query";

const Navigation = () => {
  const [expand, setExpand] = useState(false);
  const { cart, toggleCart } = useCart();
  const dispatch = useAppDispatch();
  const state = useAppContext();
  const t = useTranslation();
  const { toast } = useToast();

  const isMobile = useMediaQuery("(max-width: 1024px)");
  // React.useCallback(() => {
  //   const langCode = localStorage.getItem("sifmax-lang-code");
  //   if (langCode) {
  //     dispatch({ type: "SET_LANG_CODE", payload: langCode.toString() });
  //   } else {
  //     //dispatch({ type: "SET_LANG_CODE", payload: "en" });
  //   }
  // }, []);

  useEffect(() => {
    if (!expand) document.body.style.overflow = "visible";
    else document.body.style.overflow = "hidden";
  }, [expand]);

  const expandMenuHandler = (
    event: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) => {
    event.preventDefault();

    setExpand(!expand);
  };
  return (
    <nav
      className={[classes.Navigation, expand ? classes.Expand : ""].join(" ")}
    >
      <div className="absolute top-1/2 -translate-y-1/2 hidden lg:flex lg:left-6 z-[10000]">
        <CartIcon />
      </div>
      <div className="absolute top-1/2 -translate-y-1/2 right-[90%] lg:right-6 z-[10000]">
        {cart.length > 0 && isMobile ? (
          <CartIcon />
        ) : (
          <Languages
            onClick={() => {
              state.langCode === "en"
                ? dispatch({ type: "SET_LANG_CODE", payload: "sw" })
                : dispatch({ type: "SET_LANG_CODE", payload: "en" });
              toast({
                description: t("language.notification"),
              });
            }}
            className=" text-primary cursor-pointer"
          />
        )}
      </div>

      <div className={classes.Container}>
        <div className={classes.Hide} />

        <ul className={classes.Links}>
          <li>
            <a
              className={classes.Link}
              href="#"
              onClick={() => setExpand(false)}
            >
              {t("nav.discover")}
            </a>
          </li>
          <li>
            <a className={classes.Link} href="#testimonials">
              {t("nav.testimonials")}
            </a>
          </li>
          <li>
            <a
              className={classes.Link}
              href="#about"
              onClick={() => setExpand(false)}
            >
              {t("nav.about")}
            </a>
          </li>

          <li>
            <a href="#" onClick={() => setExpand(false)}>
              <Image className={classes.Logo} src={Logo} alt="Sifmax Logo" />
            </a>
          </li>
          <li>
            <a
              className={classes.Link}
              href="#services"
              onClick={() => setExpand(false)}
            >
              {t("nav.services")}
            </a>
          </li>
          <li>
            <a
              className={classes.Link}
              href="#gallery"
              onClick={() => setExpand(false)}
            >
              {t("nav.gallery")}
            </a>
          </li>

          <li>
            <a
              className={classes.Link}
              href="#contact"
              onClick={() => setExpand(false)}
            >
              {t("nav.contact")}
            </a>
          </li>
        </ul>
        {expand === true ? (
          <X
            className={`${classes.Menu} text-primary`}
            onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              expandMenuHandler(event)
            }
          />
        ) : (
          <Menu
            className={`${classes.Menu} text-primary`}
            onClick={(event: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
              expandMenuHandler(event)
            }
          />
        )}
        {/* <button
          className={classes.Menu}
          onClick={(event) => expandMenuHandler(event)}
        /> */}
      </div>
    </nav>
  );
};

export default Navigation;
