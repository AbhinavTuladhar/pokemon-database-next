import { FC, ReactNode } from 'react'
import classNames from 'classNames'

interface CellProps {
  children: ReactNode
  variant?: 'row' | 'column'
  extraClassName?: string
}

/**
 * A <td> component which represents the cell of a table. It takes three possible props:
 *
 * `extraClassName` - More class names to add in the parent of the component.
 *
 * `variant` - Whether to use a 'columnar' or 'row-wise' table. Columnar tables are regular tables,
 *  whereas row-wise tables are those which have the table header at the left of the row.
 */
const TableCell: FC<CellProps> = ({ children, extraClassName, variant }) => {
  return (
    <td
      className={classNames(
        'table-cell border-t border-gray-200 py-[10px] align-middle',
        { 'px-2': variant === 'row' },
        { 'px-4': variant === 'column' },
        `${extraClassName ? extraClassName : ''}`,
      )}
    >
      {children}
    </td>
  )
}

TableCell.defaultProps = {
  variant: 'row',
}

export default TableCell
