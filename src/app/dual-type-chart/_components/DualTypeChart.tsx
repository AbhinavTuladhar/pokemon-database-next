import React, { FC } from 'react'

import { MiniTypeCard, TypeCard, TypeMultiplierBox } from '@/components/cards'
import typeList from '@/data/typeList'
import { TransformedType } from '@/types'
import calculateOffensiveTypeEffectiveness from '@/utils/typeEffectivenessOffensive'

interface DualTypeChartProps {
  baseType: string
  attackingTypeInfo: Array<Pick<TransformedType, 'doubleDamageTo' | 'halfDamageTo' | 'noDamageTo'>>
}

const DualTypeChart: FC<DualTypeChartProps> = ({ baseType, attackingTypeInfo }) => {
  // Sorting like this brings the identical array ('fire', 'fire') to the top.
  const typeCombinations = typeList.map(type => [baseType, type])
  // .sort((a, b) => {
  //   if (a[0] === a[1]) return -1
  //   if (b[0] === b[1]) return 1
  //   return 0
  // })

  const cornerDiv = (
    <div className="-mb-px flex h-[36px] flex-col items-center justify-center rounded border border-table-border text-[10px]">
      <span> ATTACK → </span>
      <span> DEFENCE ↴ </span>
    </div>
  )

  const firstColumnCards = typeCombinations.map((type, index) => {
    const [firstType, secondType] = type
    return (
      <div className="flex gap-x-px" key={index}>
        <TypeCard key={index} typeName={firstType} variant="big" />
        {firstType !== secondType ? (
          <TypeCard key={index} typeName={secondType} variant="big" />
        ) : null}
      </div>
    )
  })

  const tableColumns = [...typeList].map((type, colIndex) => {
    const colDiv = typeCombinations.map((typeComb, rowIndex) => {
      if (rowIndex === 0) {
        return <MiniTypeCard typeName={type} key={rowIndex} />
      } else {
        const multiplierVaue = calculateOffensiveTypeEffectiveness(
          typeComb,
          attackingTypeInfo[colIndex],
        )
        return <TypeMultiplierBox multiplier={multiplierVaue} key={rowIndex} />
      }
    })
    return (
      <div className="flex flex-col" key={colIndex}>
        {colDiv}
      </div>
    )
  })

  return (
    <div className="flex gap-x-px">
      <div className="flex flex-col gap-y-px">
        {cornerDiv}
        {firstColumnCards}
      </div>
      <div className="flex flex-row gap-x-px">{tableColumns}</div>
    </div>
  )
}

export default DualTypeChart
