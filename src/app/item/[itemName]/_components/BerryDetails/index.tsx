import React, { FC } from 'react'

import { BerryExtractor } from '@/extractors'
import { BerryApi } from '@/services'

import BerryData from './BerryData'
import FlavourChart from './FlavourChart'

interface BerryDetailsProps {
  itemName: string
}

const getBerryData = async (name: string) => {
  const response = await BerryApi.getByName(name)
  return BerryExtractor(response)
}

export const BerryDetails: FC<BerryDetailsProps> = async ({ itemName }) => {
  // Splitting because the berry api omits the string 'berry' in the argument.
  // itemName includes the string 'berry'.
  const berryName = itemName.split('-')[0]
  const berryData = await getBerryData(berryName)

  const { firmness, flavours, growthTime, maxHarvest, size, smoothness, soilDryness } = berryData

  return (
    <div className="grid grid-cols-1 gap-x-10 gap-y-6 md-lg:grid-cols-[1fr,_2fr]">
      <BerryData
        firmness={firmness}
        growthTime={growthTime}
        maxHarvest={maxHarvest}
        size={size}
        smoothness={smoothness}
        soilDryness={soilDryness}
      />
      <FlavourChart flavourData={flavours} />
    </div>
  )
}
