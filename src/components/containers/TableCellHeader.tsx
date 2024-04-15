import { FC, ReactNode } from 'react'
import classNames from 'classnames'

interface HeaderProps {
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
const TableCellHeader: FC<HeaderProps> = ({
  children,
  className,
  type = 'row',
  wrapFlag = false,
}) => {
  return (
    <th
      className={classNames(
        'border-table-border table-cell border-t py-[10px] align-middle',
        { 'px-2 text-right text-sm font-normal text-gray-200': type === 'row' },
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

export default TableCellHeader
