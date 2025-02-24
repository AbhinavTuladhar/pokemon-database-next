import React, { FC, ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
}

export const TableHeaderWrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <th className="border-bd-light dark:border-bd-dark dark:bg-hdr-dark table-cell h-16 min-w-40 border bg-neutral-200 px-4 py-2 text-center font-bold">
      {children}
    </th>
  )
}

export const TableCellWrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <td className="border-bd-light dark:border-bd-dark table-cell h-40 w-40 border p-6 text-center">
      {children}
    </td>
  )
}
