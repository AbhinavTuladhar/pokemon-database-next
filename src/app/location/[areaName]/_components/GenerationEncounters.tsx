import React, { FC } from 'react'

import { EncounterMethod, GroupedLocationArea } from '@/types'

import { SubLocationDiv } from './SubLocationDiv'

interface MethodGroup {
  method: string
  encounterDetails: Array<GroupedLocationArea>
}

interface SubLocationGroup {
  subLocationName: string
  methods: Array<MethodGroup>
}

interface LocationGroup {
  generation: string
  subLocations: Array<SubLocationGroup>
}

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
    <section className="mt-4 first:mt-0">
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
