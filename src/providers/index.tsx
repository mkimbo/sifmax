import React from 'react'

import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'
import { ServiceProvider } from '@/context/service-context'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <ServiceProvider>
        <HeaderThemeProvider>{children}</HeaderThemeProvider>
      </ServiceProvider>
    </ThemeProvider>
  )
}
