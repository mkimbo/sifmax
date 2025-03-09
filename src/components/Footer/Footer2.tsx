import Image from "next/image";
import Link from "next/link";
import Logo from "../../assets/icons/sifmax-fav.png";
const FooterItem = ({ text, link }: { text: string; link: string }) => {
  return (
    <li>
      <Link href={link}>{text}</Link>
    </li>
  );
};

const footerItems = [
  {
    id: 1,
    text: "Instagram",
    link: "https://www.instagram.com/sifmax_beauty_parlour/#/",
  },
  {
    id: 2,
    text: "Tiktok",
    link: "https://www.tiktok.com/@sifmax_beauty",
  },
  {
    id: 3,
    text: "Threads",
    link: "https://www.threads.net/@sifmax_beauty_parlour",
  },
];

const FooterBlock = () => {
  return (
    <footer className="pt-2">
      <div className="px-2 sm:px-0">
        <div className="mx-auto w-full max-w-6xl bg-black p-5 sm:p-10 py-10 sm:py-14 md:py-16 rounded-3xl relative overflow-hidden">
          <div className="relative flex flex-col items-center text-center text-base">
            <Image
              className="w-fit h-32"
              src={Logo}
              alt="Sifmax Beauty Parlour Logo"
            />
            <p className=" text-gray-300 max-w-xl">
              <a className="underline font-bold" href="tel:+255713786782">
                +255 713 786 782
              </a>
              .
            </p>
            <p className=" text-gray-300 max-w-xl">
              <a
                className="underline font-bold"
                href="mailto:sifmaxbeautyparlour@gmail.com"
              >
                sifmaxbeautyparlour@gmail.com
              </a>
              .
            </p>
            <p className=" text-gray-300 max-w-xl">
              We are open 24/7 in{" "}
              <a
                className="underline font-bold"
                href="https://www.google.com/maps/place/SIFMAX+BEAUTY+PARLOUR/@-6.8827421,39.2851639,17z/data=!4m12!1m5!8m4!1e1!2s113267895957343970693!3m1!1e1!3m5!1s0x185c4f3c7efb8067:0xa4a7b4579fb04161!8m2!3d-6.8827421!4d39.2851639!16s%2Fg%2F11y8p8td8w?hl=en&entry=ttu&g_ep=EgoyMDI1MDMwNC4wIKXMDSoASAFQAw%3D%3D"
              >
                Sinza, Dar es Salaam
              </a>
              .
            </p>
            {/* <div className="flex justify-center mt-10">
              <Link
                href="#"
                className="gap-x-3 font-display bg-white text-gray-900 hover:bg-gray-100/90 px-8 h-12 rounded-full flex items-center"
              >
                Lets talk
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M2 10a.75.75 0 01.75-.75h12.59l-2.1-1.95a.75.75 0 111.02-1.1l3.5 3.25a.75.75 0 010 1.1l-3.5 3.25a.75.75 0 11-1.02-1.1l2.1-1.95H2.75A.75.75 0 012 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </Link>
            </div> */}
          </div>
        </div>
      </div>
      <div className="bg-black pt-60 -mt-48 px-4 sm:px-10 md:px-12 lg:px-8">
        <div className="w-full max-w-7xl mx-auto flex flex-col text-sm md:text-base sm:flex-row sm:justify-between items-center gap-y-5 py-3 border-t-[0.5px] border-t-gray-700 ">
          <p className="text-[#969494] text-center md:text-left ">
            &copy; {new Date().getFullYear()}{" "}
            <span className="font-bold text-[#b99a5b] ">
              Sifmax Beauty Parlour.
            </span>{" "}
            All Rights Reserved.
          </p>
          <nav>
            <ul className="flex items-center gap-x-5 text-[#969494] ">
              {footerItems.map((footerItem) => (
                <FooterItem key={footerItem.id} {...footerItem} />
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default FooterBlock;
