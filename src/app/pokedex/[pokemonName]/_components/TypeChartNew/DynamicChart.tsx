'use client'

import React, { FC } from 'react'

import TypeRow from './TypeRow'

interface ChartProps {
  typeDefenceInfo: Array<{
    type: string
    multiplier: number
  }>
  defendingType: string
  abilityNames: Array<string>
}

const DynamicChart: FC<ChartProps> = ({ typeDefenceInfo, defendingType, abilityNames }) => {
  return (
    <div className="flex flex-col justify-center gap-x-px overflow-x-auto min-[720px]:flex-row md:flex-row mdlg:flex-col">
      <TypeRow
        typeDefenceInfo={typeDefenceInfo.slice(0, 9)}
        extraClassName="mt-6"
        defendingType={defendingType}
      />
      <TypeRow
        typeDefenceInfo={typeDefenceInfo.slice(9)}
        extraClassName="mt-2 md:mt-6 sm:mt-6"
        defendingType={defendingType}
      />
    </div>
  )
}

export default DynamicChart
