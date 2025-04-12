// src/admin/components/SifmaxNav/NavWrapper.client.tsx
'use client'
import { useNav } from '@payloadcms/ui' // Ensure correct import path
import React from 'react'

// Replicating structure but using Tailwind classes directly
export const NavWrapper: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  const { hydrated, navOpen, navRef, shouldAnimate } = useNav()

  // Base classes using Tailwind - aiming closer to default Payload look
  const baseClasses = `
      fixed inset-y-0 left-0 z-[100] flex w-64 transform flex-col  /* Higher z-index */
      bg-white dark:bg-gray-950 /* Slightly darker dark bg for contrast */
      border-r border-gray-200 dark:border-gray-800 /* Subtle border */
      text-gray-800 dark:text-gray-200
      transition-transform duration-300 ease-in-out /* Smooth transition */
      print:hidden /* Hide when printing */
      lg:translate-x-0 /* Always visible on large screens */
      lg:shadow-none /* No shadow needed when docked */
    `

  // State classes for mobile view
  // Use translate-x for slide-in/out, add shadow when overlaying
  const openClasses = navOpen ? 'translate-x-0 shadow-xl' : '-translate-x-full'
  const animateClasses = shouldAnimate ? 'transition-transform duration-300 ease-in-out' : ''
  // Use opacity for hydration fade-in to prevent layout shift/flash
  const hydratedClasses = hydrated ? 'opacity-100' : 'opacity-0 pointer-events-none'

  return (
    <aside
      className={`${baseClasses} ${openClasses} ${animateClasses} ${hydratedClasses}`}
      // Using aria-hidden for better accessibility when closed on mobile
      aria-hidden={!navOpen}
    >
      {/* Scrollable area */}
      <div
        className="flex-1 overflow-y-auto overflow-x-hidden" // Hide horizontal overflow
        ref={navRef}
      >
        {children}
      </div>
    </aside>
  )
}
