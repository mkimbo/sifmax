import type { CollectionConfig } from 'payload'

import { anyone } from '../access/anyone'
import { authenticated } from '../access/authenticated'
import { slugField } from '@/fields/slug'
import { superAdmin } from '@/access/superAdmin'
import { adminGroups } from '@/utilities/adminGroups'

export const Categories: CollectionConfig = {
  slug: 'categories',
  access: {
    create: superAdmin,
    delete: superAdmin,
    read: anyone,
    update: superAdmin,
    admin: superAdmin,
  },
  admin: {
    useAsTitle: 'title',
    hidden: true,
    group: adminGroups.website,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    ...slugField(),
  ],
}
