import { FC, ReactNode } from 'react'

interface HeaderProps {
  children: ReactNode
}

const TableCellHeader: FC<HeaderProps> = ({ children }) => {
  return (
    <td className="table-cell w-[1%] pl-2 whitespace-nowrap border-t border-gray-200 py-2 text-right align-middle">
      {children}
    </td>
  )
}

export default TableCellHeader
