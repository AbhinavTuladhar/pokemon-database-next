import React, { FC } from 'react'

import { MoveTable } from '@/components/moves-table'
import generationWiseMoveData from '@/data/moveData'
import MoveExtractor from '@/extractors/MoveExtractor'
import { MovesApi } from '@/services'

const getMovesList = async (offset: number, limit: number) => {
  const response = await MovesApi.getByOffsetAndLimit(offset, limit)
  return response
}

const getAllMoveData = async (names: Array<string>) => {
  const movesData = await MovesApi.getByNames(names)
  return movesData.map(MoveExtractor).sort((a, b) => (a.moveName > b.moveName ? 1 : -1))
}

interface WrapperProps {
  generationNumber: number
}

export const MoveTableWrapper: FC<WrapperProps> = async ({ generationNumber }) => {
  const { limit, offset } = generationWiseMoveData[generationNumber - 1]

  const moveList = await getMovesList(offset, limit)
  const allMovesData = await getAllMoveData(moveList)
  return <MoveTable moveData={allMovesData} />
}
