import React, { FC } from 'react'

import { MoveTable } from '@/components/moves-table'
import MoveService from '@/features/battle/services/move.service'
import { transformMove } from '@/features/battle/transformers/transform-move'

interface MovesTableProps {
  moveNames: Array<string>
}

const getMovesData = async (names: Array<string>) => {
  const response = await MoveService.getByNames(names)
  const extractedInfo = response.map(transformMove)
  return extractedInfo.sort((a, b) => a.moveName.localeCompare(b.moveName))
}

export const TypeMoveTable: FC<MovesTableProps> = async ({ moveNames }) => {
  const movesData = await getMovesData(moveNames)

  return <MoveTable moveData={movesData} usePagination />
}
