"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Clock, MapPin, Phone, Instagram, Facebook } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { IconBrandInstagram, IconBrandWhatsapp } from "@tabler/icons-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const closeSheet = () => {
    setIsOpen(false);
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-primary/10 dark:bg-primary/5 p-2 ">
        <div className="container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-primary" />
              <span className="hidden sm:inline">Open 24/7</span>
              <span className="sm:hidden">24/7</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="">Sinza, Dar es Salaam</span>
              {/* <span className="sm:hidden">Sinza</span> */}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+255713786782" className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">+255 713 786 782</span>
            </a>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/sifmax_beauty_parlour/#/"
                aria-label="Instagram"
                className="text-primary hover:text-primary/80"
              >
                <IconBrandInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/255713786782"
                aria-label="WhatsApp"
                className="text-primary hover:text-primary/80"
              >
                <IconBrandWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky px-2 top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/images/logo-small-transparent.png"
              alt="Sifmax Beauty Parlour Logo"
              width={150}
              height={50}
              className="h-16 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-6">
            <Link
              href="#services"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Services
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              About Us
            </Link>
            <Link
              href="#gallery"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Gallery
            </Link>
            <Link
              href="#testimonials"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Testimonials
            </Link>
            <Link
              href="#contact"
              className="text-sm font-medium hover:text-primary transition-colors"
            >
              Contact
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <Button asChild size="sm" className="hidden sm:flex">
              <Link href="#book">Book Appointment</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <span className="sr-only">Toggle menu</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="4" x2="20" y1="12" y2="12" />
                    <line x1="4" x2="20" y1="6" y2="6" />
                    <line x1="4" x2="20" y1="18" y2="18" />
                  </svg>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col h-full">
                  <div className="py-4">
                    <Link
                      href="/"
                      onClick={closeSheet}
                      className="flex items-center gap-2 mb-6"
                    >
                      <Image
                        src="/images/sifmax-logo.png"
                        alt="Sifmax Beauty Parlour Logo"
                        width={120}
                        height={40}
                        className="h-auto w-auto"
                      />
                    </Link>
                    <nav className="flex flex-col space-y-4">
                      <Link
                        href="#services"
                        onClick={closeSheet}
                        className="text-lg font-medium hover:text-primary transition-colors py-2 border-b border-border/50"
                      >
                        Services
                      </Link>
                      <Link
                        href="#about"
                        onClick={closeSheet}
                        className="text-lg font-medium hover:text-primary transition-colors py-2 border-b border-border/50"
                      >
                        About Us
                      </Link>
                      <Link
                        href="#gallery"
                        onClick={closeSheet}
                        className="text-lg font-medium hover:text-primary transition-colors py-2 border-b border-border/50"
                      >
                        Gallery
                      </Link>
                      <Link
                        href="#testimonials"
                        onClick={closeSheet}
                        className="text-lg font-medium hover:text-primary transition-colors py-2 border-b border-border/50"
                      >
                        Testimonials
                      </Link>
                      <Link
                        href="#contact"
                        onClick={closeSheet}
                        className="text-lg font-medium hover:text-primary transition-colors py-2 border-b border-border/50"
                      >
                        Contact
                      </Link>
                    </nav>
                  </div>

                  <div className="mt-auto py-4">
                    <Button asChild className="w-full mb-4">
                      <Link href="#book" onClick={closeSheet}>
                        Book Appointment
                      </Link>
                    </Button>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-primary" />
                        <span className="text-sm">Open 24/7</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">Sinza, Dar es Salaam</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm">+255 123 456 789</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <a
                          href="https://instagram.com"
                          aria-label="Instagram"
                          className="text-primary hover:text-primary/80"
                        >
                          <Instagram className="h-4 w-4" />
                        </a>
                        <a
                          href="https://facebook.com"
                          aria-label="Facebook"
                          className="text-primary hover:text-primary/80"
                        >
                          <Facebook className="h-4 w-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
