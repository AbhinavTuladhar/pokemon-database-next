import React from 'react'

interface RowProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode
}

const TableRow: React.FC<RowProps> = ({ children, ...props }) => {
  return (
    <tr className="table-row h-12 py-2" {...props}>
      {children}
    </tr>
  )
}

export default TableRow
