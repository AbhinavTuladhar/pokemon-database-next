import React, { FC } from 'react'

import { EncounterMethod, GroupedLocationArea } from '@/types'
import formatName from '@/utils/formatName'

import { EncounterTable } from './EncounterTable'

interface MethodGroup {
  method: string
  encounterDetails: Array<GroupedLocationArea>
}

interface SubLocationGroup {
  subLocationName: string
  methods: Array<MethodGroup>
}

interface DivProps {
  generation: string
  subLocationData: SubLocationGroup
  methodData: Array<EncounterMethod>
}

export const SubLocationDiv: FC<DivProps> = ({ generation, subLocationData, methodData }) => {
  const { subLocationName, methods } = subLocationData
  return (
    <section>
      <h2 className="mb-4 text-3xl font-bold">{`${generation} - ${formatName(subLocationName)}`}</h2>
      {methods.map((methodGroup, index) => (
        <EncounterTable key={index} methods={methodGroup} methodData={methodData} />
      ))}
    </section>
  )
}
