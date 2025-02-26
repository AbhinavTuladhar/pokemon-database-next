import { FC, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

interface CellProps extends HTMLAttributes<HTMLTableCellElement> {
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
export const TableCell: FC<CellProps> = ({
  children,
  extraClassName,
  variant = 'row',
  ...props
}) => {
  return (
    <td
      {...props}
      className={classNames(
        'dark:border-bd-dark table-cell border-t border-gray-300 py-2 align-middle',
        { 'px-2': variant === 'row' },
        { 'px-4': variant === 'column' },
        `${extraClassName ? extraClassName : ''}`,
      )}
    >
      {children}
    </td>
  )
}
