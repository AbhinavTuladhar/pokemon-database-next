import { FC } from 'react'
import { TransformedMove } from '@/types'
import TableContainer from '@/components/containers/TableContainer'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableRow from '@/components/TableRow'
import formatName from '@/utils/formatName'
import BlueLink from '@/components/BlueLink'
import TypeCard from '@/components/TypeCard'

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
          <TableCellHeader key={index}> {label}</TableCellHeader>
        ))}
      </TableRow>
      {movesData.map((move, rowIndex) => {
        return (
          <TableRow key={rowIndex} className="odd:bg-gray-900">
            {move.levelLearnedAt && <TableCell>{move.levelLearnedAt}</TableCell>}
            <TableCell extraClassName="whitespace-nowrap pr-4">
              <BlueLink href={`/move/${move.moveName}`} boldFlag={true}>
                {formatName(move.moveName)}
              </BlueLink>
            </TableCell>
            <TableCell>
              <TypeCard typeName={move.moveType} />
            </TableCell>
            <TableCell>{move.damageClass}</TableCell>
            <TableCell>{move.PP}</TableCell>
            <TableCell>{move.power}</TableCell>
            <TableCell>{move.accuracy}</TableCell>
          </TableRow>
        )
      })}
    </TableContainer>
  )
}

export default MovesTable
