import React, { FC } from 'react'

import { MoveTable } from '@/components/moves-table'
import { MoveExtractor } from '@/extractors'
import MoveService from '@/features/battle/services/move.service'

interface MovesTableProps {
  moveNames: Array<string>
}

const getMovesData = async (names: Array<string>) => {
  const response = await MoveService.getByNames(names)
  const extractedInfo = response.map(MoveExtractor)
  return extractedInfo.sort((a, b) => a.moveName.localeCompare(b.moveName))
}

export const TypeMoveTable: FC<MovesTableProps> = async ({ moveNames }) => {
  const movesData = await getMovesData(moveNames)

  return <MoveTable moveData={movesData} usePagination />
}
