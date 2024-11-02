import React, { FC } from 'react'
import Image from 'next/image'

import { TableCell, TableCellHeader, TableContainer, TableRow } from '@/components/containers'
import BlueLink from '@/components/link'
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

export const ItemTable: FC<TableProps> = ({ itemData }) => {
  const headerNames = ['Name', 'Category', 'Effect']

  const headerRow = (
    <TableRow className="bg-neutral-200 dark:bg-hdr-dark">
      {headerNames.map(header => (
        <TableCellHeader
          className="border-r border-r-gray-300 pr-4 last:border-r-0 dark:border-r-bd-dark"
          type="column"
          key={header}
        >
          {header}
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
      <TableRow
        className="duration-300 hover:bg-amber-50 dark:hover:bg-dark-highlighted"
        key={item.name + index}
      >
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
