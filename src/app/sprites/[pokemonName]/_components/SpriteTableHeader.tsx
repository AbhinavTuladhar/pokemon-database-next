import React, { FC } from 'react'

interface HeaderProps {
  columns: Array<string>
  extraColumns: Array<string>
  femaleFlag: boolean
}

export const SpriteTableHeader: FC<HeaderProps> = ({ columns, extraColumns, femaleFlag }) => {
  const tableColumns = femaleFlag ? ['', ...columns, ...extraColumns] : ['', ...columns]
  return (
    <tr>
      {tableColumns.map((column, index) => (
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
