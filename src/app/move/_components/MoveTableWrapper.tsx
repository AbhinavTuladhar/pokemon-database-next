import React from 'react'

import MoveExtractor from '@/extractors/MoveExtractor'
import { MovesApi } from '@/services'

import { MoveTable } from './MoveTable'

const getMovesList = async () => {
  const response = await MovesApi.getAllNames()
  return response
}

const getAllMoveData = async (names: Array<string>) => {
  const movesData = await MovesApi.getByNames(names)
  return movesData.map(MoveExtractor).sort((a, b) => (a.moveName > b.moveName ? 1 : -1))
}

export const MoveTableWrapper = async () => {
  const moveList = await getMovesList()
  const allMovesData = await getAllMoveData(moveList)
  return <MoveTable moveData={allMovesData} />
}
