import React, { FC } from 'react'

import { TableCellHeader, TableRow } from '../containers'

import { RowProps } from './types'

const DescriptionRow: FC<RowProps> = ({ description, generation, versionGroupNames }) => {
  return (
    <TableRow>
      <TableCellHeader> Test </TableCellHeader>
    </TableRow>
  )
}

export default DescriptionRow
