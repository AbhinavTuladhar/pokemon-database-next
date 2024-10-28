import React, { FC } from 'react'

import { TableCell, TableCellHeader, TableContainer, TableRow } from '@/components/containers'
import { ContestEffect } from '@/types'

import { AppealHearts } from './AppealHearts'
import { JamHearts } from './JamHearts'

interface EffectTableProps {
  contestData: Array<ContestEffect>
}

export const EffectTable: FC<EffectTableProps> = ({ contestData }) => {
  const tableHeaders = [
    { id: 'appeal', header: 'Appeal' },
    { id: 'jam', header: 'Jam' },
    { id: 'description', header: 'Description', className: 'min-w-[500px]' },
  ]

  const tableHeaderRow = (
    <TableRow className="bg-neutral-200 font-bold dark:bg-table-header">
      {tableHeaders.map((header, index) => (
        <TableCellHeader
          type="column"
          className={`${header?.className} text-center`}
          key={header.id + index}
        >
          {header.header}
        </TableCellHeader>
      ))}
    </TableRow>
  )

  const tableRows = contestData.map(effect => {
    const { appeal, jam, id, effect_entries } = effect

    const cellData = [
      { key: 'appeal', value: <AppealHearts appeal={appeal} /> },
      { key: 'jam', value: <JamHearts jam={jam} /> },
      { key: 'description', value: effect_entries[0].effect },
    ]

    return (
      <TableRow key={id}>
        {cellData.map((data, index) => (
          <TableCell key={data.key + index} variant="column" extraClassName="max-w-[600px]">
            {data.value}
          </TableCell>
        ))}
      </TableRow>
    )
  })

  return (
    <TableContainer useFullWidth={false}>
      <thead>{tableHeaderRow}</thead>
      <tbody>{tableRows}</tbody>
    </TableContainer>
  )
}
