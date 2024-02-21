import { FC, ReactNode } from 'react'

interface HeaderProps {
  children: ReactNode
  type?: 'column' | 'row',
}

const TableCellHeader: FC<HeaderProps> = ({ children, type = 'row' }) => {
  return (
    <td
      className={`table-cell w-[1%] whitespace-nowrap border-t border-gray-200 px-2 py-[10px] align-middle text-gray-300 ${type === 'row' ? 'text-right text-gray-300' : 'text-left'}`}
    >
      {children}
    </td>
  )
}

export default TableCellHeader
