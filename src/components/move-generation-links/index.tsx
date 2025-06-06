'use client'

import React, { FC } from 'react'
import { useParams } from 'next/navigation'

import { pokemonIdToGeneration } from '@/features/battle/data/pokemon.data'
import { isLatestGeneration } from '@/features/pokemon/helpers/pokemon.helper'

import { TransitionLink } from '../ui/Link'

const generateArray = (start: number) => {
  const end = 6
  const result: number[] = []

  for (let i = start; i <= end; i++) {
    result.push(i)
  }
  return result
}

interface ListItemProps {
  pokemonName: string
  currentGenerationNumber: string
  number: string
}

const ListItem: FC<ListItemProps> = ({ pokemonName, currentGenerationNumber, number }) => {
  if (currentGenerationNumber === number) {
    return (
      <li className="inline-flex w-max justify-center px-4 text-black dark:text-white">{number}</li>
    )
  }

  return (
    <li className="inline-flex w-max justify-center px-4">
      <TransitionLink href={`/pokedex/${pokemonName}/moves/${number}`}>{number}</TransitionLink>
    </li>
  )
}

interface MoveGenerationLinksProps {
  id: number
}

const MoveGenerationLinks: FC<MoveGenerationLinksProps> = ({ id }) => {
  const { generationNumber, pokemonName } = useParams<{
    pokemonName: string
    generationNumber: string
  }>()

  // Get the generation of the Pokemon on the bassis of the id
  const generation = parseInt(pokemonIdToGeneration(id))

  // If the Pokemon is in the latest generation, don't show anything as there is previous generation
  // moveset to show
  if (isLatestGeneration(id)) {
    return null
  }

  const numbers = generateArray(generation)

  return (
    <div className="dark:bg-muted-blue grid place-items-center rounded-lg bg-sky-100">
      <ul className="flex flex-row flex-wrap items-center justify-center gap-y-2 divide-x divide-gray-400 py-4 dark:divide-white">
        <li className="px-4 font-bold text-black dark:text-white">In other generations</li>
        {numbers.map((number, index) => (
          <ListItem
            key={index}
            pokemonName={pokemonName}
            currentGenerationNumber={generationNumber}
            number={number.toString()}
          />
        ))}
      </ul>
    </div>
  )
}

export default MoveGenerationLinks
