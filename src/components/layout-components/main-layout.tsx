import React, { FC, PropsWithChildren } from 'react'

import { AnimatedPageWrapper } from '@/components/containers'

export const MainLayout: FC<PropsWithChildren> = ({ children }) => (
  <div className="main-layout mx-4 max-w-(--breakpoint-xl) pb-4 md:mx-8 xl:mx-auto xl:px-8">
    <AnimatedPageWrapper>{children}</AnimatedPageWrapper>
  </div>
)
