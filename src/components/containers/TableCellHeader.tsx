import { FC, ReactNode } from 'react'

interface HeaderProps {
  children: ReactNode
}

const TableCellHeader: FC<HeaderProps> = ({ children }) => {
  return (
    <td className="table-cell w-[1%] whitespace-nowrap border-t border-gray-200 px-2 py-[10px] text-right align-middle text-gray-300">
      {children}
    </td>
  )
}

export default TableCellHeader
