import React, { FC } from 'react'

import { InnerPokemonSet } from '@/types'

import SetRow from './SetRow'

interface MoveListProps {
  moves: InnerPokemonSet['moves']
}

export const MoveList: FC<MoveListProps> = ({ moves }) => {
  return (
    <table>
      {moves.map((move, index) => (
        <SetRow key={index} header={`Move ${index + 1}`} value={move} />
      ))}
    </table>
  )
}
