'use client'

import { Link } from '@payloadcms/ui'
import { CollectionSlug } from 'payload'

type Props = {
  sortedVisibleSlugs: CollectionSlug[]
}

function formatLabel(slug: string): string {
  // Simple example: replace hyphens, capitalize words
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function CustomNavLinks({ sortedVisibleSlugs }: Props) {
  return (
    <nav className="p-4 pr-6 text-sm">
      {' '}
      {/* Add padding, adjust as needed */}
      <ul className="space-y-1">
        {' '}
        {/* Controls vertical spacing between links */}
        {/* Manually add the Dashboard link */}
        <li>
          <Link
            href="/admin" // Standard Payload dashboard path
            className="block rounded-md px-3 py-1.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50" // Tailwind styling for links
          >
            Dashboard
          </Link>
        </li>
        {/* Map over the *sorted* visible collection slugs */}
        {sortedVisibleSlugs.map((slug) => {
          // Construct the link path to the collection list view
          const href = `/admin/collections/${slug}`
          // Generate a readable label from the slug
          const label = formatLabel(slug)

          // You could potentially get the official label from payload instance if needed:
          // const collectionConfig = props.payload.collections[slug]?.config;
          // const label = collectionConfig?.labels?.plural || formatLabel(slug);

          return (
            <li key={slug}>
              {/* Use Payload's Link component */}
              <Link
                href={href}
                // Apply consistent Tailwind styling for links
                // Payload's Link should automatically handle active states
                className="block rounded-md px-3 py-1.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50"
              >
                {label}
              </Link>
            </li>
          )
        })}
        {/* Add any other custom links if needed, potentially based on role */}
        {/* Example: Link only for superadmins */}
        {/* {props.user.roles?.includes('superadmin') && (
          <li>
             <Link href="/admin/settings" className="block rounded-md px-3 py-1.5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-50">
               Settings
             </Link>
          </li>
        )} */}
      </ul>
    </nav>
  )
}

export default CustomNavLinks
