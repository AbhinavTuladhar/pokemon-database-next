import React, { FC } from 'react'

import { TableCell, TableHeader, TableRow } from '@/components/ui/Table'

import { RowProps } from './types'
import VersionNameList from './VersionNameList'

const DescriptionRow: FC<RowProps> = ({ description, versionGroupNames }) => {
  return (
    <TableRow>
      <TableHeader wrapFlag className="w-28 md:w-40">
        <VersionNameList versionNames={versionGroupNames} />
      </TableHeader>
      <TableCell>{description}</TableCell>
    </TableRow>
  )
}

export default DescriptionRow
