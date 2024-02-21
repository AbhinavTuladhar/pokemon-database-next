import { FC, ReactNode } from 'react'

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
const TableCellHeader: FC<HeaderProps> = ({ children, type, wrapFlag, className }) => {
  return (
    <th
      className={`table-cell border-t border-gray-200 py-[10px] align-middle text-gray-300 ${type === 'row' ? 'px-2 text-right text-gray-300' : 'w-min px-4 text-left'} ${wrapFlag ? 'w-auto' : 'w-[1%] whitespace-nowrap'} ${className ? className : ''}`}
    >
      {children}
    </th>
  )
}

TableCellHeader.defaultProps = {
  wrapFlag: false,
  type: 'row',
}

export default TableCellHeader
