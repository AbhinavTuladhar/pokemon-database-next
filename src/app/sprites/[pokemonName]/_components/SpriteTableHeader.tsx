import React, { FC } from 'react'

interface HeaderProps {
  columns: Array<string>
}

export const SpriteTableHeader: FC<HeaderProps> = ({ columns }) => {
  return (
    <tr>
      {['', ...columns].map((column, index) => (
        <th
          key={index}
          className="table-cell border border-table-border bg-table-header py-2 pr-4 text-center font-bold"
        >
          {column}
        </th>
      ))}
    </tr>
  )
}
