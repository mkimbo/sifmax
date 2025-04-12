import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { slugField } from '@/fields/slug'
import { anyAdmin } from '@/access/anyAdmin'
import { superAdmin } from '@/access/superAdmin'
import { adminGroups } from '@/utilities/adminGroups'

export const Services: CollectionConfig = {
  slug: 'services',
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
      name: 'duration',
      type: 'number',
      required: true,
    },
    {
      name: 'price',
      type: 'number',
      required: true,
    },
    {
      name: 'isActive',
      type: 'checkbox',
      defaultValue: true,
    },
    ...slugField(),
  ],
}
