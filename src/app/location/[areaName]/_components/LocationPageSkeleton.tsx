import React from 'react'
import Skeleton from 'react-loading-skeleton'

import PokemonTableSkeleton from '@/components/Suspense/PokemonTableSkeleton'

const LocationPageSkeleton = () => {
  return (
    <div className="flex flex-col items-center gap-4">
      <Skeleton
        width="18rem"
        className="mb-4"
        height="1.875rem"
        containerClassName="flex-1 w-full"
      />
      <Skeleton width="8rem" height="1.5rem" containerClassName="flex-1 w-full" />
      <div className="w-64">
        <PokemonTableSkeleton />
      </div>
    </div>
  )
}

export default LocationPageSkeleton
