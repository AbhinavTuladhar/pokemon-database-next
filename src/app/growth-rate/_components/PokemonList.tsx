'use client'

import React, { FC } from 'react'

import Accordion from '@/components/ui/Accordion'
import { TransitionLink } from '@/components/ui/Link'
import { formatName } from '@/utils/string.utils'

interface ListProps {
  pokemonNames: Array<string>
}

const PokemonList: FC<ListProps> = ({ pokemonNames }) => (
  <Accordion>
    <Accordion.Trigger>
      <span className="text-xl font-bold">List of Pokémon</span>
    </Accordion.Trigger>
    <Accordion.Content>
      <div className="grid-cols-pokemon-list mt-4 grid gap-x-4">
        {pokemonNames.map(name => (
          <span key={name}>
            <TransitionLink href={`/pokedex/${name}`}>{formatName(name)}</TransitionLink>
          </span>
        ))}
      </div>
    </Accordion.Content>
  </Accordion>
)

export default PokemonList
