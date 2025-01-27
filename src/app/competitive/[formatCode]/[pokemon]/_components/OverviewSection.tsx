import React, { FC } from 'react'

import { SectionTitle } from '@/components/containers'

interface SectionProps {
  overview: string | undefined
}

export const OverviewSection: FC<SectionProps> = ({ overview }) => (
  <>
    {overview ? (
      <section>
        <SectionTitle>Overview</SectionTitle>
        <div dangerouslySetInnerHTML={{ __html: overview }} />
      </section>
    ) : null}
  </>
)
