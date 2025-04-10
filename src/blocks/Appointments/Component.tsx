import Loading from '@/app/(frontend)/loading'
import AppointmentsPageComponent from '@/components/AppointmentsPageComponent'

import { Page } from '@/payload-types'
import React, { Suspense } from 'react'

type Props = Extract<Page['layout'][0], { blockType: 'appointmentsPage' }> & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  id?: string

  disableInnerContainer?: boolean
}

export const AppointmentsPage: React.FC<Props> = (props) => {
  return (
    <Suspense fallback={<Loading />}>
      <AppointmentsPageComponent />
    </Suspense>
  )
}

export default AppointmentsPage
