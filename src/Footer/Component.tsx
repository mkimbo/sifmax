import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer } from '@/payload-types'

import Image from 'next/image'
import { Clock, MapPin, Phone } from 'lucide-react'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandThreads,
} from '@tabler/icons-react'

export async function Footer() {
  const footerData: Footer = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className="bg-muted/30 border-t ">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="inline-block mb-4">
              <Image
                src="/images/logo-transparent.png"
                alt="Sifmax Beauty Parlour Logo"
                width={150}
                height={50}
                className="h-auto w-auto"
              />
            </Link>
            <p className="text-muted-foreground mb-4">
              Sifmax Beauty Parlour is Dar es Salaam&apos;s premier 24-hour beauty destination
              offering exceptional services in a luxurious setting.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/sifmax_beauty_parlour/#/"
                aria-label="Facebook"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <IconBrandFacebook className="h-5 w-5" />
              </a>
              <a
                href="https://www.instagram.com/sifmax_beauty_parlour/#/"
                aria-label="Instagram"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <IconBrandInstagram className="h-5 w-5" />
              </a>
              <a
                href="https://www.threads.net/@sifmax_beauty_parlour"
                aria-label="Threads"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <IconBrandThreads className="h-5 w-5" />
              </a>
              <a
                href="https://www.tiktok.com/@sifmax_beauty"
                aria-label="Twitter"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <IconBrandTiktok className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Our Services
                </Link>
              </li>
              <li>
                <Link
                  href="#about"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="#gallery"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Gallery
                </Link>
              </li>
              <li>
                <Link
                  href="#testimonials"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Hair Styling
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Facial & Makeup
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Nail Care
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Body Care
                </Link>
              </li>
              <li>
                <Link
                  href="#services"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  Bridal Packages
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">
                  Lukundo street, Sinza, Dar es Salaam, TZ
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">+255 713 786 782</span>
              </li>
              <li className="flex items-start gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary shrink-0 mt-0.5"
                >
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <span className="text-muted-foreground">sifmaxbeautyparlour@gmail.com</span>
              </li>
              <li className="flex items-start gap-2">
                <Clock className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">Open 24 hours, 7 days a week</span>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Sifmax Beauty Parlour. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="https://www.acidcatdigital.com/"
              className="text-sm text-muted-foreground hover:text-orange-500 transition-colors"
            >
              Website by AcidCat Digital
            </Link>
          </div>
        </div>
      </div>
    </footer>
    // <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
    //   <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
    //     <Link className="flex items-center" href="/">
    //       <Logo />
    //     </Link>

    //     <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
    //       <ThemeSelector />
    //       <nav className="flex flex-col md:flex-row gap-4">
    //         {navItems.map(({ link }, i) => {
    //           return <CMSLink className="text-white" key={i} {...link} />
    //         })}
    //       </nav>
    //     </div>
    //   </div>
    // </footer>
  )
}
