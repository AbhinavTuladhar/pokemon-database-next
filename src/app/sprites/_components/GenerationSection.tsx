import React, { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import { NamedApiResource, Pokemon } from '@/types'

import { InfoCard } from './InfoCard'

interface SectiionProps {
  generationNumber: number
  pokemonData: Array<NamedApiResource<Pokemon>>
}

export const GenerationSection: FC<SectiionProps> = ({ generationNumber, pokemonData }) => {
  return (
    <section className="border-b-2 border-gray-300 pb-8">
      <SectionTitle>Generation {generationNumber}</SectionTitle>
      <div className="grid-cols-mini-sprite-table grid gap-3">
        {pokemonData.map((row, index) => {
          // Get the id number for the image
          const idNumber = parseInt(row.url.match(/\/(\d+)\/$/)![1])
          return <InfoCard id={idNumber} pokemonName={row.name} key={row.name + index} />
        })}
      </div>
    </section>
  )
}
