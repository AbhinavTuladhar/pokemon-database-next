import { FC, ReactNode } from 'react'

interface CellProps {
  children: ReactNode
  variant?: 'row' | 'column'
  extraClassName?: string
}

const TableCell: FC<CellProps> = ({ children, extraClassName, variant }) => {
  return (
    <td
      className={`table-cell border-t border-gray-200 py-[10px] align-middle ${variant === 'row' ? 'px-2' : 'px-4'} ${extraClassName ? extraClassName : ''}`}
    >
      {children}
    </td>
  )
}

TableCell.defaultProps = {
  variant: 'row',
}

export default TableCell
