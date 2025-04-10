'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Phone } from 'lucide-react'

import { Button } from '@/components/ui/button'

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import {
  IconBrandFacebook,
  IconBrandWhatsapp,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandThreads,
} from '@tabler/icons-react'
import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
export function SifmaxNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  const closeSheet = () => {
    setIsOpen(false)
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About' },
    { href: '/#services', label: 'Services' },
    { href: '/#gallery', label: 'Gallery' },
    { href: '/#testimonials', label: 'Testimonials' },
    { href: '/#contact', label: 'Contact' },
  ]

  return (
    <>
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full container mx-auto flex h-16 items-center justify-between">
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
          <nav className="hidden md:flex gap-4 lg:gap-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <ThemeSelector />
            <Button asChild size="sm" className="hidden sm:flex">
              <Link href="/appointments">Book Appointment</Link>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTitle>
                {' '}
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
              </SheetTitle>
              <SheetContent side="left" className="w-[300px] sm:w-[400px] px-2">
                <div className="flex flex-col h-full">
                  <div className="py-4">
                    <Link href="/" onClick={closeSheet} className="flex items-center gap-2 mb-6">
                      <Image
                        src="/images/logo-small-transparent.png"
                        alt="Sifmax Beauty Parlour Logo"
                        width={120}
                        height={40}
                        className="h-16 w-auto"
                      />
                    </Link>
                    <nav className="flex flex-col space-y-4">
                      {navItems.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={closeSheet}
                          className="text-lg font-medium hover:text-primary transition-colors py-2 border-b border-border/50"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </nav>
                  </div>

                  <div className="mt-auto py-4">
                    <Button asChild className="w-full mb-4">
                      <Link href="/appointments" onClick={closeSheet}>
                        Book Appointment
                      </Link>
                    </Button>

                    <div className="grid grid-cols-1 gap-4">
                      <div className="flex items-center justify-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">Open 24/7 in Sinza, Dar es Salaam</span>
                      </div>
                      {/* <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-primary" />
                        <span className="text-sm">Sinza, Dar es Salaam</span>
                      </div> */}
                      {/* <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-primary" />
                        <span className="text-sm">+255 123 456 789</span>
                      </div> */}
                      {/* <div className="flex items-center gap-3">
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
                      </div> */}
                      <div className="flex items-center justify-center gap-3">
                        <a
                          href="tel:+255713786782"
                          aria-label="Phone"
                          className="text-primary hover:text-primary/80"
                        >
                          <Phone className="h-4 w-4" />
                        </a>
                        <a
                          href="https://wa.me/255713786782"
                          aria-label="WhatsApp"
                          className="text-primary hover:text-primary/80"
                        >
                          <IconBrandWhatsapp className="h-4 w-4" />
                        </a>
                        <a
                          href="https://www.instagram.com/sifmax_beauty_parlour/#/"
                          aria-label="Facebook"
                          className="text-primary hover:text-primary/80"
                        >
                          <IconBrandFacebook className="h-5 w-5" />
                        </a>
                        <a
                          href="https://www.instagram.com/sifmax_beauty_parlour/#/"
                          aria-label="Instagram"
                          className="text-primary hover:text-primary/80"
                        >
                          <IconBrandInstagram className="h-5 w-5" />
                        </a>
                        <a
                          href="https://www.threads.net/@sifmax_beauty_parlour"
                          aria-label="Threads"
                          className="text-primary hover:text-primary/80"
                        >
                          <IconBrandThreads className="h-5 w-5" />
                        </a>
                        <a
                          href="https://www.tiktok.com/@sifmax_beauty"
                          aria-label="TikTok"
                          className="text-primary hover:text-primary/80"
                        >
                          <IconBrandTiktok className="h-5 w-5" />
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
  )
}
