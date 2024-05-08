import React, { FC } from 'react'

import { EncounterMethod } from '@/types'

import { SubLocationDiv } from './SubLocationDiv'
import { LocationGroup } from './types'

interface GenerationSectionProps {
  locationData: LocationGroup
  methodData: Array<EncounterMethod>
}

export const GenerationEncounters: FC<GenerationSectionProps> = async ({
  locationData,
  methodData,
}) => {
  const { generation, subLocations } = locationData

  return (
    <section>
      {subLocations.map((subLocation, index) => {
        return (
          <SubLocationDiv
            generation={generation}
            subLocationData={subLocation}
            methodData={methodData}
            key={index}
          />
        )
      })}
    </section>
  )
}
