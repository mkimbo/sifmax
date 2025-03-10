"use client";
import React, { useState } from "react";
// import axios from 'axios';
// import { BACKEND_DOMAIN } from '../../../config/constants';

import classes from "./Form.module.scss";
import Spinner from "@/components/Spinner/Spinner";
import { useRouter } from "next/navigation";
import { useTranslation } from "@/i18n";

const isEmailAddress = (str: string) => {
  const pattern =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return pattern.test(str);
};

const Form = () => {
  const [message, setMessage] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    time: "",
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string>("");
  const router = useRouter();
  const t = useTranslation();
  const onSubmit = (event: any) => {
    event.preventDefault();

    setLoading(true);

    message.time =
      new Date().getDate() +
      "/" +
      (new Date().getMonth() + 1) +
      "/" +
      new Date().getFullYear() +
      " " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes();

    if (
      message.name === "" ||
      message.email === "" ||
      message.phone === "" ||
      message.message === "" ||
      message.time === ""
    ) {
      setResult("Please, fill in all required fields.");
      setLoading(false);
    } else if (!isEmailAddress(message.email)) {
      setResult("Please, provide a valid email address.");
      setLoading(false);
    } else {
      console.log(message, "message");
      setLoading(false);
      router.push(
        `https://wa.me/255713786782?text= + ${encodeURI(
          message.message.toString().replaceAll("&", "and")
        )}`
      );
      // axios.post(BACKEND_DOMAIN + 'message/beautyatluxx', { message: message })
      //     .then(response => {
      //         setLoading(false);
      //         setResult('Your message has been delivered.');
      //         setMessage({ name: '', email: '', phone: '', message: '', time: '' });
      //     })
      //     .catch(error => {
      //         setResult('Something went wrong! Please, try again.');
      //         setLoading(false);
      //     });
    }
  };

  return (
    <form className={classes.Form}>
      {loading && (
        <div className={classes.Modal}>
          <Spinner />
        </div>
      )}

      <div className={classes.Input}>
        <input
          className={classes.Field}
          value={message.name}
          onChange={(event) =>
            setMessage({ ...message, name: event.target.value })
          }
          type="text"
          placeholder={t("contact.form.name")}
        />
      </div>

      <div className={classes.Input}>
        <input
          className={classes.Field}
          value={message.email}
          onChange={(event) =>
            setMessage({ ...message, email: event.target.value })
          }
          type="email"
          placeholder={t("contact.form.email")}
        />
      </div>

      <div className={classes.Input}>
        <input
          className={classes.Field}
          value={message.phone}
          onChange={(event) =>
            setMessage({ ...message, phone: event.target.value })
          }
          type="tel"
          placeholder={t("contact.form.mobile")}
        />
      </div>

      <div className={classes.Input}>
        <textarea
          className={[classes.Field, classes.Textarea].join(" ")}
          value={message.message}
          onChange={(event) =>
            setMessage({ ...message, message: event.target.value })
          }
          placeholder={t("contact.form.message")}
        />
      </div>

      {result && <p className={classes.Result}>{result}</p>}

      <button className={classes.Send} type="submit" onClick={onSubmit}>
        {t("contact.form.submit")}
      </button>
    </form>
  );
};

export default Form;
