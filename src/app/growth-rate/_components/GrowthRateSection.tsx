import React, { FC } from 'react'
import { InlineMath } from 'react-katex'

import { SectionTitle } from '@/components/ui/Title'
import formatName from '@/utils/formatName'

import PokemonList from './PokemonList'

import 'katex/dist/katex.min.css'

interface SectionProps {
  name: string
  formula: string
  pokemonNames: Array<string>
}

export const GrowthRateSection: FC<SectionProps> = ({ name, formula, pokemonNames }) => {
  return (
    <section className="border-bd-light dark:border-bd-dark rounded-lg border p-4 pt-2">
      <SectionTitle> {formatName(name)}</SectionTitle>
      <InlineMath math={formula} />
      <PokemonList pokemonNames={pokemonNames} />
    </section>
  )
}
