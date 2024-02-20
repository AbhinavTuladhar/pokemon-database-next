import React from 'react'

interface RowProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const TableRow: React.FC<RowProps> = ({ children, className: extraClassName, ...props }) => {
  return (
    <tr className={`table-row h-12 py-2 ${extraClassName}`} {...props}>
      {children}
    </tr>
  )
}

export default TableRow
