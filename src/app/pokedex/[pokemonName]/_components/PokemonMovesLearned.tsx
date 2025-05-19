import React, { FC } from 'react'

import MovesLearned from '@/components/learned-moves'
import MoveGenerationLinks from '@/components/move-generation-links'
import { SectionTitle } from '@/components/ui/Title'
import { PokemonMove } from '@/types'
import { formatName } from '@/utils/string.utils'

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
        moves={moves}
        pokemonName={pokemonName}
      />
    </>
  )
}
