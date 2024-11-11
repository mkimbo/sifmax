"use client";

import React, { useState, useEffect, use } from "react";
import classes from "./Services.module.scss";
import {
  sifmaxCategories,
  sifmaxServices,
  sifmaxTypes,
} from "./availableServices";
import expand from "../../assets/icons/scroll.png";
import Image from "next/image";
import { getUrlWhatsappMessage } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [activeType, setActiveType] = useState<number | null>(null);
  const [activeServices, setActiveServices] = useState<any[]>([]);
  const [booking, setBooking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [whatsAppMsg, setWhatsAppMsg] = useState("");
  const router = useRouter();
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 720);
      setActiveType(window.innerWidth >= 720 ? 1 : null);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const switchCategory = (category: number) => {
    setActiveType(
      isMobile && category === 1
        ? null
        : sifmaxCategories[category - 1].types[0]
    );
    setActiveCategory(category);
  };

  const switchType = (type: number) => {
    if (activeType === type && isMobile) {
      setActiveType(null);
    } else {
      setActiveType(type);
    }
  };

  const switchService = (service: any) => {
    setActiveServices((prev) =>
      prev.includes(service)
        ? prev.filter((serviceId) => serviceId !== service)
        : [...prev, service]
    );
  };

  const switchBooking = () => {
    document.body.style.overflow = !booking ? "hidden" : "visible";
    setBooking(!booking);
  };

  const getService = (id: number) => {
    const service = sifmaxServices.find((service) => service.id === id);
    return service ? service : null;
  };

  // useEffect(() => {
  //   setWhatsAppMsg(
  //     getUrlWhatsappMessage(activeServices.map((i) => getService(i)))
  //   );
  // }, [activeServices, getUrlWhatsappMessage, setWhatsAppMsg, getService]);

  const selectedServices = activeType != null && (
    <div className={classes.Services}>
      {sifmaxTypes[activeType - 1].services.map((service) => (
        <div
          className={[
            classes.Service,
            activeServices.includes(service) ? classes.ActiveService : "",
          ].join(" ")}
          onClick={() => switchService(service)}
          key={service}
        >
          <div className={classes.Line}>
            <p className={classes.Name}>{sifmaxServices[service - 1].name}</p>
            <p className={classes.Price}>
              {/* Tsh.{" "}
              {("" + sifmaxServices[service - 1].price).includes(".")
                ? sifmaxServices[service - 1].price.toFixed(2)
                : sifmaxServices[service - 1].price}
              k */}
            </p>
          </div>

          <div className={classes.Line}>
            <p className={classes.Time}>
              {sifmaxServices[service - 1].duration >= 60 &&
                ~~(sifmaxServices[service - 1].duration / 60) + " hrs"}{" "}
              {sifmaxServices[service - 1].duration % 60 !== 0
                ? (sifmaxServices[service - 1].duration % 60) + " mins"
                : ""}
            </p>
            <p className={classes.Discount}></p>
          </div>
        </div>
      ))}

      <div
        className={[
          classes.Book,
          activeServices.length !== 0 ? classes.ActiveBook : "",
        ].join(" ")}
        onClick={() => {
          const msg = getUrlWhatsappMessage(
            activeServices.map((i) => getService(i))
          );
          const url = "https://wa.me/254713786782?text=" + msg;
          // console.log(msg, "url", url);

          router.push(url);
        }}
      >
        Book now
      </div>
    </div>
  );

  return (
    <div className={classes.Services}>
      <div className={classes.Categories}>
        {sifmaxCategories.map((category) => (
          <div
            className={[
              classes.Category,
              activeCategory === category.id ? classes.Active : "",
            ].join(" ")}
            onClick={() => switchCategory(category.id)}
            key={category.id}
          >
            <Image src={category.icon} alt={category.name} />
            <p>{category.name}</p>
          </div>
        ))}
      </div>

      <div className={classes.Types}>
        {sifmaxCategories[activeCategory - 1].types.map((type) => (
          <React.Fragment key={sifmaxTypes[type - 1].name}>
            <div
              className={[
                classes.Type,
                activeType === sifmaxTypes[type - 1].id ? classes.Active : "",
              ].join(" ")}
              onClick={() => switchType(sifmaxTypes[type - 1].id)}
            >
              <p className={classes.Name}>{sifmaxTypes[type - 1].name}</p>
              {sifmaxTypes[type - 1].services.some((e) =>
                activeServices.includes(e)
              ) && <div className={classes.Contain} />}
              <Image
                className={[
                  classes.Expand,
                  activeType === sifmaxTypes[type - 1].id
                    ? classes.ExpandOpen
                    : "",
                ].join(" ")}
                src={expand}
                alt="Expand"
              />
            </div>

            {activeType === sifmaxTypes[type - 1].id &&
              isMobile &&
              selectedServices}
          </React.Fragment>
        ))}
      </div>

      {!isMobile && selectedServices}
    </div>
  );
};

export default Services;
