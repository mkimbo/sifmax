import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Navigation from "@/components/Navigation/Navigation";
import { GlobalProvider } from "@/context/GlobalContext";
import { Toaster } from "@/components/ui/toaster";
import { CartProvider } from "@/context/CartContext";
import Cart from "@/components/Cart/Cart";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const dancingScript = localFont({
  src: "./fonts/DancingScript-Variable.ttf",
  variable: "--font-dancing-script",
  weight: "400",
});

const montserrat = localFont({
  src: "./fonts/Montserrat-Variable.ttf",
  variable: "--font-montserrat",
  weight: "400",
});

const satisfy = localFont({
  src: "./fonts/Satisfy.ttf",
  variable: "--font-satisfy",
  weight: "400",
});

const poppins = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-poppins",
  weight: "400",
});
const siteURL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sifmax.com";
const title = "Sifmax Beauty Parlour | Hair, Makeup & Spa in Dar es Salaam";
const description =
  "Visit Sifmax Beauty Parlour in Sinza, Dar es Salaam for professional hair styling, makeup, body treatments, and more. Book now for a premium salon experience!";
export const metadata: Metadata = {
  metadataBase: new URL(siteURL),
  title: title,
  description: description,
  alternates: {
    canonical: siteURL,
  },
  openGraph: {
    title: title,
    description: description,
    url: siteURL,
    siteName: title,
    images: [
      {
        url: siteURL + "/sifmax-OG.jpg", // Replace this with your own image
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-KE",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: title,
    card: "summary_large_image",
    description: title,
    images: [siteURL + "/sifmax-OG.jpg"],
    creator: "@JackMkimbo",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
  // verification: {
  //   google: "VaD1qjKK95G1B1wsA3ZydoAdSg2r3aCm6D7ZJw2bw",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${satisfy.variable} ${dancingScript.variable} ${montserrat.variable} antialiased bg-black`}
      >
        <GlobalProvider>
          <CartProvider>
            <Navigation />
            {children}
            <Cart />
          </CartProvider>
        </GlobalProvider>
        <Toaster />
      </body>
    </html>
  );
}
