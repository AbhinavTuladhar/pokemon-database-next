import { FC, HTMLAttributes, ReactNode } from 'react'
import classNames from 'classnames'

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
export const TableCellHeader: FC<HeaderProps> = ({
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
