import { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import type { NamedApiResource, Pokemon } from '@/types'

import { SpriteTable } from './SpriteTable'

interface SectionProps {
  generationNumber: number
  pokemonData: Array<NamedApiResource<Pokemon>>
}

export const GenerationSection: FC<SectionProps> = ({ generationNumber, pokemonData }) => {
  return (
    <section className="border-b-2 border-gray-300 pb-8">
      <SectionTitle>Generation {generationNumber}</SectionTitle>
      <div className="grid-cols-sprite-table grid gap-10">
        {pokemonData.map((row, index) => {
          // Get the id number for the gif
          const idNumber = parseInt(row.url.match(/\/(\d+)\/$/)![1])
          return <SpriteTable id={idNumber} pokemonName={row.name} key={row.name + index} />
        })}
      </div>
    </section>
  )
}
