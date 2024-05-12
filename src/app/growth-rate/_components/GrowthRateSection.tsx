import React, { FC } from 'react'
import { InlineMath } from 'react-katex'

import { SectionTitle } from '@/components/containers'
import formatName from '@/utils/formatName'

import 'katex/dist/katex.min.css'

interface SectionProps {
  name: string
  formula: string
  pokemonNames: Array<string>
}

export const GrowthRateSection: FC<SectionProps> = ({ name, formula, pokemonNames }) => {
  return (
    <section>
      <SectionTitle> {formatName(name)}</SectionTitle>
      <InlineMath math={formula} />
    </section>
  )
}
