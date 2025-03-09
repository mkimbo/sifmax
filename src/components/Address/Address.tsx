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

      <div className="flex flex-col gap-2 items-center justify-center md:items-start text-sm">
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

      <div className="flex flex-col gap-2 items-center justify-center md:items-start text-sm w-fit">
        <h3 className="font-bold text-lg">{t("footer.visit")}</h3>
        <div>
          <a
            rel="noreferrer noopener"
            href="https://www.google.com/maps/place/SIFMAX+BEAUTY+PARLOUR/@-6.8827421,39.2851639,17z/data=!4m12!1m5!8m4!1e1!2s113267895957343970693!3m1!1e1!3m5!1s0x185c4f3c7efb8067:0xa4a7b4579fb04161!8m2!3d-6.8827421!4d39.2851639!16s%2Fg%2F11y8p8td8w?hl=en&entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D"
            className="opacity-60 text-white hover:opacity-100"
          >
            Sinza, Dar es Salaam
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="mailto:sifmaxbeautyparlour@gmail.com"
            className="opacity-60 text-white hover:opacity-100 "
          >
            sifmaxbeautyparlour@gmail.com
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="tel:+255713786782"
            className="opacity-60 text-white hover:opacity-100"
          >
            +255 713 786 782
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
      <div className="flex flex-col gap-2 items-center justify-center md:items-start text-sm">
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
            href="https://www.threads.net/@sifmax_beauty_parlour"
            className="opacity-60 text-white hover:opacity-100"
          >
            Threads
          </a>
        </div>
        <div>
          <a
            rel="noreferrer noopener"
            href="https://www.tiktok.com/@sifmax_beauty"
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
