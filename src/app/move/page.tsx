import React, { Suspense } from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import PageTitle from '@/components/containers/PageTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import MoveCategoryImage from '@/components/MoveCategoryImage'
import LoadingPageFallback from '@/components/Suspense/LoadingPageFallback'
import TypeCard from '@/components/TypeCard'
import MoveExtractor from '@/extractors/MoveExtractor'
import { MovesApi } from '@/services/MovesApi'
import formatName from '@/utils/formatName'

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

  const headers = ['Name', 'Type', 'Cat.', 'Power', 'Acc', 'PP', 'Effect', 'Prob (%)']

  const headerRowCells = (
    <TableRow className="bg-[#1a1a1a]">
      {headers.map((header, index) => (
        <TableCellHeader type="column" key={index}>
          <span className="font-bold text-white">{header}</span>
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const moveDataRows = allMovesData.map((move, rowIndex) => {
    const { moveName, moveType, damageClass, power, accuracy, PP, shortEntry, effect_chance } = move

    return (
      <TableRow className="odd:bg-gray-900" key={rowIndex}>
        <TableCell variant="column">
          <Link href={`/move/${moveName}`} className="less-fancy-link font-bold">
            {formatName(moveName)}
          </Link>
        </TableCell>
        <TableCell variant="column">
          <TypeCard typeName={moveType} variant="small" />
        </TableCell>
        <TableCell variant="column">
          <div className="flex w-full justify-end">
            <MoveCategoryImage category={damageClass} />
          </div>
        </TableCell>
        <TableCell variant="column" extraClassName="text-right">
          {power}
        </TableCell>
        <TableCell variant="column" extraClassName="text-right">
          {accuracy}
        </TableCell>
        <TableCell variant="column" extraClassName="text-right">
          {PP}
        </TableCell>
        <TableCell variant="column" extraClassName="min-w-[25rem]">
          {shortEntry.replace('$effect_chance% ', '')}
        </TableCell>
        <TableCell variant="column">{effect_chance}</TableCell>
      </TableRow>
    )
  })

  return (
    <Suspense fallback={<LoadingPageFallback />}>
      <main>
        <PageTitle>Pokémon Moves</PageTitle>
        <TableContainer>
          <thead>{headerRowCells}</thead>
          <tbody>{moveDataRows}</tbody>
        </TableContainer>
      </main>
    </Suspense>
  )
}

export default MoveList
