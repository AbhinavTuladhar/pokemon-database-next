import { FC } from 'react'
import movePhysical from '../../images/move-physical.png'
import moveSpecial from '../../images/move-special.png'
import moveStatus from '../../images/move-status.png'

import TypeCard from '@/components/TypeCard'
import TableContainer from '@/components/containers/TableContainer'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import SectionTitle from '@/components/containers/SectionTitle'
import formatName from '@/utils/formatName'
import TableRow from '@/components/containers/TableRow'

// For damage class image.
// const returnMoveImage = (damageClass) => {
//   if (damageClass === 'physical') return movePhysical
//   else if (damageClass === 'special') return moveSpecial
//   else if (damageClass === 'status') return moveStatus
//   else return ''
// }

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
  // const rowData = [
  //   { header: 'Type', value: <TypeCard typeName={moveType} /> },
  //   {
  //     header: 'Category',
  //     value: (
  //       <div className="flex flex-row items-center gap-x-4">
  //         <img src={returnMoveImage(damageClass)} className="h-[20px] w-[30px]" alt={damageClass} />
  //         <> {formatName(damageClass)} </>
  //       </div>
  //     ),
  //   },
  //   { header: 'Power', value: power },
  //   { header: 'Accuracy', value: accuracy },
  //   { header: 'Priority', value: priority },
  //   { header: 'PP', value: <> {`${PP} (max. ${Math.floor(PP * 1.6)})`} </> },
  //   { header: 'Introduced', value: generationIntroduced },
  // ]

  // const tableRows = rowData.map((row, rowIndex) => {
  //   // Skip the priority row if the priority is zero.
  //   if (row.header === 'Priority' && row.value === 0) {
  //     return null
  //   }
  //   // Add a positive sign to priority if positive.
  //   const rowValue =
  //     row.header === 'Priority' && parseInt(row.value) > 0 ? `+${row.value}` : row.value
  //   return (
  //     <div className="table-row h-12" key={rowIndex}>
  //       <div
  //         key={row.header}
  //         className="table-cell border-t border-slate-200 py-2 pr-8 text-right align-middle"
  //       >
  //         {row.header}
  //       </div>
  //       <div key={row.value} className="table-cell border-t border-slate-200 py-2 align-middle">
  //         {rowValue}
  //       </div>
  //     </div>
  //   )
  // })

  const moveTypeCard = <TypeCard typeName={moveType} variant="small" />

  const PPValue = `${PP} (max. ${Math.floor(PP * 1.6)})`

  const priorityValue = Number(priority) > 0 ? `+${priority}` : priority

  const tableData = [
    { header: 'Type', children: moveTypeCard },
    { header: 'Category', children: damageClass },
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
        {tableData.map((row, rowIndex) => (
          <TableRow key={rowIndex}>
            <TableCellHeader>
              <span className="text-sm font-normal text-white"> {row.header} </span>
            </TableCellHeader>
            <TableCell> {row.children} </TableCell>
          </TableRow>
        ))}
      </TableContainer>
    </>
  )
}

export default MoveData
