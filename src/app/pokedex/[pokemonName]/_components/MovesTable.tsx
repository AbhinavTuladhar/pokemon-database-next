import { FC } from 'react'

import { TypeCard } from '@/components/cards'
import { TableCell, TableCellHeader, TableContainer, TableRow } from '@/components/containers'
import BlueLink from '@/components/link'
import MoveCategoryImage from '@/components/move-category-image'
import { TransformedMove } from '@/types'
import formatName from '@/utils/formatName'

interface TransformedMoveLevel extends TransformedMove {
  levelLearnedAt?: number
}

interface MovesTableProps {
  movesData: Array<TransformedMoveLevel>
  levelFlag?: boolean
}

export const MovesTable: FC<MovesTableProps> = ({ movesData, levelFlag }) => {
  const firstRow = ['Lv.', 'Name', 'Type', 'Class', 'PP', 'Power', 'Acc.']

  const firstRowLabels = levelFlag === true ? firstRow : firstRow.slice(1)

  return (
    <TableContainer>
      <thead>
        <TableRow className="bg-table-header font-bold">
          {firstRowLabels.map((label, index) => (
            <TableCellHeader
              key={index}
              type="column"
              className="border-r border-table-border pr-4 last:border-r-0"
            >
              {label}
            </TableCellHeader>
          ))}
        </TableRow>
      </thead>
      <tbody>
        {movesData.map((move, rowIndex) => {
          const { moveName, levelLearnedAt = '', moveType, damageClass, PP, power, accuracy } = move
          return (
            <TableRow className="duration-300 hover:bg-[#2c303b]" key={rowIndex}>
              {levelLearnedAt && (
                <TableCell variant="column" extraClassName="text-right">
                  {levelLearnedAt}
                </TableCell>
              )}
              <TableCell variant="column" extraClassName="whitespace-nowrap pr-4">
                <BlueLink href={`/move/${moveName}`} boldFlag={true}>
                  {formatName(moveName)}
                </BlueLink>
              </TableCell>
              <TableCell variant="column">
                <TypeCard typeName={moveType} />
              </TableCell>
              <TableCell variant="column">
                <MoveCategoryImage category={damageClass} />
              </TableCell>
              <TableCell variant="column">{PP}</TableCell>
              <TableCell variant="column">{power}</TableCell>
              <TableCell variant="column">{accuracy}</TableCell>
            </TableRow>
          )
        })}
      </tbody>
    </TableContainer>
  )
}
