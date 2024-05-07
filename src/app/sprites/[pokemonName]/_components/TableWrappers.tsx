import React, { FC, ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
}

export const TableHeaderWrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <th className="table-cell h-16 border border-gray-300 bg-neutral-200 py-2 pr-4 text-center font-bold dark:border-table-border dark:bg-table-header">
      {children}
    </th>
  )
}

export const TableCellWrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <td className="table-cell h-40 border border-gray-300 py-6 text-center dark:border-table-border">
      {children}
    </td>
  )
}
