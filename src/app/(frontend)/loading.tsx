'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { motion } from 'motion/react'
import { Sparkles } from 'lucide-react'

export default function Loading() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress((prev) => {
        if (prev >= 100) return 100
        return prev + Math.random() * 15
      })
    }, 200)

    return () => clearTimeout(timer)
  }, [progress])

  return (
    <div className="fixed inset-0 bg-background flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md px-4 flex flex-col items-center">
        {/* Logo */}
        <div className="mb-8 relative">
          <Image
            src="/images/logo-transparent.png"
            alt="Sifmax Beauty Parlour"
            width={180}
            height={60}
            className="h-auto w-auto"
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ repeat: Number.POSITIVE_INFINITY, duration: 2 }}
            className="absolute -top-2 -right-2"
          >
            <Sparkles className="h-5 w-5 text-primary" />
          </motion.div>
        </div>

        {/* Loading indicator */}
        <div className="w-full h-1 bg-muted/50 rounded-full overflow-hidden mb-4">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(progress, 100)}%` }}
            transition={{ ease: 'easeInOut' }}
          />
        </div>

        {/* Loading text */}
        {/* <div className="flex items-center justify-center relative h-6 w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            key={Math.floor(progress / 33)}
            className="absolute text-sm text-muted-foreground "
          >
            {progress < 33 && "Preparing your beauty experience..."}
            {progress >= 33 && progress < 66 && "Polishing the details..."}
            {progress >= 66 && progress < 100 && "Almost ready..."}
            {progress >= 100 && ""}
          </motion.div>
        </div> */}

        {/* Decorative elements */}
        {/* <div className="flex justify-center mt-12 space-x-3">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 rounded-full bg-primary/80"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </div> */}
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[30%] -right-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-[30%] -left-[10%] w-[50%] h-[50%] rounded-full bg-primary/5 blur-3xl" />
      </div>
    </div>
  )
}
