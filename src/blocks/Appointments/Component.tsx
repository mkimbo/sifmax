import Loading from '@/app/(frontend)/loading'
import AppointmentsPageComponent from '@/components/AppointmentsPageComponent'
import configPromise from '@payload-config'
import { Page } from '@/payload-types'
import React, { Suspense } from 'react'

import { getPayload, type Payload } from 'payload'

// Include mode
const getServices = async () => {
  const payload = await getPayload({ config: configPromise })
  const services = await payload.find({
    collection: 'services',
    limit: 1000,
    // select: {
    //   text: true,
    //   // select a specific field from group
    //   group: {
    //     number: true,
    //   },
    //   // select all fields from array
    //   array: true,
    // },
  })

  return services
}

type Props = Extract<Page['layout'][0], { blockType: 'appointmentsPage' }> & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  id?: string

  disableInnerContainer?: boolean
}

export const AppointmentsPage: React.FC<Props> = async (props) => {
  const services = await getServices()

  return (
    <Suspense fallback={<Loading />}>
      <AppointmentsPageComponent services={services.docs} />
    </Suspense>
  )
}

export default AppointmentsPage
