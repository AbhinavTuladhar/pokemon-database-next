import { FC } from 'react'
import MiniPokeCardSkeleton from './MiniPokeCardSkeleton'
import SectionTitle from '../SectionTitle'

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
