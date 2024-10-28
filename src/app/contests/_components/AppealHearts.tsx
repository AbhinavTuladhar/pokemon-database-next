import React, { FC } from 'react'
import { TbHeart, TbHeartFilled } from 'react-icons/tb'

interface AppealHeartsProps {
  appeal: number
}

export const AppealHearts: FC<AppealHeartsProps> = ({ appeal }) => {
  // A contest move can have max 8 appeal points
  const filledHearts = Array(appeal).fill(0)
  const emptyHearts = Array(8 - appeal).fill(0)

  return (
    <div className="grid grid-cols-4 grid-rows-2">
      {filledHearts.map((_, index) => (
        <TbHeartFilled key={'filled' + index} className="size-3 text-red-500" />
      ))}
      {emptyHearts.map((_, index) => (
        <TbHeart key={'empty' + index} className="size-3 text-gray-400" />
      ))}
    </div>
  )
}
