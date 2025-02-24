import React, { FC } from 'react'

import BlueLink from '@/components/link'
import formatName from '@/utils/formatName'

interface IntroProps {
  id: number
  name: string
}

export const Intro: FC<IntroProps> = ({ id, name }) => {
  const pokemonSpan = (
    <span className="italic">
      <span> #{id} </span>
      <span> {formatName(name)} </span>
    </span>
  )
  return (
    <div className="dark:bg-muted-blue flex flex-col items-start justify-start gap-y-4 bg-sky-100 p-4">
      <span>Below are all the sprites of {pokemonSpan} used throughout the games.</span>
      <div className="flex flex-col items-start justify-start gap-y-px">
        <BlueLink href={`/pokedex/${name}`}>&lt;&lt; back to {formatName(name)} Pokédex</BlueLink>
        <BlueLink href={`/sprites`}>&lt;&lt; back to sprite list</BlueLink>
      </div>
    </div>
  )
}
