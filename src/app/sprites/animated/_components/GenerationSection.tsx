import { FC } from 'react'

import type { NamedApiResource, Pokemon } from '@/types'

import { SpriteTable } from './SpriteTable'

interface SectionProps {
  generationNumber: number
  pokemonData: Array<NamedApiResource<Pokemon>>
}

export const GenerationSection: FC<SectionProps> = ({ generationNumber, pokemonData }) => {
  return (
    <div className="space-y-4 border-b-2 border-gray-300 pb-8">
      <h2 className="text-4xl font-bold"> Generation {generationNumber} </h2>
      <div className="grid grid-cols-sprite-table gap-10">
        {pokemonData.map((row, index) => {
          // Get the id number for the gif
          const idNumber = parseInt(row.url.match(/\/(\d+)\/$/)![1])
          return <SpriteTable id={idNumber} pokemonName={row.name} key={index} />
        })}
      </div>
    </div>
  )
}
