import React, { FC } from 'react'

import { contestColourMapping } from '@/features/battle/data/contest.data'
import { formatName } from '@/utils/string.utils'

interface ContestCardProps {
  type: string
}

export const ContestTypeCard: FC<ContestCardProps> = ({ type }) => {
  const cardColour = `bg-${contestColourMapping[type]}`

  return (
    <div
      className={`${cardColour} text-shadow flex h-[27px] w-16 flex-col items-center justify-center rounded-sm text-xs text-white uppercase shadow-black/70`}
    >
      {formatName(type)}
    </div>
  )
}
