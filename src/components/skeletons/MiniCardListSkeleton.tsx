import { FC } from 'react'

import { MiniPokeCardSkeleton } from './MiniPokeCardSkeleton'

interface MiniCardListSkeletonProps {
  pokemonCount: number
}

export const MiniCardListSkeleton: FC<MiniCardListSkeletonProps> = ({ pokemonCount }) => {
  return (
    <div className="grid grid-cols-card-list gap-x-3 gap-y-8">
      {Array(pokemonCount)
        .fill(0)
        .map(value => (
          <MiniPokeCardSkeleton key={value} />
        ))}
    </div>
  )
}
