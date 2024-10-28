import React, { FC } from 'react'
import { TbHeart, TbHeartFilled } from 'react-icons/tb'

interface JamHeartsProps {
  jam: number
}

export const JamHearts: FC<JamHeartsProps> = ({ jam }) => {
  // A contest move can have max 4 jam points
  const filledHearts = Array(jam).fill(0)
  const emptyHearts = Array(4 - jam).fill(0)

  return (
    <div className="grid grid-cols-2 grid-rows-2">
      {filledHearts.map((_, index) => (
        <TbHeartFilled key={'filled' + index} className="size-3 text-black" />
      ))}
      {emptyHearts.map((_, index) => (
        <TbHeart key={'empty' + index} className="size-3 text-gray-400" />
      ))}
    </div>
  )
}
