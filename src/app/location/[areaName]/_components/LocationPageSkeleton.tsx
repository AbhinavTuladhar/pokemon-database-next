import React from 'react'
import Skeleton from 'react-loading-skeleton'

import { PokemonTableSkeleton } from '@/components/skeletons'

export const LocationPageSkeleton = () => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <Skeleton
        width="18rem"
        className="my-4 text-center"
        height="2.25rem"
        containerClassName="flex-1 w-full text-center"
      />
      <Skeleton width="8rem" height="2.875rem" containerClassName="flex-1 w-full" />
      <Skeleton width="6rem" height="1.5rem" containerClassName="flex-1 w-full" />
      <Skeleton width="6rem" height="1.25rem" containerClassName="flex-1 w-full" />
      <div className="w-72">
        <PokemonTableSkeleton />
      </div>
    </div>
  )
}
