// src/admin/components/SifmaxNav/index.server.tsx
import type { CollectionSlug, GlobalSlug, ServerProps } from 'payload' // Use types from payload/types
import type { CollectionConfig, GlobalConfig } from 'payload'
import React from 'react'
//import { getNavPrefs } from './getNavPrefs';
import { NavWrapper } from './NavWrapper.client' // Import client wrapper
import { NavClient } from './NavClient.client' // Import client renderer
import { Logout } from '@payloadcms/ui' // Ensure correct import path
import { EntityType } from '@payloadcms/ui/shared' // Corrected import path
import { usePayloadAPI } from '@payloadcms/ui' // Import hook to get payload API URL
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'
// Define the structure passed to the client
type ProcessedEntity = {
  slug: string
  label: string // Use the actual label from config
  type: EntityType
}
export type ProcessedGroup = {
  label: string // Group label (e.g., "Salon Management")
  entities: ProcessedEntity[]
}

// Define the desired structure for each role
const SIFMAX_ADMIN_GROUPS_CONFIG: Record<string, string[]> = {
  'Salon Management': ['appointments', 'customers'],
}

const SUPER_ADMIN_GROUPS_CONFIG: Record<string, string[]> = {
  'Salon Management': ['appointments', 'customers'],
  'Website Content': ['pages', 'posts', 'categories', 'services', 'media'],
  'Forms & Admin': ['forms', 'form-submissions', 'redirects', 'search', 'users'], // Grouped logically
}

// --- Main Server Component ---
export const SifmaxNav: React.FC<ServerProps> = async (props) => {
  const { payload, user, permissions, visibleEntities, i18n, locale, params, searchParams } = props

  if (!user || !payload?.config || !permissions || !visibleEntities) {
    return null // Don't render nav if essential data is missing
  }

  const {
    collections,
    globals,
    admin: {
      components: { afterNavLinks, beforeNavLinks, logout },
    },
  } = payload.config

  // 1. Create lookup maps for easier access to config data
  const collectionMap = collections.reduce(
    (map, coll) => {
      map[coll.slug] = coll
      return map
    },
    {} as Record<string, CollectionConfig>,
  )

  const globalMap = globals.reduce(
    (map, glob) => {
      map[glob.slug] = glob
      return map
    },
    {} as Record<string, GlobalConfig>,
  )

  // 2. Determine which group config to use based on role
  const isAdmin = user.roles?.includes('sifmax_admin')
  const isSuper = user.roles?.includes('superadmin')
  let targetGroupConfig = SUPER_ADMIN_GROUPS_CONFIG // Default to superadmin
  if (isAdmin && !isSuper) {
    targetGroupConfig = SIFMAX_ADMIN_GROUPS_CONFIG
  } else if (!isSuper && !isAdmin) {
    // Handle users with neither role if necessary, maybe show nothing or default group
    return null // Or some default nav
  }

  // 3. Process groups: Filter entities based on visibility and build final structure
  const processedGroups: ProcessedGroup[] = Object.entries(targetGroupConfig)
    .map(([groupLabel, entitySlugs]) => {
      const visibleEntitiesInGroup = entitySlugs
        .map((slug): ProcessedEntity | null => {
          if (visibleEntities.collections.includes(slug as CollectionSlug) && collectionMap[slug]) {
            return {
              slug,
              label: slug, // Use configured label
              type: EntityType.collection,
            }
          }
          if (visibleEntities.globals.includes(slug as GlobalSlug) && globalMap[slug]) {
            return {
              slug,
              label: (globalMap[slug].label as string) || slug, // Use configured label
              type: EntityType.global,
            }
          }
          // Handle other entity types if needed (e.g., custom views mapped by slug)
          // Example for a hypothetical 'search' view:
          // if (slug === 'search' && /* check if user can access search view */ true) {
          //   return { slug: 'search', label: 'Search', type: EntityType.view }; // Assuming EntityType.view exists or use custom type
          // }

          return null // Entity is not visible or not found
        })
        .filter((entity): entity is ProcessedEntity => entity !== null) // Remove nulls

      // Only include the group if it has visible entities
      if (visibleEntitiesInGroup.length > 0) {
        return {
          label: groupLabel,
          entities: visibleEntitiesInGroup,
        }
      }
      return null // Exclude empty groups
    })
    .filter((group): group is ProcessedGroup => group !== null) // Remove null groups

  // 4. Fetch Nav Preferences (Optional, for group collapsibility)
  //   const navPreferences = await getNavPrefs({ payload, user });

  // 5. Prepare Logout Component
  const LogoutComponent = RenderServerComponent({
    // Pass necessary props if your custom logout needs them
    clientProps: {},
    Component: logout?.Button, // Use configured custom logout button if available
    Fallback: Logout, // Default Payload logout button
    importMap: payload.importMap, // May not be needed in newer Payload versions
    serverProps: { i18n, locale, params, payload, permissions, searchParams, user },
  })

  // 6. Render the structure
  return (
    <NavWrapper>
      {' '}
      {/* Outer wrapper from client component */}
      {/* Optional: Add logo/header area here if needed */}
      <div className="px-6 py-4">
        {' '}
        {/* Example Header/Logo area */}
        {/* You can Render your Logo component here */}
        {/* <YourLogoComponent /> */}
        <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Sifmax Admin</h1>
      </div>
      <nav className="flex flex-1 flex-col justify-between">
        {' '}
        {/* Flex container for nav and logout */}
        {/* Main Nav Area */}
        <div className="flex-1 overflow-y-auto">
          {/* Render Before Nav Links Slot */}
          {RenderServerComponent({
            clientProps: {},
            Component: beforeNavLinks,
            importMap: payload.importMap,
            serverProps: { i18n, locale, params, payload, permissions, searchParams, user },
          })}

          {/* Render the Client Nav with processed groups */}
          <NavClient groups={processedGroups} />

          {/* Render After Nav Links Slot */}
          {RenderServerComponent({
            clientProps: {},
            Component: afterNavLinks,
            importMap: payload.importMap,
            serverProps: { i18n, locale, params, payload, permissions, searchParams, user },
          })}
        </div>
        {/* Logout Control Area - Pushed to bottom */}
        <div className="mb-2 px-4 py-2 border-t border-gray-200 dark:border-gray-700">
          {LogoutComponent}
        </div>
      </nav>
      {/* Mobile Hamburger - Optional, if needed */}
      {/* <div className="absolute top-0 right-0 p-4 lg:hidden">
           <NavHamburger /> // Requires NavHamburger component adaptation
      </div> */}
    </NavWrapper>
  )
}

// Default export needed for dynamic import by Payload
export default SifmaxNav
