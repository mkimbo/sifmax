import React from 'react'
import { ServicesSection } from '../Services'
import { GallerySection } from '../Gallery'
import Testimonials from '../Testimonials'
import Booking from '../Booking'
import Contact from '../Contact'
import { AboutSection } from '../About'

type Props = {}

function LandingPageComponent({}: Props) {
  return (
    <>
      <ServicesSection />
      <AboutSection />
      <GallerySection />
      <Testimonials />
      <Booking />
      <Contact />
    </>
  )
}

export default LandingPageComponent
