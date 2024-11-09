import React from "react";

import classes from "./Section.module.scss";
import localFont from "next/font/local";

const Section = (props: any) => {
  return (
    <section className={classes.Section} id={props.id}>
      <div className={classes.Main}>
        <h1 className={classes.Meta}>{props.meta}</h1>
        <h1 className={classes.Name}>{props.name}</h1>
        <div className={classes.Line} />
        <p className={classes.Description}>{props.description}</p>
      </div>

      {props.children}
    </section>
  );
};

export default Section;
