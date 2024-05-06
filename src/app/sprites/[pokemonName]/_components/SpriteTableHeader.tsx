import React, { FC } from 'react'

import { TableHeaderWrapper } from './TableWrappers'

interface HeaderProps {
  columns: Array<string>
  extraColumns: Array<string>
  femaleFlag: boolean
}

export const SpriteTableHeader: FC<HeaderProps> = ({ columns, extraColumns, femaleFlag }) => {
  const tableColumns = femaleFlag ? ['', ...columns, ...extraColumns] : ['', ...columns]
  return (
    <tr className="table-row">
      {tableColumns.map((column, index) => (
        <TableHeaderWrapper key={index}>{column}</TableHeaderWrapper>
      ))}
    </tr>
  )
}
