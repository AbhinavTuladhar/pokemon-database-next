import React, { FC } from 'react'

import { Table } from '@/components/ui/Table'

import DescriptionRow from './DescriptionRow'
import { DescriptionProps } from './types'

const GameWiseDescriptions: FC<DescriptionProps> = ({ descriptionData }) => {
  return (
    <Table>
      <tbody>
        {descriptionData.map(({ description, versionGroupNames }) => {
          return (
            <DescriptionRow
              key={description}
              description={description}
              versionGroupNames={versionGroupNames}
            />
          )
        })}
      </tbody>
    </Table>
  )
}

export default GameWiseDescriptions
