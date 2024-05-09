import React, { FC } from 'react'

import { TableContainer } from '../containers'

import DescriptionRow from './DescriptionRow'
import { DescriptionProps } from './types'

const GameWiseDescriptions: FC<DescriptionProps> = ({ descriptionData }) => {
  return (
    <TableContainer>
      {descriptionData.map(({ description, generation, versionGroupNames }) => {
        return (
          <DescriptionRow
            key={description}
            description={description}
            generation={generation}
            versionGroupNames={versionGroupNames}
          />
        )
      })}
    </TableContainer>
  )
}

export default GameWiseDescriptions
