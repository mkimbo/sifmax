'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Modal, ModalTrigger, ModalBody, ModalContent, ModalFooter } from './ui/animated-modal'
import { useServiceContext } from '@/context/service-context'

import { useRouter } from 'next/navigation'
import { sifmaxServiceBook, sifmaxServiceCategories } from '@/utilities/serviceBook'

const icons = [
  {
    name: 'hair',
    icon: (
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
        className="lucide lucide-scissors"
      >
        <circle cx="6" cy="6" r="3" />
        <circle cx="18" cy="6" r="3" />
        <path d="M8.12 8.12 12 12l-5 5a4 4 0 1 0 5.66 5.66L18 17" />
        <path d="M16 12 8.78 4.78a4 4 0 1 0-5.66 5.66L8 15" />
      </svg>
    ),
  },
  {
    name: 'facial',
    icon: (
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
        className="lucide lucide-sparkles"
      >
        <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1-1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
        <path d="M5 3v4" />
        <path d="M19 17v4" />
        <path d="M3 5h4" />
        <path d="M17 19h4" />
      </svg>
    ),
  },
  {
    name: 'nail',
    icon: (
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
        className="lucide lucide-hand"
      >
        <path d="M18 11V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v0" />
        <path d="M14 10V4a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2v0a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </svg>
    ),
  },
  {
    name: 'body',
    icon: (
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
        className="lucide lucide-flower"
      >
        <path d="M12 7.5a4.5 4.5 0 1 1 4.5 4.5M12 7.5A4.5 4.5 0 1 0 7.5 12M12 7.5V9m-4.5 3a4.5 4.5 0 1 0 4.5 4.5M7.5 12H9m7.5 0a4.5 4.5 0 1 1-4.5 4.5m4.5-4.5H15m-3 4.5V15" />
        <circle cx="12" cy="12" r="3" />
        <path d="m8 16 1.5-1.5" />
        <path d="M14.5 9.5 16 8" />
        <path d="m8 8 1.5 1.5" />
        <path d="M14.5 14.5 16 16" />
      </svg>
    ),
  },
  {
    name: 'bridal',
    icon: (
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
        className="lucide lucide-heart"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
]

export const getIcon = (name: string) => {
  const icon = icons.find((icon) => icon.name === name)
  return icon ? (
    icon.icon
  ) : (
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
      className="lucide lucide-heart"
    >
      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
    </svg>
  )
}

// Service type definition
export type Service = {
  name: string
  price: string
  description?: string
  category: string
  id: string
  subCategory?: string | null | undefined
  duration: number
}

// Category information

export function ServicesSection() {
  const { selectedServices, addService, removeService, isServiceSelected, clearServices } =
    useServiceContext()

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  const router = useRouter()

  const allServices = sifmaxServiceBook.map((service) => {
    return {
      ...service,
      price: 'Tsh. ' + service.price,
      serviceId: generateKey(service.title) + generateKey(service.category),
    }
  })

  // Filter services by category
  const filteredServices = selectedCategory
    ? allServices.filter((service) => service.id === selectedCategory)
    : []

  // Calculate total price of selected services
  //   const totalPrice = selectedServices.reduce(
  //     (sum, service) => sum + service.price,
  //     0
  //   );

  const categories = sifmaxServiceCategories.map((category) => {
    return {
      ...category,
      icon: getIcon(category.icon),
    }
  })

  function generateKey(title: string): string {
    return title.replace(/\/|\s|\)|\(/g, '').toLowerCase()
  }
  // Handle service selection/deselection
  const toggleServiceSelection = (service: Service) => {
    if (isServiceSelected(service.id)) {
      removeService(service.id)
    } else {
      addService(service)
      setShowBookingForm(true)
    }
  }

  // Reset modal state when closed
  const handleModalClose = () => {
    setShowBookingForm(false)
  }

  return (
    <section id="services" className="py-16 md:py-24 px-2 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Premium Services</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Indulge in our comprehensive range of beauty and wellness services, designed to pamper
            and rejuvenate you from head to toe.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Service Category Cards */}
          {categories.map((category) => (
            <div
              key={category.id}
              className="group bg-background rounded-lg shadow-sm overflow-hidden border border-border hover:border-primary/50 transition-colors"
            >
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src={category.image || '/placeholder.svg'}
                  alt={`${category.title} Services at Sifmax Beauty Parlour`}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  <span className="bg-primary/10 text-primary p-2 rounded-full mr-3">
                    {category.icon}
                  </span>
                  {category.title}
                </h3>
                <p className="text-muted-foreground mb-4">{category.description}</p>
                <ul className="space-y-2 mb-6">
                  {category.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-sm">
                      <ChevronDown className="h-4 w-4 text-primary mr-2" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => router.push(`/appointments?category=${category.id}`)}
                >
                  Book Service
                </Button>
              </div>
            </div>
          ))}

          {/* Special Offers Card */}
          <div className="group bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg shadow-sm overflow-hidden border border-primary/30 hover:border-primary/50 transition-colors">
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 flex items-center">
                <span className="bg-primary/20 text-primary p-2 rounded-full mr-3">
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
                    className="lucide lucide-badge-percent"
                  >
                    <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z" />
                    <path d="m15 9-6 6" />
                    <path d="M9 9h.01" />
                    <path d="M15 15h.01" />
                  </svg>
                </span>
                Special Offers
              </h3>
              <p className="text-muted-foreground mb-4">
                Take advantage of our exclusive packages and seasonal promotions designed to give
                you the ultimate beauty experience at exceptional value.
              </p>
              <div className="bg-background/80 p-4 rounded-lg mb-6">
                <h4 className="font-medium text-primary mb-2">Current Promotions:</h4>
                <ul className="space-y-2">
                  <li className="flex items-start text-sm">
                    <ChevronDown className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    <span>
                      <strong>Weekday Special:</strong> 20% off all services Monday-Thursday
                    </span>
                  </li>
                  <li className="flex items-start text-sm">
                    <ChevronDown className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    <span>
                      <strong>Package Deal:</strong> Book any 3 services and get 15% discount
                    </span>
                  </li>
                  <li className="flex items-start text-sm">
                    <ChevronDown className="h-4 w-4 text-primary mr-2 mt-0.5" />
                    <span>
                      <strong>First-Time Client:</strong> Free mini facial with any service
                    </span>
                  </li>
                </ul>
              </div>
              <Modal>
                <ModalTrigger asChild className="w-full">
                  <Button className="w-full">View All Promotions</Button>
                </ModalTrigger>
                <ModalBody>
                  <ModalContent>
                    <h3 className="text-2xl font-bold mb-2 md:mb-6">Special Offers & Promotions</h3>
                    <div id="service-selection" className="space-y-6 overflow-y-auto max-h-[60vh]">
                      <div className="border border-primary/30 bg-primary/5 rounded-lg p-4">
                        <h4 className="font-semibold text-lg mb-2">Weekday Special</h4>
                        <p className="mb-2">Enjoy 20% off all services Monday through Thursday.</p>
                        <p className="text-sm text-muted-foreground">
                          Valid for all services. Cannot be combined with other offers.
                        </p>
                      </div>
                      <div className="border border-primary/30 bg-primary/5 rounded-lg p-4">
                        <h4 className="font-semibold text-lg mb-2">Package Deal</h4>
                        <p className="mb-2">
                          Book any 3 services and receive a 15% discount on your total.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Services must be booked for the same day. Advance booking required.
                        </p>
                      </div>
                      <div className="border border-primary/30 bg-primary/5 rounded-lg p-4">
                        <h4 className="font-semibold text-lg mb-2">First-Time Client Offer</h4>
                        <p className="mb-2">
                          New clients receive a complimentary mini facial with any service.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          First visit only. Please mention this offer when booking.
                        </p>
                      </div>
                      <div className="border border-primary/30 bg-primary/5 rounded-lg p-4">
                        <h4 className="font-semibold text-lg mb-2">Referral Reward</h4>
                        <p className="mb-2">
                          Refer a friend and both receive 10% off your next visit.
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Friend must be a new client and mention your name when booking.
                        </p>
                      </div>
                    </div>
                  </ModalContent>
                  <ModalFooter>
                    <Button>
                      <Link href="#book">Book Now</Link>
                    </Button>
                  </ModalFooter>
                </ModalBody>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
