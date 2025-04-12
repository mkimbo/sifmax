import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { sifmaxAdmin } from '@/access/sifmaxAdmin'
import { anyAdmin } from '@/access/anyAdmin'
import { adminGroups } from '@/utilities/adminGroups'

export const Appointments: CollectionConfig = {
  slug: 'appointments',
  access: {
    create: anyAdmin,
    delete: anyAdmin,
    read: anyAdmin,
    update: anyAdmin,
    admin: anyAdmin,
  },
  admin: {
    group: adminGroups.featured,
  },
  fields: [
    {
      name: 'customer',
      type: 'relationship',
      hasMany: false,
      relationTo: 'customers',
      required: true,
    },
    {
      name: 'appointmentDateTime',
      type: 'date',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      options: [
        { label: 'Booked', value: 'Booked' },
        { label: 'Confirmed', value: 'Confirmed' },
        { label: 'Completed', value: 'Completed' },
        { label: 'Cancelled', value: 'Cancelled' },
        { label: 'No-Show', value: 'No-Show' },
      ],
      defaultValue: 'Booked',
      required: true,
    },
    {
      name: 'notes',
      type: 'textarea',
    },
    {
      name: 'googleCalendarEventId',
      type: 'text',
    },
  ],
}
