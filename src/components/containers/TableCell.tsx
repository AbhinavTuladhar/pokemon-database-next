import { FC, ReactNode } from 'react'

interface CellProps {
  children: ReactNode
  extraClassName?: string
}

const TableCell: FC<CellProps> = ({ children, extraClassName }) => {
  return (
    <td
      className={`table-cell border-t border-gray-200 px-2 py-[10px] align-middle ${extraClassName}`}
    >
      {children}
    </td>
  )
}

export default TableCell
