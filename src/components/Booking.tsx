'use client'
import React from 'react'
import { Button } from './ui/button'
import { Phone, Sparkles } from 'lucide-react'
import { z } from 'zod'
import { ContactForm } from './ContactForm'
import { useRouter } from 'next/navigation'

// Form schema with Zod
export const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
  email: z.string().email({ message: 'Please enter a valid email' }),
  message: z.string().optional(),
})

export type SendMessageFormValues = z.infer<typeof formSchema>

type Props = {}

function Booking({}: Props) {
  const router = useRouter()
  return (
    <section id="book" className="py-16 md:py-24 px-2 bg-primary/5">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Book Your Appointment</h2>
            <p className="text-muted-foreground mb-6">
              Ready to experience the Sifmax difference? Book your appointment today and let our
              expert team take care of all your beauty needs.
            </p>
            <div className="bg-background p-6 rounded-lg shadow-sm border border-border mb-6">
              <h3 className="font-semibold text-lg mb-4">Why Choose Sifmax?</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full text-primary mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">24/7 Availability</h4>
                    <p className="text-sm text-muted-foreground">
                      Beauty services available around the clock to fit your schedule
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full text-primary mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Expert Professionals</h4>
                    <p className="text-sm text-muted-foreground">
                      Skilled beauty specialists with years of experience
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full text-primary mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Luxurious Environment</h4>
                    <p className="text-sm text-muted-foreground">
                      Elegant and comfortable setting for your beauty treatments
                    </p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-primary/10 p-1 rounded-full text-primary mt-0.5">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium">Premium Products</h4>
                    <p className="text-sm text-muted-foreground">
                      Only the highest quality beauty products used in all services
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="flex items-center gap-4">
              <Button asChild size="lg">
                <a href="tel:+255713786782">
                  <Phone className="mr-2 h-4 w-4" />
                  Call to Book
                </a>
              </Button>
              <Button variant="outline" onClick={() => router.push('/appointments')} size="lg">
                Book Online
              </Button>
            </div>
          </div>
          <ContactForm />
        </div>
      </div>
    </section>
  )
}

export default Booking
