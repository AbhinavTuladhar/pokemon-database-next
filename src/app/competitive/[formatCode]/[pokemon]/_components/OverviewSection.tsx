import React, { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import HtmlRenderer from '@/components/html-renderer'

interface SectionProps {
  overview: string | undefined
}

export const OverviewSection: FC<SectionProps> = ({ overview }) => (
  <>
    {overview ? (
      <section>
        <SectionTitle>Overview</SectionTitle>
        <HtmlRenderer html={overview} />
      </section>
    ) : null}
  </>
)
