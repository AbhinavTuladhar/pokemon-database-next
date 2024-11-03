import React, { FC, ReactNode } from 'react'

interface WrapperProps {
  children: ReactNode
}

export const TableHeaderWrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <th className="table-cell h-16 min-w-40 border border-bd-light bg-neutral-200 px-4 py-2 text-center font-bold dark:border-bd-dark dark:bg-hdr-dark">
      {children}
    </th>
  )
}

export const TableCellWrapper: FC<WrapperProps> = ({ children }) => {
  return (
    <td className="table-cell h-40 w-40 border border-bd-light p-6 text-center dark:border-bd-dark">
      {children}
    </td>
  )
}
