import React, { FC } from 'react'

import { TableContainer } from '../containers'

import DescriptionRow from './DescriptionRow'
import { DescriptionProps } from './types'

const GameWiseDescriptions: FC<DescriptionProps> = ({ descriptionData }) => {
  return (
    <TableContainer>
      {descriptionData.map(({ description, versionGroupNames }) => {
        return (
          <DescriptionRow
            key={description}
            description={description}
            versionGroupNames={versionGroupNames}
          />
        )
      })}
    </TableContainer>
  )
}

export default GameWiseDescriptions
