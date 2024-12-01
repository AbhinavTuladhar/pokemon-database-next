import React, { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import { SkeletonTheme } from 'react-loading-skeleton'

export const GlobalProviders: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
    <SkeletonTheme baseColor="hsl(0, 0%, 72.9%)" highlightColor="hsl(0, 0%, 62.4%)">
      {children}
    </SkeletonTheme>
  </ThemeProvider>
)
