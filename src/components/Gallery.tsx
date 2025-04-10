'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'motion/react'
import { Play, X } from 'lucide-react'
import { cn } from '@/utilities/ui'

// Gallery data structure
type GalleryItem = {
  id: string
  type: 'image' | 'video'
  src: string
  alt: string
  thumbnail?: string // Optional thumbnail for videos
}

type GalleryCategory = {
  id: string
  label: string
  items: GalleryItem[]
}

const generateVideoThumbnail = async (src: string): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const video = document.createElement('video')

    video.autoplay = true
    video.muted = true
    video.src = `${process.env.NEXT_PUBLIC_SITE_URL}${src}`

    video.onloadeddata = () => {
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        return reject('Failed to get canvas context')
      }

      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      ctx.drawImage(video, 0, 0, video.videoWidth, video.videoHeight)
      video.pause()
      resolve(canvas.toDataURL('image/png'))
    }

    video.onerror = (err) => {
      reject(err)
    }
  })
}

// Gallery data
const galleryData: GalleryCategory[] = [
  {
    id: 'salon',
    label: 'Salon Interior',
    items: [
      {
        id: 'salon-1',
        type: 'image',
        src: '/images/sifmax1.png',
        alt: 'Sifmax Beauty Parlour Interior',
      },
      {
        id: 'salon-2',
        type: 'image',
        src: '/images/sifmax2.png',
        alt: 'Sifmax Beauty Parlour Interior',
      },
      {
        id: 'salon-3',
        type: 'video',
        src: '/videos/sifmax.mp4', // Replace with actual video path
        thumbnail: '/images/poster.png',
        alt: 'Salon Tour Video',
      },
      {
        id: 'salon-4',
        type: 'image',
        src: '/images/sifmax4.png',
        alt: 'Sifmax Beauty Parlour Reception Area',
      },
      {
        id: 'salon-5',
        type: 'image',
        src: '/images/sifmax5.png',
        alt: 'Sifmax Beauty Parlour Styling Area',
      },
      {
        id: 'salon-6',
        type: 'image',
        src: '/images/sifmax6.png',
        alt: 'Sifmax Beauty Parlour Nails Area',
      },
      {
        id: 'salon-7',
        type: 'image',
        src: '/images/sifmax7.png',
        alt: 'Sifmax Beauty Parlour Treatment Room',
      },
      {
        id: 'salon-8',
        type: 'image',
        src: '/images/sifmax9.png',
        alt: 'Sifmax Beauty Parlour Waiting Area',
      },
    ],
  },
  {
    id: 'hair',
    label: 'Hair Styling',
    items: [
      {
        id: 'hair-1',
        type: 'image',
        src: '/images/hair2.jpeg',
        alt: 'Hair Styling at Sifmax Beauty Parlour',
      },
      {
        id: 'hair-2',
        type: 'video',
        src: '/videos/sifmax_braids.mp4', // Replace with actual video path
        thumbnail: '/images/sifmax2.png',
        alt: 'Hair Braiding Video',
      },
      {
        id: 'hair-3',
        type: 'image',
        src: '/images/hair1.jpeg',
        alt: 'Hair Treatment at Sifmax Beauty Parlour',
      },
      {
        id: 'hair-4',
        type: 'image',
        src: '/images/hair3.jpeg',
        alt: 'Hair Extensions at Sifmax Beauty Parlour',
      },
      {
        id: 'hair-5',
        type: 'video',
        src: '/videos/sifmax_hair2.mp4', // Replace with actual video path
        thumbnail: '/images/sifmax5.png',
        alt: 'Hair Styling Video',
      },
      {
        id: 'hair-6',
        type: 'image',
        src: '/images/hair4.jpeg',
        alt: 'Hair Styling for Events at Sifmax Beauty Parlour',
      },
      {
        id: 'hair-7',
        type: 'image',
        src: '/images/hair5.jpeg',
        alt: 'Bridal Hair Styling at Sifmax Beauty Parlour',
      },
      {
        id: 'hair-8',
        type: 'video',
        src: '/videos/sifmax_makeup2.mp4', // Replace with actual video path
        // thumbnail: "/images/sifmax_makeup2.mp4",
        alt: 'Hair & Makeup Video',
      },
    ],
  },
  {
    id: 'nails',
    label: 'Nail Care',
    items: [
      {
        id: 'nails-1',
        type: 'image',
        src: '/images/nail.webp',
        alt: 'Manicure at Sifmax Beauty Parlour',
      },
      {
        id: 'nails-2',
        type: 'image',
        src: '/images/nails1.jpeg',
        alt: 'Pedicure at Sifmax Beauty Parlour',
      },
      {
        id: 'nails-3',
        type: 'video',
        src: '/videos/sifmax_nails.mp4', // Replace with actual video path
        thumbnail: '/images/sifmax2.png',
        alt: 'Nail Art Video',
      },
      {
        id: 'nails-4',
        type: 'image',
        src: '/images/nails2.jpeg',
        alt: 'Nail Art at Sifmax Beauty Parlour',
      },
      {
        id: 'nails-5',
        type: 'image',
        src: '/images/nails3.jpeg',
        alt: 'Acrylic Nails at Sifmax Beauty Parlour',
      },
      {
        id: 'nails-6',
        type: 'video',
        src: '/videos/sifmax_nails2.mp4', // Replace with actual video path
        thumbnail: '/images/sifmax2.png',
        alt: 'Nail Art Video',
      },
      {
        id: 'nails-7',
        type: 'image',
        src: '/images/nails4.jpeg',
        alt: 'French Manicure at Sifmax Beauty Parlour',
      },
      {
        id: 'nails-8',
        type: 'image',
        src: '/images/nails5.jpeg',
        alt: 'Nail Polish Application at Sifmax Beauty Parlour',
      },
    ],
  },
]

