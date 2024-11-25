import React, { FC } from 'react'

import { MoveTable } from '@/components/moves-table'
import { MoveExtractor } from '@/extractors'
import { MovesApi } from '@/services'

interface MovesTableProps {
  moveNames: Array<string>
}

const getMovesData = async (names: Array<string>) => {
  const response = await MovesApi.getByNames(names)
  const extractedInfo = response.map(MoveExtractor)
  return extractedInfo.sort((a, b) => a.moveName.localeCompare(b.moveName))
}

export const TypeMoveTable: FC<MovesTableProps> = async ({ moveNames }) => {
  const movesData = await getMovesData(moveNames)

  return <MoveTable moveData={movesData} usePagination />
}
