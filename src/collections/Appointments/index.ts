import type { CollectionConfig } from 'payload'

import { anyone } from '../../access/anyone'
import { authenticated } from '../../access/authenticated'
import { sifmaxAdmin } from '@/access/sifmaxAdmin'
import { anyAdmin } from '@/access/anyAdmin'
import { adminGroups } from '@/utilities/adminGroups'
import { afterAppointmentChange } from './hooks/afterAppointmentChange'
import { beforeAppointmentChange } from './hooks/beforeAppointmentChange'

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
      // required: true,
      admin: {
        // Conditionally show this field only if not creating a new customer
        condition: (data) => !data.newCustomerName && !data.newCustomerPhone,
      },
    },
    {
      name: 'newCustomerName',
      type: 'text',
      label: 'New Customer Name',
      admin: {
        // Show only if 'customer' relationship is not selected
        condition: (data) => !data.customer,
        description: 'Enter name only if creating a new customer.',
      },
    },
    {
      name: 'newCustomerPhone',
      type: 'text',
      label: 'New Customer Phone',
      admin: {
        // Show only if 'customer' relationship is not selected
        condition: (data) => !data.customer,
        description: 'Required if creating a new customer.',
      },
    },
    {
      name: 'newCustomerEmail',
      type: 'email',
      label: 'New Customer Email (Optional)',
      admin: {
        // Show only if 'customer' relationship is not selected
        condition: (data) => !data.customer,
      },
    },
    {
      name: 'appointmentDateTime',
      type: 'date',
      required: true,
      // admin: {
      //   date: {
      //     pickerAppearance: 'dayAndTime',
      //     timeIntervals: 15, // Example: 15 minute intervals
      //   },
      // },
    },
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
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
      label: 'Extras & Notes',
      admin: {
        description: 'Any additional notes or extras for the appointment.',
      },
    },
    {
      name: 'source',
      type: 'select',
      options: [
        { label: 'Admin Panel', value: 'admin' },
        { label: 'Website', value: 'website' },
        // { label: 'Phone', value: 'phone' },
      ],
      defaultValue: 'admin',
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'googleCalendarEventId',
      type: 'text',
      label: 'Google Calendar Event ID',
      admin: {
        readOnly: true,
        position: 'sidebar',
      },
    },
  ],
  hooks: {
    afterChange: [afterAppointmentChange],
    beforeChange: [beforeAppointmentChange],
    // afterDelete: [revalidateDelete],
  },
}
