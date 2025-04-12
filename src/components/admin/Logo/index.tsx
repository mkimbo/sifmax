import Image from 'next/image'

export const Logo = () => {
  return (
    <span style={{ position: 'relative', width: '256px', height: '40px' }}>
      <Image src="/images/logo-small-transparent.png" alt="" fill />
    </span>
  )
}

export const Icon = () => {
  return (
    // <span style={{ position: 'relative', width: '256px', height: '64px' }}>
    //   <Image src="/sifmax-3.svg" alt="" fill />
    // </span>
    <Image
      src="/images/logo-transparent.png"
      alt="Sifmax Beauty Parlour Logo"
      width={150}
      height={50}
      className="h-16 w-auto relative"
      priority
    />
  )
}
