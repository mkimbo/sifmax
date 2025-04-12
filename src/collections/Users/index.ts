import type { ClientUser, CollectionConfig } from 'payload'

import { authenticated } from '../../access/authenticated'
import { superAdmin } from '@/access/superAdmin'
import { anyAdmin } from '@/access/anyAdmin'
import { adminGroups } from '@/utilities/adminGroups'
import { superAdminCollection } from '@/access/superAdminCollection'

export const Users: CollectionConfig = {
  slug: 'users',
  access: {
    // admin: superAdmin,
    create: superAdmin,
    delete: superAdmin,
    read: authenticated,
    update: anyAdmin,
    //admin: anyAdmin,
  },
  admin: {
    defaultColumns: ['name', 'email'],
    useAsTitle: 'name',
    group: adminGroups.website,
    hidden: superAdminCollection,
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      access: {
        read: ({ req: { user } }) => {
          if (user && user.roles?.includes('superadmin')) {
            return true
          }
          return false
        },
      },
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Sifmax Admin', value: 'sifmax_admin' },
        { label: 'Super Admin', value: 'superadmin' },
      ],
    },
  ],
  timestamps: true,
}
