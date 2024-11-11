"use client";
import { useTranslation } from "@/i18n";
import Logo from "../../assets/icons/sifmax-fav.png";
import Image from "next/image";
const Address = () => {
  const t = useTranslation();
  return (
    <section className="w-full xl:w-[80%] grid grid-cols-2 md:grid-cols-4 justify-stretch gap-y-8 text-primary/80 montserrat mx-auto py-10">
      <div className="flex flex-col gap-2 items-center justify-center md:items-start">
        <Image
          className="w-fit h-24 "
          src={Logo}
          alt="Sifmax Beauty Parlour Logo"
        />
      </div>

      <div className="flex flex-col gap-2 items-center justify-center md:items-start">
        <h3 className="font-bold text-lg">{t("footer.opening")}</h3>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 text-white hover:opacity-100"
          >
            {t("footer.openingTime")}
          </a>
        </div>

        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 text-white hover:opacity-100"
          >
            {t("footer.ready")}
          </a>
        </div>

        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 text-white hover:opacity-100"
          >
            24/7
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-2 items-center justify-center md:items-start">
        <h3 className="font-bold text-lg">{t("footer.visit")}</h3>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 text-white hover:opacity-100"
          >
            Sinza, Dar es Salaam
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 text-white hover:opacity-100"
          >
            sifmax@gmail.com
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="#"
            className="opacity-60 text-white hover:opacity-100"
          >
            0713786782
          </a>
        </div>

        {/* <p className="opacity-60 text-white hover:opacity-100 text-center justify-center md:text-left font">
          <span>Address: </span>
          43 High Street, Ealing,
          <br />
          London, W5 5DB
          <br />
          <span>Phone: </span>
          +44 7342 216193
          <br />
          <span>Email: </span>
          letscomit@gmail.com
          <br />
        </p> */}
      </div>
      <div className="flex flex-col gap-2 items-center justify-center md:items-start">
        <h3 className="font-bold text-lg ">{t("footer.online")}</h3>
        <div>
          <a
            rel="noreferrer noopener"
            href="https://www.instagram.com/sifmax_beauty_parlour/#/"
            className="opacity-60 text-white hover:opacity-100"
          >
            Instagram
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="https://www.instagram.com/sifmax_beauty_parlour/#/"
            className="opacity-60 text-white hover:opacity-100"
          >
            Facebook
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="https://www.instagram.com/sifmax_beauty_parlour/#/"
            className="opacity-60 text-white hover:opacity-100"
          >
            TikTok
          </a>
        </div>
      </div>
    </section>
  );
};

export default Address;
