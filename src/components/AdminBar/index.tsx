'use client'

import type { PayloadAdminBarProps, PayloadMeUser } from '@payloadcms/admin-bar'

import { cn } from '@/utilities/ui'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar } from '@payloadcms/admin-bar'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Clock, MapPin, Phone } from 'lucide-react'
import { IconBrandWhatsapp, IconBrandInstagram } from '@tabler/icons-react'
import './index.scss'

import { getClientSideURL } from '@/utilities/getURL'

const baseClass = 'admin-bar'

const collectionLabels = {
  pages: {
    plural: 'Pages',
    singular: 'Page',
  },
  posts: {
    plural: 'Posts',
    singular: 'Post',
  },
  projects: {
    plural: 'Projects',
    singular: 'Project',
  },
}

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const collection = (
    collectionLabels[segments?.[1] as keyof typeof collectionLabels] ? segments[1] : 'pages'
  ) as keyof typeof collectionLabels
  const router = useRouter()

  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(Boolean(user?.id))
  }, [])

  return (
    <>
      <div
        className={cn('bg-primary/10 dark:bg-primary/5 py-2 ', {
          block: !show,
          hidden: show,
        })}
      >
        <div className="w-full container mx-auto flex justify-between items-center text-sm">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3 text-primary" />
              <span className="hidden sm:inline">Open 24/7</span>
              <span className="sm:hidden">24/7</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="">Sinza, Dar es Salaam</span>
              {/* <span className="sm:hidden">Sinza</span> */}
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+255713786782" className="flex items-center gap-1">
              <Phone className="h-4 w-4 text-primary" />
              <span className="hidden sm:inline">+255 713 786 782</span>
            </a>
            <div className="flex items-center gap-2">
              <a
                href="https://www.instagram.com/sifmax_beauty_parlour/#/"
                aria-label="Instagram"
                className="text-primary hover:text-primary/80"
              >
                <IconBrandInstagram className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/255713786782"
                aria-label="WhatsApp"
                className="text-primary hover:text-primary/80"
              >
                <IconBrandWhatsapp className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div
        className={cn(baseClass, 'py-2 bg-black text-white', {
          block: show,
          hidden: !show,
        })}
      >
        <div className="container">
          <PayloadAdminBar
            {...adminBarProps}
            className="py-2 text-white"
            classNames={{
              controls: 'font-medium text-white',
              logo: 'text-white',
              user: 'text-white',
            }}
            cmsURL={getClientSideURL()}
            collectionSlug={collection}
            collectionLabels={{
              plural: collectionLabels[collection]?.plural || 'Pages',
              singular: collectionLabels[collection]?.singular || 'Page',
            }}
            logo={<Title />}
            onAuthChange={onAuthChange}
            onPreviewExit={() => {
              fetch('/next/exit-preview').then(() => {
                router.push('/')
                router.refresh()
              })
            }}
            style={{
              backgroundColor: 'transparent',
              padding: 0,
              position: 'relative',
              zIndex: 'unset',
            }}
          />
        </div>
      </div>
    </>
  )
}
