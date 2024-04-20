import React, { FC } from 'react'
import Image from 'next/image'

import BlueLink from '@/components/BlueLink'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import formatName, { formatText } from '@/utils/formatName'

interface ItemData {
  shortEntry: string
  sprite: string
  category: string
  name: string
}

interface TableProps {
  itemData: Array<ItemData>
}

const ItemTable: FC<TableProps> = ({ itemData }) => {
  const headerNames = ['Name', 'Category', 'Effect']

  const headerRow = (
    <TableRow className="bg-table-header">
      {headerNames.map(header => (
        <TableCellHeader
          className="border-r border-slate-300 pr-4 last:border-r-0"
          type="column"
          key={header}
        >
          <span className="font-bold">{header}</span>
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const tableRows = itemData.map((item, index) => {
    const { category, name, shortEntry, sprite } = item
    const nameDiv = (
      <div className="flex items-center gap-x-2">
        {sprite ? (
          <Image src={sprite} alt={name} width={32} height={32} />
        ) : (
          <div className="h-8 w-8" />
        )}
        <BlueLink boldFlag={true} href={`/item/${name}`}>
          {formatName(name)}
        </BlueLink>
      </div>
    )

    return (
      <TableRow key={index} className="odd:bg-gray-900">
        <TableCell variant="column" extraClassName="w-40 whitespace-nowrap">
          {nameDiv}
        </TableCell>
        <TableCell variant="column" extraClassName="w-48 whitespace-nowrap">
          {formatText(category)}
        </TableCell>
        <TableCell variant="column" extraClassName="min-w-96">
          {shortEntry}
        </TableCell>
      </TableRow>
    )
  })

  return (
    <TableContainer>
      <thead>{headerRow}</thead>
      <tbody>{tableRows}</tbody>
    </TableContainer>
  )
}

export default ItemTable