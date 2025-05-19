import React, { FC } from 'react'

import HtmlRenderer from '@/components/html-renderer'
import { SectionTitle } from '@/components/ui/Title'

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
