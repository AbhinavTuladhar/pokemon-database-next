import { FC } from 'react'

import SectionTitle from '../containers/SectionTitle'

import MiniPokeCardSkeleton from './MiniPokeCardSkeleton'

interface MiniCardListSkeletonProps {
  pokemonCount: number
}

const MiniCardListSkeleton: FC<MiniCardListSkeletonProps> = ({ pokemonCount }) => {
  return (
    <>
      <SectionTitle>Loading Pokemon information...</SectionTitle>
      <div className="grid grid-cols-card-list gap-x-3 gap-y-8">
        {Array(pokemonCount)
          .fill(0)
          .map((_, index) => (
            <MiniPokeCardSkeleton key={index} />
          ))}
      </div>
    </>
  )
}

export default MiniCardListSkeleton
