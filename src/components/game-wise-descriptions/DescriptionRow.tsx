import React, { FC } from 'react'

import { TableCell, TableCellHeader, TableRow } from '../containers'

import { RowProps } from './types'
import VersionNameList from './VersionNameList'

const DescriptionRow: FC<RowProps> = ({ description, versionGroupNames }) => {
  return (
    <TableRow>
      <TableCellHeader wrapFlag className="w-28 md:w-40">
        <VersionNameList versionNames={versionGroupNames} />
      </TableCellHeader>
      <TableCell>{description}</TableCell>
    </TableRow>
  )
}

export default DescriptionRow
