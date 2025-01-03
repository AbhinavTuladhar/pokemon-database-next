import React, { FC } from 'react'
import Skeleton from 'react-loading-skeleton'

interface CardProps {
  count: number
}

export const TypeSummarySkeleton: FC<CardProps> = ({ count }) => {
  return (
    <div className="flex flex-row flex-wrap items-center justify-center gap-8">
      {Array(count)
        .fill(0)
        .map((value, index) => (
          <div className="h-[52px] w-[123px]" key={value + index}>
            <Skeleton key={value + index} containerClassName="flex-1 w-full" className="h-full" />
          </div>
        ))}
    </div>
  )
}
