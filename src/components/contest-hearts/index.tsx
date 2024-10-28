import React, { FC } from 'react'
import classNames from 'classnames'
import { TbHeart, TbHeartFilled } from 'react-icons/tb'

interface ContestHearts {
  type: 'appeal' | 'jam'
  value: number
}

/**
 * Renders the hearts for a contest move. For both appealing and jamming moves.
 */
const ContestHearts: FC<ContestHearts> = ({ type = 'appeal', value }) => {
  const maxValue = type === 'appeal' ? 8 : 4
  const filledHearts = Array(value).fill(0)
  const emptyHearts = Array(maxValue - value).fill(0)

  return (
    <div
      className={classNames('grid grid-rows-2', {
        'grid-cols-4': type === 'appeal',
        'grid-cols-2': type === 'jam',
      })}
    >
      {filledHearts.map((_, index) => (
        <TbHeartFilled
          key={'filled' + index}
          className={classNames('size-3', {
            'text-red-500': type === 'appeal',
            'text-black': type === 'jam',
          })}
        />
      ))}
      {emptyHearts.map((_, index) => (
        <TbHeart key={'empty' + index} className="size-3 text-gray-400" />
      ))}
    </div>
  )
}

export default ContestHearts
