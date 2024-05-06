import React, { FC, ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
}

export const TableHeaderWrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <th className="table-cell h-16 border border-table-border bg-table-header py-2 pr-4 text-center font-bold">
      {children}
    </th>
  )
}

export const TableCellWrapper: FC<WrapperProps> = ({ children }) => {
  return <td className="table-cell h-40 border border-table-border py-6 text-center">{children}</td>
}
