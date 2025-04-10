import type { BeautySalon, DaySpa, WithContext, Service, OfferCatalog } from 'schema-dts'
import type { FC } from 'react'

interface ServiceItem {
  name: string
  description?: string
  price?: string
}

interface ServiceCategory {
  name: string
  services: ServiceItem[]
  description?: string
}

interface StructuredDataProps {
  businessName: string
  description: string
  image: string
  url: string
  telephone: string
  address: {
    streetAddress: string
    addressLocality: string
    addressRegion: string
    postalCode: string
    addressCountry: string
  }
  geo: {
    latitude: number
    longitude: number
  }
  priceRange: string
  openingHours: string
  serviceCategories: ServiceCategory[]
  sameAs: string[] // Social media profiles
}

const StructuredData: FC<StructuredDataProps> = ({
  businessName,
  description,
  image,
  url,
  telephone,
  address,
  geo,
  priceRange,
  openingHours,
  serviceCategories,
  sameAs,
}) => {
  // Create opening hours specifications
  //   const openingHoursSpecification =
  //     typeof openingHours === "string"
  //       ? openingHours
  //       : openingHours.map((hours) => ({
  //           "@type": "OpeningHoursSpecification",
  //           dayOfWeek: hours.dayOfWeek,
  //           opens: hours.opens,
  //           closes: hours.closes,
  //         }))

  // Create service offerings organized by category
  const serviceOfferings: OfferCatalog[] = serviceCategories.map((category) => {
    // Create individual service items for this category
    const serviceItems: Service[] = category.services.map((service) => ({
      '@type': 'Service',
      name: service.name,
      provider: 'Sifmax Beauty Parlour',
      description: service.description,
      ...(service.price && {
        offers: {
          '@type': 'Offer',
          price: service.price,
          priceCurrency: 'TZS',
        },
      }),
    }))

    // Return a service catalog for this category
    return {
      '@type': 'OfferCatalog',
      name: category.name,
      itemListElement: serviceItems,
      description: category.description,
    }
  })

  // Create the structured data object
  // We'll use both BeautySalon and DaysSpa types to cover both aspects of the business
  const beautySalonSchema: WithContext<BeautySalon> = {
    '@context': 'https://schema.org',
    '@type': 'BeautySalon',
    name: businessName,
    description,
    image,
    url,
    telephone,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...geo,
    },
    priceRange,
    openingHours,
    // openingHoursSpecification,
    hasOfferCatalog: serviceOfferings,
    sameAs,
  }

  const spaSalonSchema: WithContext<DaySpa> = {
    '@context': 'https://schema.org',
    '@type': 'DaySpa',
    name: businessName,
    description,
    image,
    url,
    telephone,
    address: {
      '@type': 'PostalAddress',
      ...address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      ...geo,
    },
    priceRange,
    openingHours,
    hasOfferCatalog: serviceOfferings,
    sameAs,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(beautySalonSchema) }}
      />
      {/* <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(spaSalonSchema) }}
          /> */}
    </>
  )
}

export default StructuredData
