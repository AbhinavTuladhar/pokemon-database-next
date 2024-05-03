'use client'

import { ReactNode } from 'react'

import { AnimatedPageWrapper } from '@/components/containers'

export default function Template({ children }: { children: ReactNode }) {
  return <AnimatedPageWrapper>{children}</AnimatedPageWrapper>
}
