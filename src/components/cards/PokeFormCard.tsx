import React, { FC } from 'react'
import Image from 'next/image'

import formatName from '@/utils/formatName'

import { TypeCard } from '.'

interface PokeFormCardProps {
  typeNames: Array<string>
  defaultSprite: string | null
  shinySprite: string | null
  pokemonName: string
}

export const PokeFormCard: FC<PokeFormCardProps> = ({
  typeNames,
  defaultSprite,
  shinySprite,
  pokemonName,
}) => {
  const typeDiv = typeNames.map((type, index) => {
    return (
      <span key={index}>
        <TypeCard typeName={type} variant="text" />
        {index !== typeNames.length - 1 && <span> · </span>}
      </span>
    )
  })
  return (
    <article>
      <div className="flex justify-center">
        {defaultSprite && <Image src={defaultSprite} alt={pokemonName} width="128" height="128" />}
        {shinySprite && <Image src={shinySprite} alt={pokemonName} width="128" height="128" />}
      </div>
      <div className="text-center">
        <span> {formatName(pokemonName)} </span>
        <div>{typeDiv}</div>
      </div>
    </article>
  )
}
