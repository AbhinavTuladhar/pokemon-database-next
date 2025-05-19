import React, { FC } from 'react'

import { EncounterMethod } from '@/types'
import { formatName } from '@/utils/string.utils'

import { EncounterTable } from './EncounterTable'
import { SubLocationGroup } from './types'

interface DivProps {
  generation: string
  subLocationData: SubLocationGroup
  methodData: Array<EncounterMethod>
}

export const SubLocationDiv: FC<DivProps> = ({ generation, subLocationData, methodData }) => {
  const { subLocationName, methods } = subLocationData
  return (
    <section className="mt-4 first:mt-0">
      <h2 className="mb-4 text-3xl font-bold">{`${generation} - ${formatName(subLocationName)}`}</h2>
      {methods.map((methodGroup, index) => (
        <EncounterTable key={index} methods={methodGroup} methodData={methodData} />
      ))}
    </section>
  )
}
