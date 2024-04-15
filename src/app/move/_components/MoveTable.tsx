'use client'

import React, { ChangeEvent, FC, useState } from 'react'
import Link from 'next/link'

import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import Input from '@/components/Input'
import MoveCategoryImage from '@/components/MoveCategoryImage'
import TypeCard from '@/components/TypeCard'
import { TransformedMove } from '@/types'
import formatName from '@/utils/formatName'

interface TableProps {
  moveData: Array<TransformedMove>
}

const MoveTable: FC<TableProps> = ({ moveData }) => {
  const [filteredData, setFilteredData] = useState(moveData)
  const [filterText, setFilterText] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const searchString = event.target.value.toLowerCase()
    setFilterText(searchString)
    if (!searchString) {
      setFilteredData(moveData)
    } else {
      const filteredSlice = moveData.filter(move => move.moveName.includes(searchString))
      setFilteredData(filteredSlice)
    }
  }

  const headers = ['Name', 'Type', 'Cat.', 'Power', 'Acc', 'PP', 'Effect', 'Prob (%)']

  const headerRowCells = (
    <TableRow className="bg-table-header">
      {headers.map((header, index) => (
        <TableCellHeader type="column" key={index}>
          <span className="font-bold text-white">{header}</span>
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const moveDataRows = filteredData.map((move, rowIndex) => {
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
    <>
      <div className="mb-8 flex justify-center">
        <Input placeholder="Search for a move" onChange={handleChange} value={filterText} />
      </div>
      <TableContainer>
        <thead>{headerRowCells}</thead>
        <tbody>{moveDataRows}</tbody>
      </TableContainer>
    </>
  )
}

export default MoveTable
