import React, { FC, PropsWithChildren } from 'react'
import { ThemeProvider } from 'next-themes'
import { SkeletonTheme } from 'react-loading-skeleton'

export const GlobalProviders: FC<PropsWithChildren> = ({ children }) => (
  <ThemeProvider attribute="class" enableSystem={true} defaultTheme="system">
    <SkeletonTheme baseColor="#bababa" highlightColor="#9f9f9f">
      {children}
    </SkeletonTheme>
  </ThemeProvider>
)
