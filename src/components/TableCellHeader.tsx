import { FC, ReactNode } from 'react'

interface HeaderProps {
  children: ReactNode
}

const TableCellHeader: FC<HeaderProps> = ({ children }) => {
  return (
    <td className="table-cell text-gray-300 w-[1%] px-2 py-[10px] whitespace-nowrap border-t border-gray-200 text-right align-middle">
      {children}
    </td>
  )
}

export default TableCellHeader
