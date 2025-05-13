import { FC } from 'react'

import {
  SectionTitle,
  TableCell,
  TableCellHeader,
  TableContainer,
  TableRow,
} from '@/components/containers'
import MoveCategoryImage from '@/components/move-category-image'
import { TypeCard } from '@/features/pokemon/components/TypeCard'
import formatName from '@/utils/formatName'

interface MoveDataProps {
  moveType: string
  damageClass: string
  power: string | number
  accuracy: string | number
  PP: number
  generationIntroduced: string
  priority: number
}

export const MoveData: FC<MoveDataProps> = ({
  moveType,
  damageClass,
  power,
  accuracy,
  PP,
  generationIntroduced,
  priority,
}) => {
  const moveTypeCard = <TypeCard typeName={moveType} variant="small" />
  const PPValue = `${PP} (max. ${Math.floor(PP * 1.6)})`
  const priorityValue = Number(priority) > 0 ? `+${priority}` : priority

  let actualPower: string | number
  let actualAccuracy: string | number

  switch (power) {
    case Infinity:
      actualPower = '∞'
      break
    case 0:
      actualPower = '—'
      break
    default:
      actualPower = power
  }

  switch (accuracy) {
    case Infinity:
      actualAccuracy = '∞'
      break
    case 0:
      actualAccuracy = '—'
      break
    default:
      actualAccuracy = accuracy
  }

  const damageClassValue = (
    <div className="flex flex-row gap-x-4">
      <MoveCategoryImage category={damageClass} />
      <span> {formatName(damageClass)} </span>
    </div>
  )

  const tableData = [
    { header: 'Type', children: moveTypeCard },
    { header: 'Category', children: damageClassValue },
    { header: 'Power', children: actualPower },
    { header: 'Accuracy', children: actualAccuracy },
    // Optionally add the "Priority" row if the priority value is not 0
    ...(priority !== 0 ? [{ header: 'Priority', children: priorityValue }] : []),
    { header: 'PP', children: PPValue },
    { header: 'Introduced', children: generationIntroduced },
  ]

  return (
    <>
      <SectionTitle> Move Data </SectionTitle>
      <TableContainer>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <TableRow key={row.header + rowIndex}>
              <TableCellHeader>
                <span className="text-sm font-normal"> {row.header} </span>
              </TableCellHeader>
              <TableCell> {row.children} </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableContainer>
    </>
  )
}
