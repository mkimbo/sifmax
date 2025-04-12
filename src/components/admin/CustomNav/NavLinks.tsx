// src/admin/components/NavLinks.tsx

'use client' // <--- Essential for hooks and client-side routing

import React from 'react'
// For active link state
import { Link } from '@payloadcms/ui/elements/Link'
//import { useLogout } from '@payloadcms/ui/providers'; // Hook for logout
// import { LogOut } from '@payloadcms/ui/graphics/LogOut'; // Default logout icon
// import type { NavLinkData } from './MyCustomNav'; // Import the type
import { usePathname } from 'next/navigation'
import { useAuth } from '@payloadcms/ui'
import { LogOut } from 'lucide-react'
import { NavLinkData } from '.'

// Props definition for the client component
interface NavLinksProps {
  links: NavLinkData[]
}

export default function NavLinks({ links }: NavLinksProps) {
  const pathname = usePathname() // Get current path for active state
  const { logOut } = useAuth() // Get logout function

  return (
    // Flex container to push logout to the bottom
    <div className="flex h-full flex-col justify-between">
      {/* Main navigation list */}
      <nav className="mt-2 px-2 py-4 text-sm">
        {' '}
        {/* Adjusted padding/margin */}
        <ul className="space-y-1 list-none p-0 m-0">
          {' '}
          {/* Remove list dots, reset padding/margin */}
          {links.map(({ slug, href, label }) => {
            // Determine if the current link is active
            // More robust check: includes list view and edit view
            const isActive = pathname === href || pathname.startsWith(`${href}/`)

            return (
              <li key={slug}>
                <Link
                  href={href}
                  // Apply Tailwind classes for styling
                  // Use background/text color changes for active/hover states
                  className={`
                    flex items-center rounded-md px-3 py-2 text-gray-700 dark:text-gray-300
                    hover:bg-gray-100 hover:text-gray-900
                    dark:hover:bg-gray-800 dark:hover:text-gray-50
                    transition-colors duration-100 ease-in-out // Smooth hover transition
                    ${
                      isActive
                        ? 'bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50 font-medium' // Active styles
                        : 'font-normal' // Default font weight
                    }
                  `}
                >
                  {/* Add Icons here later if desired */}
                  {label}
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Logout Button Section - Pushed to bottom by flex container */}
      <div className="mb-2 px-2 py-2">
        {' '}
        {/* Padding around logout */}
        <button
          type="button"
          onClick={logOut}
          className="
            flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 dark:text-gray-300
            hover:bg-gray-100 hover:text-gray-900
            dark:hover:bg-gray-800 dark:hover:text-gray-50
            transition-colors duration-100 ease-in-out
          "
        >
          <LogOut className="mr-2 h-4 w-4" /> {/* Logout Icon */}
          Logout
        </button>
      </div>
    </div>
  )
}
