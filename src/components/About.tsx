import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 px-2 overflow-hidden ">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            <div className="aspect-square relative rounded-lg overflow-hidden">
              <Image
                src="/images/sifmax2.png"
                alt="Sifmax Beauty Parlour Interior"
                fill
                className="object-cover"
              />
            </div>
            {/* Adjusted positioning to prevent overflow */}
            <div className="absolute -bottom-6 right-0 md:-right-6 w-36 h-36 sm:w-48 sm:h-48 rounded-lg overflow-hidden border-4 border-background shadow-lg">
              <Image
                src="/images/sifmax4.png"
                alt="Sifmax Beauty Parlour Staff"
                fill
                sizes="100%"
                className="object-cover"
              />
            </div>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Sifmax Beauty Parlour</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to Sifmax Beauty Parlour, Dar es Salaam&apos;s premier 24-hour beauty
              destination located in the heart of Sinza. Our salon was founded with a vision to
              provide exceptional beauty services in a luxurious and welcoming environment.
            </p>
            <p className="text-muted-foreground mb-6">
              At Sifmax, we believe that beauty is an art form. Our team of highly skilled
              professionals is dedicated to enhancing your natural beauty through our comprehensive
              range of services. From stunning hair transformations to rejuvenating facials,
              meticulous nail care, relaxing body treatments, and complete bridal packages, we offer
              everything you need to look and feel your absolute best.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Our Mission</h3>
                <p className="text-sm text-muted-foreground">
                  To provide exceptional beauty services that enhance our clients&apos; natural
                  beauty and boost their confidence.
                </p>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">Our Vision</h3>
                <p className="text-sm text-muted-foreground">
                  To be the leading beauty destination in Dar es Salaam, known for excellence and
                  innovation.
                </p>
              </div>
            </div>
            <Button asChild>
              <Link href="#contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
