import React from "react";

import Form from "./Form/Form";
import Map from "./Map/Map";

import classes from "./Contacts.module.scss";

const Contacts = () => {
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
          <h1 className={classes.Text}>Get in touch</h1>
          <div className={classes.Line} />
          <p className={classes.Description}>
            Have any questions? Feel free to use contact form below to get in
            touch with us. We will answer you as soon as possible!
          </p>

          <Form />
        </div>
      </div>
    </div>
  );
};

export default Contacts;
