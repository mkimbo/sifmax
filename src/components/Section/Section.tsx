"use client";
import React from "react";

import classes from "./Section.module.scss";
import { useTranslation } from "@/i18n";

const Section = (props: any) => {
  const t = useTranslation();
  return (
    <section className={classes.Section} id={props.id}>
      <div className={classes.Main}>
        {/* <h1 className={classes.Meta}>{t(props.meta)}</h1> */}
        <h1 className={classes.Name}>{t(props.name)}</h1>
        <div className={classes.Line} />
        <p className={classes.Description}>{t(props.description)}</p>
      </div>

      {props.children}
    </section>
  );
};

export default Section;
