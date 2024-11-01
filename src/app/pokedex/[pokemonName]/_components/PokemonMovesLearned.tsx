import React, { FC } from 'react'

import { SectionTitle } from '@/components/containers'
import MovesLearned from '@/components/learned-moves'
import MoveGenerationLinks from '@/components/move-generation-links'
import { PokemonMove } from '@/types'
import formatName from '@/utils/formatName'

interface MovesLearnedProps {
  pokemonName: string
  id: number
  moves: Array<PokemonMove>
}

export const PokemonMovesLearned: FC<MovesLearnedProps> = async ({ id, moves, pokemonName }) => {
  return (
    <>
      <SectionTitle>Moves learned by {formatName(pokemonName)}</SectionTitle>
      <MoveGenerationLinks id={id} />
      <MovesLearned
        versionNames={['sun-moon', 'ultra-sun-ultra-moon']}
        versionGroupName="sun-moon"
        moves={moves}
        pokemonName={pokemonName}
      />
    </>
  )
}
