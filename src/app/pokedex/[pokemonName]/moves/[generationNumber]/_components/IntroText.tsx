import React, { FC } from 'react'
import Image from 'next/image'

import BlueLink from '@/components/link'
import { generationToGameListMapV2 } from '@/data/generationToGameListMap'
import formatName from '@/utils/formatName'

interface IntroTextProps {
  image: string | null
  pokemonName: string
  generationNumber: string
}

export const IntroText: FC<IntroTextProps> = ({ image, pokemonName, generationNumber }) => {
  const gameNames = generationToGameListMapV2[`Generation ${generationNumber}`]
  const formattedName = formatName(pokemonName)

  return (
    <section className="grid grid-cols-12 pb-4">
      <div className="col-span-12 sm:col-span-7 lg:col-span-8">
        <div className="space-y-4">
          <span>
            This page lists all the moves that {formattedName} can learn in Generation
            {generationNumber}, which consists of these games:
          </span>
          <ul className="list-inside list-disc">
            {gameNames.map(gameName => (
              <li key={gameName}>Pokémon {formatName(gameName)}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="col-span-12 text-center sm:col-span-5 lg:col-span-4">
        {image && (
          <Image className="h-auto w-auto" src={image} width={0} height={0} alt={'image'} />
        )}
        <BlueLink href={`/pokedex/${pokemonName}`}>
          &lt;&lt; back to {formattedName} Pokédex
        </BlueLink>
      </div>
    </section>
  )
}
