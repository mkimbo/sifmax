"use client";

import React, { useState, useEffect, use } from "react";
import classes from "./Services.module.scss";
import { services, categories, types } from "./availableServices";
import expand from "../../assets/icons/scroll.png";
import Image from "next/image";
import { getUrlWhatsappMessage } from "@/lib/utils";

const Services = () => {
  const [activeCategory, setActiveCategory] = useState<number>(1);
  const [activeType, setActiveType] = useState<number | null>(null);
  const [activeServices, setActiveServices] = useState<any[]>([]);
  const [booking, setBooking] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [whatsAppMsg, setWhatsAppMsg] = useState("");

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
    setActiveType(isMobile ? null : categories[category - 1].types[0]);
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
    const service = services.find((service) => service.id === id);
    return service ? service : null;
  };

  useEffect(() => {
    setWhatsAppMsg(
      getUrlWhatsappMessage(activeServices.map((i) => getService(i)))
    );
  }, [activeServices]);

  const selectedServices = activeType != null && (
    <div className={classes.Services}>
      {types[activeType - 1].services.map((service) => (
        <div
          className={[
            classes.Service,
            activeServices.includes(service) ? classes.ActiveService : "",
          ].join(" ")}
          onClick={() => switchService(service)}
          key={service}
        >
          <div className={classes.Line}>
            <p className={classes.Name}>{services[service - 1].name}</p>
            <p className={classes.Price}>
              now £
              {("" + services[service - 1].price).includes(".")
                ? services[service - 1].price.toFixed(2)
                : services[service - 1].price}
            </p>
          </div>

          <div className={classes.Line}>
            <p className={classes.Time}>
              {services[service - 1].duration >= 60 &&
                ~~(services[service - 1].duration / 60) + " hrs"}{" "}
              {services[service - 1].duration % 60 !== 0
                ? (services[service - 1].duration % 60) + " mins"
                : ""}
            </p>
            <p className={classes.Discount}>save up to 20%</p>
          </div>
        </div>
      ))}

      <a
        className={[
          classes.Book,
          activeServices.length !== 0 ? classes.ActiveBook : "",
        ].join(" ")}
        target="_blank"
        rel="noopener noreferrer"
        href={"https://wa.me/254713786782?text=" + whatsAppMsg}
        // onClick={() => {
        //   console.log(
        //     getUrlWhatsappMessage(activeServices.map((i) => getService(i))),
        //     "services"
        //   );
        // }}
      >
        Book now
      </a>
    </div>
  );

  return (
    <div className={classes.Services}>
      <div className={classes.Categories}>
        {categories.map((category) => (
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
        {categories[activeCategory - 1].types.map((type) => (
          <React.Fragment key={types[type - 1].name}>
            <div
              className={[
                classes.Type,
                activeType === types[type - 1].id ? classes.Active : "",
              ].join(" ")}
              onClick={() => switchType(types[type - 1].id)}
            >
              <p className={classes.Name}>{types[type - 1].name}</p>
              {types[type - 1].services.some((e) =>
                activeServices.includes(e)
              ) && <div className={classes.Contain} />}
              <Image
                className={[
                  classes.Expand,
                  activeType === types[type - 1].id ? classes.ExpandOpen : "",
                ].join(" ")}
                src={expand}
                alt="Expand"
              />
            </div>

            {activeType === types[type - 1].id && isMobile && selectedServices}
          </React.Fragment>
        ))}
      </div>

      {!isMobile && selectedServices}
    </div>
  );
};

export default Services;