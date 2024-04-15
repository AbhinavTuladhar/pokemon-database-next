import React from 'react'
import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import MoveExtractor from '@/extractors/MoveExtractor'
import { MovesApi } from '@/services/MovesApi'

import MoveTable from './_components/MoveTable'

export const metadata: Metadata = {
  title: 'Pokémon move list | Pokémon Database',
}

const getMovesList = async () => {
  const response = await MovesApi.getAllNames()
  return response
}

const getAllMoveData = async (names: Array<string>) => {
  const movesData = await MovesApi.getByNames(names)
  return movesData.map(MoveExtractor).sort((a, b) => (a.moveName > b.moveName ? 1 : -1))
}

const MoveList = async () => {
  const moveList = await getMovesList()
  const allMovesData = await getAllMoveData(moveList)

  return (
    <main>
      <PageTitle>Pokémon Moves</PageTitle>
      <MoveTable moveData={allMovesData} />
    </main>
  )
}

export default MoveList
