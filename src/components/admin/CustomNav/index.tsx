// // src/admin/components/MyCustomNav.tsx  (Ensure path matches your payload.config.ts)

// import React from 'react'
// // Corrected import for Link in Payload v3 based on typical structure
// // If this path is wrong, check your node_modules/@payloadcms/ui directory structure
// import { Link } from '@payloadcms/ui/elements/Link'
// // Make sure types import path is correct for your setup
// import type { Payload } from 'payload'
// import type { User, Permissions, VisibleEntities } from 'payload' // Prefer importing specific types
// import CustomNavLinks from './CustomNavLinks'

// // Helper function to format slug into a readable label (optional)

// // Define the desired order of navigation items
// // Adjust this list based on all your collections and desired order
// const NAV_ORDER = [
//   'appointments',
//   'customers',
//   'pages',
//   'posts',
//   'categories',
//   'services',
//   'media', // Assuming you have a 'media' collection
//   'users',
// ]

// export default function MyCustomNav(props: {
//   user: User
//   payload: Payload // Payload instance might be needed if dynamically fetching labels
//   permissions: Permissions // Available but may not be needed if visibleEntities is sufficient
//   visibleEntities: VisibleEntities
// }) {
//   // Extract collection slugs the user can see
//   // Provide default empty array to prevent errors if undefined
//   const { collections: visibleCollectionSlugs = [] } = props.visibleEntities
//   console.log('propssss', props.user)

//   // Sort the visible slugs based on the predefined NAV_ORDER
//   const sortedVisibleSlugs = [...visibleCollectionSlugs].sort((a, b) => {
//     const indexA = NAV_ORDER.indexOf(a)
//     const indexB = NAV_ORDER.indexOf(b)
//     // If a slug isn't in NAV_ORDER, place it at the end
//     if (indexA === -1) return 1
//     if (indexB === -1) return -1
//     return indexA - indexB
//   })

//   return (
//     // Apply base navigation styling
//     <CustomNavLinks sortedVisibleSlugs={sortedVisibleSlugs} />
//   )
// }

// src/admin/components/MyCustomNav.tsx

import React from 'react'
// Make sure types import path is correct for your setup
import type { Payload } from 'payload'
import type { User, Permissions, VisibleEntities } from 'payload'
import NavLinks from './NavLinks'
// import NavLinks from './NavLinks'; // Import the Client Component

// Helper function to format slug into a readable label (can be moved or kept)
function formatLabel(slug: string): string {
  return slug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Define the desired order of navigation items
const NAV_ORDER = [
  'appointments',
  'customers',
  'pages',
  'posts',
  'categories',
  'services',
  'media', // Assuming you have a 'media' collection
  'forms', // Add other relevant slugs from your image
  'form-submissions',
  'redirects',
  'search', // Assuming 'search' is a global or custom view slug
  'users',
]

export type NavLinkData = {
  slug: string
  href: string
  label: string
}

export default function MyCustomNav(props: {
  user: User
  payload: Payload
  permissions: Permissions
  visibleEntities: VisibleEntities
}) {
  const { collections: visibleCollectionSlugs = [] } = props.visibleEntities
  // Consider Globals if you have any that should appear in nav
  // const { globals: visibleGlobalSlugs = [] } = props.visibleEntities;

  // Combine and filter based on NAV_ORDER (adjust if using globals)
  const allVisibleSlugs = [...visibleCollectionSlugs /*, ...visibleGlobalSlugs */]

  const sortedVisibleSlugs = [...new Set(allVisibleSlugs)].sort((a, b) => {
    const indexA = NAV_ORDER.indexOf(a)
    const indexB = NAV_ORDER.indexOf(b)
    if (indexA === -1) return 1 // Place unknown items at the end
    if (indexB === -1) return -1
    return indexA - indexB
  })

  // Prepare data structure for the client component
  const sortedLinks: NavLinkData[] = sortedVisibleSlugs.map((slug) => {
    let href = ''
    let label = ''

    // Ensure slug is typed correctly
    const collectionSlug = slug as keyof typeof props.payload.collections

    // Check if it's a known collection
    const collectionConfig = props.payload.collections[collectionSlug]?.config
    if (collectionConfig) {
      href = `/admin/collections/${slug}`
      label =
        typeof collectionConfig.labels?.plural === 'string'
          ? collectionConfig.labels?.plural
          : formatLabel(slug)
    } else {
      // Handle Globals or Custom Views here if needed
      // Example for a global:
      // const globalConfig = props.payload.globals[slug]?.config;
      // if (globalConfig) {
      //   href = `/admin/globals/${slug}`;
      //   label = globalConfig.label || formatLabel(slug);
      // } else {
      // Fallback for unknown slugs (like 'search' maybe?)
      href = `/admin/${slug}` // Adjust if needed
      label = formatLabel(slug)
      // }
    }

    return { slug, href, label }
  })

  // Manually add the Dashboard link at the beginning
  const linksWithDashboard: NavLinkData[] = [
    { slug: 'dashboard', href: '/admin', label: 'Dashboard' },
    ...sortedLinks,
  ]

  // Pass the prepared data to the client component
  return <NavLinks links={linksWithDashboard} />
}
