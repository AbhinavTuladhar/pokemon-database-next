import React, { FC } from 'react'

import { PokemonMove } from '@/types'
import { processMoveData } from '@/utils/movesLearned.utils'

import TableTabs from './TableTabs'

interface MoveData {
  pokemonName: string
  moves: Array<PokemonMove>
  versionGroupName: string
  versionNames: Array<string>
}

const MovesLearned: FC<MoveData> = async ({
  pokemonName,
  versionGroupName,
  moves,
  versionNames,
}) => {
  const finalMoveDetails = await processMoveData(moves, versionNames)

  return (
    <TableTabs
      pokemonName={pokemonName}
      movesData={finalMoveDetails}
      versionGroupNames={versionNames}
    />
  )
}

export default MovesLearned
