import { Clock, MapPin, Phone } from 'lucide-react'
import React from 'react'
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTiktok,
  IconBrandThreads,
} from '@tabler/icons-react'
type Props = {}

function Contact({}: Props) {
  return (
    <section id="contact" className="py-16 md:py-24 px-2">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Visit Our Salon</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We&apos;re conveniently located in Sinza, Dar es Salaam. Come visit us or get in touch
            to learn more about our services.
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-background p-6 rounded-lg shadow-sm border border-border">
            <h3 className="font-semibold text-lg mb-4">Contact Information</h3>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary mt-0.5">
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Address</h4>
                  <p className="text-muted-foreground text-sm">
                    Lukundo street, Sinza, Dar es Salaam, TZ
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary mt-0.5">
                  <Phone className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Phone</h4>
                  <p className="text-muted-foreground">+255 713 786 782</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary mt-0.5">
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
                    className="lucide lucide-mail"
                  >
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Email</h4>
                  <p className="text-muted-foreground">sifmaxbeautyparlour@gmail.com</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="bg-primary/10 p-2 rounded-full text-primary mt-0.5">
                  <Clock className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-medium">Hours</h4>
                  <p className="text-muted-foreground">Open 24 hours, 7 days a week</p>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <h3 className="font-semibold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/sifmax_beauty_parlour/#/"
                  aria-label="Facebook"
                  className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary/20 transition-colors"
                >
                  <IconBrandFacebook className="h-5 w-5" />
                </a>
                <a
                  href="https://www.instagram.com/sifmax_beauty_parlour/#/"
                  aria-label="Instagram"
                  className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary/20 transition-colors"
                >
                  <IconBrandInstagram className="h-5 w-5" />
                </a>
                <a
                  href="https://www.threads.net/@sifmax_beauty_parlour"
                  aria-label="Threads"
                  className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary/20 transition-colors"
                >
                  <IconBrandThreads className="h-5 w-5" />
                </a>
                <a
                  href="https://www.tiktok.com/@sifmax_beauty"
                  aria-label="TikTok"
                  className="bg-primary/10 p-2 rounded-full text-primary hover:bg-primary/20 transition-colors"
                >
                  <IconBrandTiktok className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="aspect-video relative rounded-lg overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.0656711822744!2d39.2825889758755!3d-6.8827367673496775!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4f3c7efb8067%3A0xa4a7b4579fb04161!2sSIFMAX%20BEAUTY%20PARLOUR!5e0!3m2!1sen!2ske!4v1743162549860!5m2!1sen!2ske"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sifmax Beauty Parlour Location"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
