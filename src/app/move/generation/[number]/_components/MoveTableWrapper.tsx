import React, { FC } from 'react'

import { MoveTable } from '@/components/moves-table'
import generationWiseMoveData from '@/data/moveData'
import MoveService from '@/features/battle/services/move.service'
import { transformMove } from '@/features/battle/transformers/transform-move'

const getMovesList = async (offset: number, limit: number) => {
  const response = await MoveService.getByOffsetAndLimit(offset, limit)
  return response
}

const getAllMoveData = async (names: Array<string>) => {
  const movesData = await MoveService.getByNames(names)
  return movesData.map(transformMove).sort((a, b) => (a.moveName > b.moveName ? 1 : -1))
}

interface WrapperProps {
  generationNumber: number
}

export const MoveTableWrapper: FC<WrapperProps> = async ({ generationNumber }) => {
  const { limit, offset } = generationWiseMoveData[generationNumber - 1]

  const moveList = await getMovesList(offset, limit)
  const allMovesData = await getAllMoveData(moveList)
  return <MoveTable moveData={allMovesData} usePagination />
}
