import { FC, ReactNode } from 'react'

interface CellProps {
  children: ReactNode
}

const TableCell: FC<CellProps> = ({ children }) => {
  return (
    <td className="table-cell border-t border-gray-200 px-2 py-[10px] align-middle">{children}</td>
  )
}

export default TableCell
