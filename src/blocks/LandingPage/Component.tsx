import LandingPageComponent from '@/components/LandingPageComponent'
import { Page } from '@/payload-types'
import React from 'react'

type Props = Extract<Page['layout'][0], { blockType: 'landingPage' }> & {
  breakout?: boolean
  captionClassName?: string
  className?: string
  enableGutter?: boolean
  id?: string

  disableInnerContainer?: boolean
}

export const LandingPage: React.FC<Props> = (props) => {
  return <LandingPageComponent />
}

export default LandingPage
