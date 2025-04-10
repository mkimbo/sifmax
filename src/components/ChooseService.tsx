import React, { useEffect, useState } from 'react'
import { Service } from './Services'
import { SearchBar } from './ServiceSearchBar'
import { ServicesList } from './ServicesList'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { sifmaxServiceCategories as categories } from '@/utilities/serviceBook'

type Props = {
  selectedCategory: string
  filteredServices: Service[]
  handleServiceSelect: (service: Service) => void
}

function ChooseService({ selectedCategory, filteredServices, handleServiceSelect }: Props) {
  const [services, setServices] = useState(filteredServices)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const services = filteredServices.filter(
      (service) =>
        service.title.toLowerCase().includes(query.toLowerCase()) ||
        service.category.toLowerCase().includes(query.toLowerCase()),
    )
    // Update your state with filtered services
    setServices(services)
    window.scrollTo(0, 0)
  }, [query])

  return (
    <>
      <div className="mb-3 sticky top-16 bg-background w-full">
        <div className="flex items-center justify-between w-full">
          <div className="w-full">
            <div className="flex items-center gap-2 mb-3">
              <Link
                href={'/appointments'}
                className="text-primary hover:text-primary/80 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 md:h-7 md:w-7" />
              </Link>
              <h1 className="text-xl md:text-3xl font-bold flex items-center gap-2">
                {categories.find((c) => c.id === selectedCategory)?.title} Services
              </h1>{' '}
            </div>
            <SearchBar
              onSearch={setQuery}
              placeholder={categories.find((c) => c.id === selectedCategory)?.searchPlaceholder}
            />
          </div>
        </div>
      </div>
      <ServicesList services={services} onSelectService={handleServiceSelect} singleSelection />
    </>
  )
}

export default ChooseService
