import React, { FC } from 'react'

import { TypeCard } from '@/components/cards'
import typeList from '@/data/typeList'

interface DualTypeChartProps {
  baseType: string
}

const DualTypeChart: FC<DualTypeChartProps> = ({ baseType }) => {
  // Sorting like this brings the identical array ('fire', 'fire') to the top.
  const typeCombinations = typeList
    .map(type => [baseType, type])
    .sort((a, b) => {
      if (a[0] === a[1]) return -1
      if (b[0] === b[1]) return 1
      return 0
    })

  const cornerDiv = (
    <div className="-mb-px flex h-[36px] flex-col items-center justify-center rounded border border-table-border text-[10px]">
      <span> ATTACK → </span>
      <span> DEFENCE ↴ </span>
    </div>
  )

  const firstColumn = (
    <div className="flex w-min flex-col gap-y-px">
      <>{cornerDiv}</>
      {typeCombinations.map((type, index) => {
        const [firstType, secondType] = type
        return (
          <div className="flex gap-x-px" key={index}>
            <TypeCard key={index} typeName={firstType} />
            {firstType !== secondType ? <TypeCard key={index} typeName={secondType} /> : null}
          </div>
        )
      })}
    </div>
  )

  return <div>{firstColumn}</div>
}

export default DualTypeChart
