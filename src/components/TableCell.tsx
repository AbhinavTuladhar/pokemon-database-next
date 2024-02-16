import { FC, ReactNode } from 'react'

interface CellProps {
  children: ReactNode
}

const TableCell: FC<CellProps> = ({ children }) => {
  return <td className="table-cell border-t border-gray-200 py-2 pl-4 align-middle">{children}</td>
}

export default TableCell
