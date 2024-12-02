import React, { FC } from 'react'
import { InlineMath } from 'react-katex'

import { SectionTitle } from '@/components/containers'
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
    <section className="rounded-lg border border-bd-light p-4 pt-2  dark:border-bd-dark ">
      <SectionTitle> {formatName(name)}</SectionTitle>
      <InlineMath math={formula} />
      <PokemonList pokemonNames={pokemonNames} />
    </section>
  )
}
