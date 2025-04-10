import React from 'react'

import type { Page } from '@/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'

//import RichText from '@/components/RichText'

type StaticHeroType =
  | {
      children?: React.ReactNode
      richText?: never
    }
  | (Omit<Page['hero'], 'richText'> & {
      children?: never
      richText?: Page['hero']['richText']
    })

export const StaticHero: React.FC<StaticHeroType> = ({ children, richText }) => {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/50 z-10" />
      <div className="container mx-auto relative z-20 py-20 md:py-32 flex flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6">
          <span className="block">Experience Luxury Beauty</span>
          <span className="block mt-2">
            <span className="text-primary">24/7</span> at Sifmax Beauty Parlour
          </span>
        </h1>
        <p className="max-w-2xl text-lg text-white/90 mb-8">
          Dar es Salaam&apos;s premier beauty destination offering exceptional hair styling,
          facials, nail care, body treatments, and bridal packages in a luxurious setting.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button size="lg" asChild>
            <Link href="tel:+255713786782">
              <Phone className="mr-2 h-4 w-4" />
              Call to Book
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="bg-white/10 text-white border-white/20 hover:bg-white/20"
            asChild
          >
            <Link href="#services">Choose Your Service</Link>
          </Button>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <Image
          src="/images/sifmax9.png"
          alt="Sifmax Beauty Parlour Interior"
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  )
}
