import React, { FC, Fragment } from 'react'

import formatName from '@/utils/formatName'

import { TableCell, TableCellHeader, TableContainer, TableRow } from '../containers'

interface EffectProps {
  entry: string
}

interface TableProps {
  headers: string[]
  rows: string[][]
}

const TableComponent: FC<TableProps> = ({ headers, rows }) => (
  <TableContainer useFullWidth={false}>
    <thead>
      <TableRow className="dark:bg-hdr-dark bg-neutral-200 font-bold duration-75">
        {headers.map(header => (
          <TableCellHeader
            className="border-r-bd-light dark:border-r-bd-dark border-r last:border-r-0"
            type="column"
            key={header}
          >
            {header}
          </TableCellHeader>
        ))}
      </TableRow>
    </thead>
    <tbody>
      {rows.map((row, rowIndex) => (
        <TableRow key={rowIndex}>
          {row.map(cell => (
            <TableCell variant="column" key={cell}>
              {formatName(cell)}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </tbody>
  </TableContainer>
)

export const EffectTable: FC<EffectProps> = ({ entry }) => {
  const splitValues = entry.split('\n\n')

  // Find the 'table' part of the string and store the index in the split
  // The index is to preserve the order in which the paragraphs+table combination is displayed
  const tablePart = splitValues.find(value => value.includes('--:')) as string
  const tableIndex = splitValues.indexOf(tablePart)
  const otherParagraphs = splitValues.filter(value => !value.includes('--:'))

  // Get the rows of the table
  const tableRows = tablePart.split('\n')

  // Underscore because of a separator
  const [headerString, _, ...rowString] = tableRows
  const rows = rowString
    .map(row => {
      const cells = row.split('|')
      return cells.map(cell => cell.trim())
    })
    .filter(row => row.length > 1)
  const headers = headerString.split('|')

  return (
    <div className="space-y-4">
      {splitValues.map((paragraph, index) => (
        <Fragment key={paragraph + index}>
          {/* Preserve the order in which the tabular part appears in the string */}
          {index === tableIndex ? (
            <TableComponent headers={headers} rows={rows} />
          ) : (
            <p>
              {paragraph.charAt(0).toUpperCase() + paragraph.slice(1)}
              {index !== otherParagraphs.length && <br />}
            </p>
          )}
        </Fragment>
      ))}
    </div>
  )
}
