'use client'

import React, { ChangeEvent, FC, useState } from 'react'
import { Link } from 'next-view-transitions'

import { TypeCard } from '@/components/cards'
import { TableCell, TableCellHeader, TableContainer, TableRow } from '@/components/containers'
import Input from '@/components/input'
import MoveCategoryImage from '@/components/move-category-image'
import { TransformedMove } from '@/types'
import formatName from '@/utils/formatName'

interface TableProps {
  moveData: Array<TransformedMove>
}

export const MoveTable: FC<TableProps> = ({ moveData }) => {
  const [filteredData, setFilteredData] = useState(moveData)
  const [filterText, setFilterText] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const rawInput = event.target.value
    setFilterText(rawInput)
    const searchString = rawInput.trim().toLowerCase()
    if (!searchString) {
      setFilteredData(moveData)
    } else {
      const filteredSlice = moveData.filter(move =>
        move.moveName.replaceAll('-', ' ').includes(searchString),
      )
      setFilteredData(filteredSlice)
    }
  }

  const headers = ['Name', 'Type', 'Cat.', 'Power', 'Acc', 'PP', 'Effect', 'Prob (%)']

  const headerRowCells = (
    <TableRow className="bg-neutral-200  dark:bg-hdr-dark">
      {headers.map((header, index) => (
        <TableCellHeader
          type="column"
          key={header + index}
          className="border-r border-r-gray-300 pr-4 last:border-r-0 dark:border-r-bd-dark"
        >
          {header}
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const moveDataRows = filteredData.map(move => {
    const { moveName, moveType, damageClass, power, accuracy, PP, shortEntry, effect_chance } = move

    return (
      <TableRow
        className="duration-300 hover:bg-amber-50 dark:hover:bg-dark-highlighted"
        key={move.id}
      >
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