const VideoThumbnailComponent: React.FC<{ src: string; alt: string }> = ({ src, alt }) => {
  const [thumbnail, setThumbnail] = useState<string>('')

  useEffect(() => {
    generateVideoThumbnail(src)
      .then(setThumbnail)
      .catch((err) => console.error('Error generating thumbnail:', err))
  }, [src])

  return (
    <div>
      {thumbnail && (
        <Image
          src={thumbnail ?? '/images/poster.png'}
          alt={alt}
          fill
          sizes="100%"
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      )}
    </div>
  )
}

export function GallerySection() {
  const [activeTab, setActiveTab] = useState('salon')
  const [activeVideo, setActiveVideo] = useState<GalleryItem | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Get the active category's items
  const activeCategory = galleryData.find((category) => category.id === activeTab)

  // Handle video click
  const handleVideoClick = (item: GalleryItem) => {
    setActiveVideo(item)
  }

  // Close video modal
  const closeVideoModal = () => {
    setActiveVideo(null)
    if (videoRef.current) {
      videoRef.current.pause()
    }
  }

  return (
    <section id="gallery" className="py-16 md:py-24 px-2 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Salon Gallery</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Take a virtual tour of our luxurious salon and see the beautiful environment where we
            create stunning transformations.
          </p>
        </div>

        {/* Tabs Navigation */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex bg-muted/50 p-1 rounded-lg">
            {galleryData.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveTab(category.id)}
                className={cn(
                  'px-4 py-2 rounded-md text-sm font-medium transition-all',
                  activeTab === category.id
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground',
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Gallery Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"
          >
            {activeCategory?.items.map((item) => (
              <div
                key={item.id}
                className="aspect-square relative rounded-lg overflow-hidden group"
              >
                {item.type === 'image' ? (
                  <Image
                    src={item.src || '/placeholder.svg'}
                    alt={item.alt}
                    fill
                    sizes="100%"
                    className="object-cover hover:scale-110 transition-transform duration-300"
                  />
                ) : (
                  // Render VideoPlayer for video items
                  //   <div className="w-full h-full cursor-pointer">
                  //     <VideoPlayer
                  //       src={item.src}
                  //       poster={item.thumbnail || item.src}
                  //     />
                  //   </div>
                  <div
                    className="w-full h-full cursor-pointer"
                    onClick={() => handleVideoClick(item)}
                  >
                    <VideoThumbnailComponent src={item.src} alt={item.alt} />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity">
                      <div className="bg-primary/90 rounded-full p-3 transform group-hover:scale-110 transition-transform">
                        <Play className="h-6 w-6 text-white" fill="white" />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Video Modal */}
        {activeVideo && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="relative w-fit h-auto md:h-full max-h-[80vh] max-w-2xl bg-background rounded-lg overflow-auto">
              <div className="flex flex-row z-10 p-4 bg-black/50 absolute top-0 left-0 w-full justify-between">
                <h3 className="font-medium text-lg">{activeVideo.alt}</h3>
                <button
                  onClick={closeVideoModal}
                  className="  bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="h-auto md:h-full w-fit">
                <video
                  ref={videoRef}
                  src={activeVideo.src}
                  poster={activeVideo.thumbnail}
                  controls
                  muted
                  autoPlay
                  className="w-fit h-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
