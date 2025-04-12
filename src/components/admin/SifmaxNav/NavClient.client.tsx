// src/admin/components/SifmaxNav/NavClient.client.tsx
'use client'

import React, { Fragment } from 'react'
import Link from 'next/link' // Use Next.js Link for client-side routing
import { usePathname } from 'next/navigation'
import { NavGroup, useAuth, useConfig, useTranslation } from '@payloadcms/ui' // Ensure correct import paths
import { formatAdminURL, EntityType } from '@payloadcms/ui/shared' // Corrected import path for EntityType
import type { NavPreferences } from 'payload'
import { getSifmaxNavIcon } from './sifmaxNavIconMap' // Import Sifmax specific icon map
import type { ProcessedGroup } from '.' // Import the type from the server component

// Props expected from the server component
interface NavClientProps {
  groups: ProcessedGroup[]
  navPreferences?: NavPreferences | null // Keep for NavGroup functionality
}

export const NavClient: React.FC<NavClientProps> = ({ groups, navPreferences }) => {
  const pathname = usePathname()
  const { i18n } = useTranslation()
  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()
  const { logOut } = useAuth() // Get logout function

  // Reusable Link Rendering Function
  const renderLink = (
    href: string,
    label: string,
    slug: string, // Use slug for icon lookup and key
    isDashboard: boolean = false,
  ) => {
    const isActive = !isDashboard
      ? pathname === href || pathname.startsWith(`${href}/`) // Check prefix for collection/global items
      : pathname === formatAdminURL({ adminRoute, path: '' }) // Exact match for dashboard

    // Use slug for icon lookup, fallback for dashboard
    const Icon = getSifmaxNavIcon(slug) || (isDashboard ? LayoutGrid : undefined)

    return (
      <Link
        href={href}
        prefetch={false}
        className={`
            flex items-center rounded-md px-3 py-2 text-sm relative group // Use group for hover states on icon
            transition-colors duration-150 ease-in-out // Smooth transitions
            ${
              isActive
                ? 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-50 font-medium' // Active styles: background, text, weight
                : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-900 font-normal' // Default & Hover styles
            }
          `}
      >
        {/* Active indicator bar */}
        {isActive && (
          <div className="absolute left-0 top-0 h-full w-[3px] rounded-r-md bg-blue-600 dark:bg-blue-500" />
        )}
        {/* Icon */}
        {Icon &&
          React.createElement(Icon, {
            className: `
              mr-3 h-[18px] w-[18px] flex-shrink-0 // Size and spacing
              transition-colors duration-150 ease-in-out
              ${
                isActive
                  ? 'text-gray-700 dark:text-gray-300' // Active icon color
                  : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400' // Default & Hover icon color
              }
            `,
          })}
        {/* Label */}
        <span className="flex-1 truncate">{label}</span>
      </Link>
    )
  }

  return (
    // Flex container to push logout to the bottom
    <div className="flex h-full flex-col justify-between">
      {/* Main Navigation Area */}
      {/* Add overall padding and space between logical sections */}
      <div className="flex-1 space-y-4 px-3 py-4">
        {/* Dashboard Link Section */}
        <div>
          {renderLink(
            formatAdminURL({ adminRoute, path: '' }),
            i18n.t('general:dashboard'),
            'dashboard',
            true,
          )}
        </div>

        {/* Render groups passed from server */}
        <div className="space-y-3">
          {' '}
          {/* Space between NavGroup components */}
          {groups.map(({ label, entities }, groupIndex) => {
            const groupKey = label || `group-${groupIndex}`
            const translatedGroupLabel = label

            // Only render NavGroup if label exists, otherwise render items directly (optional)
            if (label) {
              return (
                <NavGroup
                  // Use preferences if available, default to open
                  isOpen={navPreferences?.groups?.[groupKey]?.open ?? true}
                  key={groupKey}
                  label={translatedGroupLabel}
                  // Styling the NavGroup header itself
                  // className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 px-3 pt-2 pb-1" // Group header style
                >
                  {/* List container for items within the group */}
                  <ul className="space-y-1 list-none p-0 m-0 mt-1">
                    {' '}
                    {/* Space between items */}
                    {entities.map(({ slug, type, label: entityLabel }, entityIndex) => {
                      let href: string
                      const translatedEntityLabel = entityLabel

                      if (type === EntityType.collection) {
                        href = formatAdminURL({ adminRoute, path: `/collections/${slug}` })
                      } else {
                        // Assuming EntityType.global
                        href = formatAdminURL({ adminRoute, path: `/globals/${slug}` })
                      }

                      return (
                        <li key={`${groupKey}-entity-${entityIndex}`}>
                          {renderLink(href, translatedEntityLabel, slug)}
                        </li>
                      )
                    })}
                  </ul>
                </NavGroup>
              )
            } else {
              // Render items without a NavGroup wrapper if no label (optional behavior)
              return (
                <ul className="space-y-1 list-none p-0 m-0" key={groupKey}>
                  {entities.map(({ slug, type, label: entityLabel }, entityIndex) => {
                    let href: string
                    const translatedEntityLabel = entityLabel
                    if (type === EntityType.collection) {
                      href = formatAdminURL({ adminRoute, path: `/collections/${slug}` })
                    } else {
                      href = formatAdminURL({ adminRoute, path: `/globals/${slug}` })
                    }
                    return (
                      <li key={`${groupKey}-entity-${entityIndex}`}>
                        {renderLink(href, translatedEntityLabel, slug)}
                      </li>
                    )
                  })}
                </ul>
              )
            }
          })}
        </div>
      </div>

      {/* Logout Button Section */}
      {/* Add top border for visual separation */}
      <div className="mt-auto border-t border-gray-200 dark:border-gray-800 px-3 py-3">
        <button
          type="button"
          onClick={logOut}
          className="
              flex w-full items-center rounded-md px-3 py-2 text-sm group
              text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-50 hover:bg-gray-50 dark:hover:bg-gray-900 // Consistent hover
              transition-colors duration-150 ease-in-out
            "
        >
          <LogOut className="mr-3 h-[18px] w-[18px] flex-shrink-0 text-gray-400 dark:text-gray-500 group-hover:text-gray-500 dark:group-hover:text-gray-400" />
          <span className="flex-1 truncate text-left">{i18n.t('authentication:logOut')}</span>
        </button>
      </div>
    </div>
  )
}

// Need to import LayoutGrid if used as fallback for Dashboard icon
import { LayoutGrid, LogOut } from 'lucide-react'
