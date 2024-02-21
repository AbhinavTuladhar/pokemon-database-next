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
      className={`table-cell border-t border-gray-200 py-[10px] align-middle text-gray-300 ${type === 'row' ? 'px-2 text-right text-gray-300' : 'w-min px-4 text-left'} ${wrapFlag ? 'w-auto' : 'w-[1%] whitespace-nowrap'} ${className ? className : ''}`}
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
