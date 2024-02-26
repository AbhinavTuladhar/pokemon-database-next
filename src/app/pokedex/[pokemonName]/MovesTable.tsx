import { FC } from 'react'
import Image from 'next/image'
import { TransformedMove } from '@/types'
import TableContainer from '@/components/containers/TableContainer'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableRow from '@/components/containers/TableRow'
import formatName from '@/utils/formatName'
import BlueLink from '@/components/BlueLink'
import TypeCard from '@/components/TypeCard'
import MoveCategoryImage from '@/components/MoveCategoryImage'

interface TransformedMoveLevel extends TransformedMove {
  levelLearnedAt?: number
}

interface MovesTableProps {
  movesData: Array<TransformedMoveLevel>
  levelFlag?: boolean
}

const MovesTable: FC<MovesTableProps> = ({ movesData, levelFlag }) => {
  const firstRow = ['Lv.', 'Name', 'Type', 'Class', 'PP', 'Power', 'Acc.']

  const firstRowLabels = levelFlag === true ? firstRow : firstRow.slice(1)

  return (
    <TableContainer>
      <TableRow className="bg-[#1a1a1a] font-bold">
        {firstRowLabels.map((label, index) => (
          <TableCellHeader key={index} type="column">
            {label}
          </TableCellHeader>
        ))}
      </TableRow>
      {movesData.map((move, rowIndex) => {
        const { moveName, levelLearnedAt = '', moveType, damageClass, PP, power, accuracy } = move

        return (
          <TableRow key={rowIndex} className="odd:bg-gray-900">
            {levelLearnedAt && <TableCell>{levelLearnedAt}</TableCell>}
            <TableCell extraClassName="whitespace-nowrap pr-4">
              <BlueLink href={`/move/${moveName}`} boldFlag={true}>
                {formatName(moveName)}
              </BlueLink>
            </TableCell>
            <TableCell>
              <TypeCard typeName={moveType} />
            </TableCell>
            <TableCell>
              <MoveCategoryImage category={damageClass} />
            </TableCell>
            <TableCell>{PP}</TableCell>
            <TableCell>{power}</TableCell>
            <TableCell>{accuracy}</TableCell>
          </TableRow>
        )
      })}
    </TableContainer>
  )
}

export default MovesTable
