import { FC, ReactNode } from 'react'

interface HeaderProps {
  children: ReactNode
  className?: string
  type?: 'column' | 'row'
  wrapFlag?: boolean
}

const TableCellHeader: FC<HeaderProps> = ({ children, type, wrapFlag, className }) => {
  return (
    <td
      className={`table-cell border-t border-gray-200 px-2 py-[10px] align-middle text-gray-300 ${type === 'row' ? 'text-right text-gray-300' : 'text-left'} ${wrapFlag ? 'w-auto' : 'w-[1%] whitespace-nowrap'} ${className}`}
    >
      {children}
    </td>
  )
}

TableCellHeader.defaultProps = {
  wrapFlag: false,
  type: 'row',
}

export default TableCellHeader
