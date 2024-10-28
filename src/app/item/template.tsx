'use client'

import { ReactNode } from 'react'

import { AnimatedPageWrapper } from '@/components/containers'

export default function Template({ children }: Readonly<{ children: ReactNode }>) {
  return <AnimatedPageWrapper>{children}</AnimatedPageWrapper>
}
