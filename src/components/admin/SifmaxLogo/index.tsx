'use client'
import Image from 'next/image'

export default function SifmaxLogo() {
  return (
    <Image
      src="/images/logo-transparent.png"
      alt="Sifmax Beauty Parlour Logo"
      width={150}
      height={50}
      className="h-auto w-auto"
    />
  )
}
