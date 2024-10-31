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

export const PokemonMovesLearned: FC<MovesLearnedProps> = ({ id, moves, pokemonName }) => {
  return (
    <>
      <SectionTitle>Moves learned by {formatName(pokemonName)}</SectionTitle>
      <MoveGenerationLinks id={id} />
      <MovesLearned moves={moves} pokemonName={pokemonName} />
    </>
  )
}
