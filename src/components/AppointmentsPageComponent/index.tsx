'use client'
import { ArrowLeft, CalendarRange } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { CategorySelector } from '../CategorySelector'

import ChooseService from '../ChooseService'
import { Service } from '../Services'
import { sifmaxServiceBook, sifmaxServiceCategories as categories } from '@/utilities/serviceBook'
import { useRouter, useSearchParams } from 'next/navigation'
import { MultiStepBookingForm } from '../MultiStepBookingForm/MultiStepBookingForm'

type Props = {}

function AppointmentsPageComponent({}: Props) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const categoryParam = searchParams.get('category')

  const services = sifmaxServiceBook.map((service) => {
    return {
      ...service,
      price: 'Tsh. ' + service.price,
      serviceId: generateKey(service.title) + generateKey(service.category),
    }
  })

  const [selectedCategory, setSelectedCategory] = useState<string | null>(categoryParam)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [showBookingForm, setShowBookingForm] = useState(false)

  // Update selected category when URL param changes
  useEffect(() => {
    setSelectedCategory(categoryParam)
    setSelectedService(null)
    setShowBookingForm(false)
  }, [categoryParam])

  function generateKey(title: string): string {
    return title.replace(/\/|\s|\)|\(/g, '').toLowerCase()
  }

  //Filter services by category
  const filteredServices = selectedCategory
    ? services.filter((service) => service.id === selectedCategory)
    : []

  // Handle category selection
  const handleCategorySelect = (categoryId: string) => {
    router.push(`/appointments?category=${categoryId}`)
  }

  // Handle service selection
  const handleServiceSelect = (service: Service) => {
    setSelectedService(service)
    setShowBookingForm(true)
  }

  // Handle booking completion
  const handleBookingComplete = () => {
    // Reset state and redirect to home
    setSelectedService(null)

    setTimeout(() => {
      router.push('/')
      setShowBookingForm(false)
    }, 3000)
  }

  // Go back to service selection
  const handleBackToServices = () => {
    setShowBookingForm(false)
    setSelectedService(null)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-5 px-2">
        {selectedService && (
          <div className="flex items-center gap-2 mb-3">
            {/* <ArrowLeft
              onClick={() => {
                setSelectedService(null)
                setShowBookingForm(false)
              }}
              className="h-5 w-5 md:h-7 md:w-7 text-primary hover:text-primary/80 transition-colors"
            /> */}
            <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2">
              <CalendarRange className="h-7 w-7 text-primary" />
              Book Your Appointment
            </h1>
          </div>
        )}

        {!selectedCategory ? (
          // Step 1: Show category selection if no category is selected
          <>
            <div className="mb-3">
              <div className="flex items-center gap-2 mb-3">
                <Link
                  href={categoryParam ? '/appointments' : '/'}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  <ArrowLeft className="h-5 w-5 md:h-7 md:w-7" />
                </Link>
                <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2">
                  Select a Service Category
                </h1>{' '}
              </div>
              <p className="text-muted-foreground">
                Choose the type of service you&apos;d like to book
              </p>
            </div>
            <CategorySelector categories={categories} onSelectCategory={handleCategorySelect} />
          </>
        ) : showBookingForm ? (
          // Step 3: Show booking form after service selection
          <div className="bg-background rounded-lg border border-border px-3 pb-3 pt-1">
            {selectedService && (
              <MultiStepBookingForm
                selectedServices={[selectedService]}
                removeService={() => {
                  setSelectedService(null)
                  setShowBookingForm(false)
                }}
                onComplete={handleBookingComplete}
              />
            )}
          </div>
        ) : (
          // Step 2: Show services for selected category
          <ChooseService
            selectedCategory={selectedCategory}
            filteredServices={filteredServices}
            handleServiceSelect={handleServiceSelect}
          />
        )}
      </div>
    </div>
  )
}

export default AppointmentsPageComponent
