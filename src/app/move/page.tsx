import React from 'react'
import Image from 'next/image'
import { MovesApi } from '@/services/MovesApi'
import MoveExtractor from '@/extractors/MoveExtractor'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import TableCell from '@/components/containers/TableCell'
import formatName from '@/utils/formatName'
import getMoveImage from '@/utils/getMoveImage'
import TypeCard from '@/components/TypeCard'
import BlueLink from '@/components/BlueLink'
import Link from 'next/link'

const getUrlList = async () => {
  const response = await MovesApi.getAllUrls()
  return response
}

const getAllMovesData = async (urls: Array<string>) => {
  const movesData = await MovesApi.getByUrls(urls)
  return movesData.map(MoveExtractor).sort((a, b) => (a.moveName > b.moveName ? 1 : -1))
}

const MoveList = async () => {
  const movesUrlList = await getUrlList()
  const allMovesData = await getAllMovesData(movesUrlList)

  const smallStyle = 'w-min'

  const headers = ['Name', 'Type', 'Cat.', 'Power', 'Acc', 'PP', 'Effect', 'Prob (%)']

  const HeaderRowCells = headers.map((header, index) => (
    <TableCellHeader type="column" key={index}>
      <span className="font-bold text-white">{header}</span>
    </TableCellHeader>
  ))

  const MoveDataRows = allMovesData.map((move, rowIndex) => {
    const { moveName, moveType, damageClass, power, accuracy, PP, shortEntry, effect_chance } = move

    const moveImageFile = getMoveImage(damageClass)
    const moveImagePath = `/move-types/${moveImageFile}`

    return (
      <TableRow className="odd:bg-gray-900" key={rowIndex}>
        <TableCell variant="column">
          <Link
            href={`/move/${moveName}`}
            className="font-bold text-blue-500 hover:text-red-500 hover:underline"
          >
            {formatName(moveName)}
          </Link>
        </TableCell>
        <TableCell variant="column">
          <TypeCard typeName={moveType} variant="small" />
        </TableCell>
        <TableCell variant="column">
          <div className="flex w-full justify-end">
            <Image src={moveImagePath} width={30} height={20} alt={damageClass} />
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
        <TableCell variant="column" extraClassName="min-w-10">
          {shortEntry.replace('$effect_chance% ', '')}
        </TableCell>
        <TableCell variant="column">{effect_chance}</TableCell>
      </TableRow>
    )
  })

  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold"> Pokémon Moves</h1>
      <TableContainer>
        <TableRow className="bg-[#1a1a1a]">{HeaderRowCells}</TableRow>
        <tbody>{MoveDataRows}</tbody>
      </TableContainer>
    </main>
  )
}

export default MoveList
