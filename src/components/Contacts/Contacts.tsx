"use client";
import React from "react";

import Form from "./Form/Form";
import Map from "./Map/Map";

import classes from "./Contacts.module.scss";
import { useTranslation } from "@/i18n";

const Contacts = () => {
  const t = useTranslation();
  return (
    <div className={classes.Contacts}>
      <div className={classes.Map}>
        <Map
          location={{ lat: -6.821273528983166, lng: 39.278101745532666 }}
          zoom={20}
        />
      </div>

      <div className={classes.Container}>
        <div className={classes.Wrapper}>
          <h1 className={classes.Text}>{t("contact.form.title")}</h1>
          <div className={classes.Line} />
          <p className={classes.Description}>{t("contact.form.legend")}</p>

          <Form />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
