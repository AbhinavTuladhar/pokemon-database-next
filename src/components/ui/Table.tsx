import { FC, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

interface TableProps {
  children: ReactNode
  className?: string
  useFullWidth?: boolean
}

export const Table: FC<TableProps> = ({ children, className, useFullWidth = true }) => {
  const innerTable = (
    <div className={`overflow-x-auto overflow-y-hidden ${className ? className : ''}`}>
      <table className="border-bd-light dark:border-bd-dark table min-w-full border-b">
        {children}
      </table>
    </div>
  )

  if (useFullWidth) {
    return innerTable
  }

  return <div className="flex justify-center">{innerTable}</div>
}

interface RowProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

export const TableRow: React.FC<RowProps> = ({ children, className: extraClassName, ...props }) => {
  return (
    <tr className={`table-row ${extraClassName ? extraClassName : ''}`} {...props}>
      {children}
    </tr>
  )
}

interface HeaderProps extends HTMLAttributes<HTMLTableCellElement> {
  children: ReactNode
  className?: string
  type?: 'column' | 'row'
  wrapFlag?: boolean
}

/**
 * A <th> component which represents the header of a table. It takes three possible props:
 *
 * `className` - More class names to add in the parent of the component.
 *
 * `type` - Whether to use a 'columnar' or 'row-wise' table. Columnar tables are regular tables,
 * whereas row-wise tables are those which have the table header at the left of the row.
 *
 * `wrapFlag` - Whether to wrap the cell contents or not.
 */
export const TableHeader: FC<HeaderProps> = ({
  children,
  className,
  type = 'row',
  wrapFlag = false,
  ...props
}) => {
  return (
    <th
      {...props}
      className={classNames(
        'dark:border-bd-dark table-cell border-t border-gray-300 py-2 align-middle',
        { 'px-2 text-right text-sm font-normal text-gray-500 dark:text-gray-200': type === 'row' },
        { 'w-min px-4 text-left': type === 'column' },
        { 'w-auto whitespace-break-spaces': wrapFlag },
        { 'w-[1%] whitespace-nowrap': !wrapFlag },
        `${className ? className : ''}`,
      )}
    >
      {children}
    </th>
  )
}

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
