import Image from 'next/image'

import './index.scss'

const baseClass = 'before-login'

export const BeforeLogin = () => {
  return (
    <aside className={baseClass}>
      <div className={`${baseClass}__image-wrap relative`}>
        <Image src="/images/image-login1.webp" alt="" fill />
        <div className="hidden absolute inset-0 md:flex items-center justify-center">
          <Image
            src="/images/logo-small-transparent.png"
            alt="Overlay"
            width={0}
            height={0}
            className="w-[60%] h-[300px]"
          />
        </div>
      </div>
    </aside>
  )
}
