import React from 'react'
import Skeleton from 'react-loading-skeleton'

export const LoadingPage = () => {
  return (
    <div className="flex flex-col items-center gap-y-4">
      <Skeleton
        height="3rem"
        width="15rem"
        containerClassName="flex-1 w-full mt-6 flex items-center justify-center"
      />
      <Skeleton height="1.5rem" width="100%" containerClassName="w-full flex-1" />
      <Skeleton height="3.5rem" width="100%" containerClassName="w-full flex-1" />
      <Skeleton height="1.5rem" width="100%" containerClassName="w-full flex-1" />
      <div className="mt-2 grid w-full grid-cols-pokemon-detail-grid gap-x-8 gap-y-6">
        {Array.from({ length: 3 }, (_, index) => (
          <Skeleton height="50vh" width="100%" containerClassName="w-full flex-1" key={index} />
        ))}
      </div>
    </div>
  )
}
