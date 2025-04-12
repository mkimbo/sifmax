import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'
import { sifmaxAdmin } from '@/access/sifmaxAdmin'
import { anyAdmin } from '@/access/anyAdmin'
import { adminGroups } from '@/utilities/adminGroups'

export const Customers: CollectionConfig = {
  slug: 'customers',
  access: {
    create: anyAdmin,
    delete: anyAdmin,
    read: anyAdmin,
    update: anyAdmin,
    admin: anyAdmin,
  },
  admin: {
    useAsTitle: 'name',
    group: adminGroups.featured,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'phone',
      type: 'number',
      required: true,
      unique: true,
    },
    {
      name: 'email',
      type: 'email',
    },
    ...slugField(),
  ],
}
