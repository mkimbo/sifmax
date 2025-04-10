import type { Metadata } from 'next'
import { getServerSideURL } from './getURL'
import { sifmaxServiceBook, sifmaxServiceCategories } from './serviceBook'

const siteName = 'Sifmax Beauty Parlour'
const siteURL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.sifmax.com'
const title = 'Sifmax Beauty Parlour | 24/7 Hair & Beauty Salon in Sinza, Dar es Salaam'
const description =
  'Sifmax Beauty Parlour is a 24-hour luxury hair and beauty salon in Sinza, Dar es Salaam offering hair styling, facials, makeup, nail care, body treatments, and bridal packages.'

export const defaultMetadata: Metadata = {
  title: title,
  metadataBase: new URL(siteURL),
  description: description,
  keywords: [
    'sifmax beauty parlour sinza',
    '24hr beauty salon dar es salaam',
    'beauty salon sinza',
    'waxing sinza',
    'body massage sinza',
    'Dar es Salaam hair salon',
  ],
  authors: [{ name: 'Sifmax Beauty Parlour' }],
  creator: 'Sifmax Beauty Parlour',
  publisher: 'Sifmax Beauty Parlour',
  openGraph: {
    title: title,
    description: description,
    url: siteURL,
    siteName: siteName,
    images: [
      {
        url: siteURL + '/sifmax-OG.jpg', // Replace this with your own image
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en-TZ',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  twitter: {
    title: title,
    card: 'summary_large_image',
    description: description,
    images: [siteURL + '/sifmax-OG.jpg'],
    creator: '@AcidCatDigital',
  },
  icons: {
    shortcut: '/favicon.ico',
  },
  alternates: {
    canonical: siteURL,
  },
}

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  description: description,
  locale: 'en-TZ',
  images: [
    {
      url: `${getServerSideURL()}/sifmax-OG.jpg`,
    },
  ],
  siteName: siteName,
  title: title,
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}

const getServices = (id: string) => {
  return sifmaxServiceBook.filter((service) => service.id === id)
}

const servicesCategories = sifmaxServiceCategories.map((category) => {
  return {
    name: category.title,
    description: category.description,
    services: getServices(category.id).map((service) => {
      return {
        name: service.title,
        description: service.category,
        price: service.price,
      }
    }),
  }
})

export const localBusinessData = {
  businessName: title,
  description: description,
  image: siteURL + '/sifmax-OG.jpg',
  logo: siteURL + '/images/logo-small-transparent.png',
  url: siteURL,
  telephone: '+255-713786782',
  address: {
    streetAddress: 'Lukundo street, SINZA VATICAN',
    addressLocality: 'Dar es Salaam',
    addressRegion: 'Dar es Salaam',
    postalCode: '00000',
    addressCountry: 'TZ',
  },
  geo: {
    latitude: -6.88255569839292,
    longitude: 39.285174628835925,
  },
  priceRange: 'Starting from Tsh. 10,000',
  openingHours: 'Mo-Su 00:00-24:00',
  serviceCategories: servicesCategories,
  sameAs: [
    'https://www.instagram.com/sifmax_beauty_parlour/#/',
    'https://www.threads.net/@sifmax_beauty_parlour',
    'https://www.tiktok.com/@sifmax_beauty',
  ],
}
