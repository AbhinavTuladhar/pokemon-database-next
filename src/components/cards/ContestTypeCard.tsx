import React, { FC } from 'react'

import contestTypeMapping from '@/utils/contestTypeMapping'
import formatName from '@/utils/formatName'

interface ContestCardProps {
  type: string
}

export const ContestTypeCard: FC<ContestCardProps> = ({ type }) => {
  const cardColour = `bg-${contestTypeMapping[type]}`

  return (
    <div
      className={`${cardColour} flex h-[27px] w-16 flex-col items-center justify-center rounded text-xs uppercase text-white shadow-black/70 text-shadow`}
    >
      {formatName(type)}
    </div>
  )
}
