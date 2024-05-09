import React, { FC } from 'react'

import { TableContainer } from '../containers'

import DescriptionRow from './DescriptionRow'

interface RowProps {
  description: string
  generation: string
  versionGroupNames: Array<string>
}

interface DescriptionProps {
  descriptionData: Array<RowProps>
}

const GameWiseDescription: FC<DescriptionProps> = ({ descriptionData }) => {
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

export default GameWiseDescription
