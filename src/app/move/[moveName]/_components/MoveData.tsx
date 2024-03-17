import { FC } from 'react'
import Image from 'next/image'

import SectionTitle from '@/components/containers/SectionTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableContainer from '@/components/containers/TableContainer'
import TableRow from '@/components/containers/TableRow'
import MoveCategoryImage from '@/components/MoveCategoryImage'
import TypeCard from '@/components/TypeCard'
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

const MoveData: FC<MoveDataProps> = ({
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

  const damageClassValue = (
    <div className="flex flex-row gap-x-4">
      <MoveCategoryImage category={damageClass} />
      <span> {formatName(damageClass)} </span>
    </div>
  )

  const tableData = [
    { header: 'Type', children: moveTypeCard },
    { header: 'Category', children: damageClassValue },
    { header: 'Power', children: power },
    { header: 'Accuracy', children: accuracy },
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
            <TableRow key={rowIndex}>
              <TableCellHeader>
                <span className="text-sm font-normal text-white"> {row.header} </span>
              </TableCellHeader>
              <TableCell> {row.children} </TableCell>
            </TableRow>
          ))}
        </tbody>
      </TableContainer>
    </>
  )
}

export default MoveData
