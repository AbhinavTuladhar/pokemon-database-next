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

  const firstRow = typeList.map((type, index) => <MiniTypeCard typeName={type} key={index} />)

  const otherRows = typeCombinations.map((typeCombo, rowIndex) => {
    const rowDiv = typeList.map((_, colIndex) => {
      const [firstType, secondType] = typeCombo
      const multiplierValue = calculateOffensiveTypeEffectiveness(
        firstType === secondType ? [firstType] : typeCombo,
        attackingTypeInfo[colIndex],
      )
      return <TypeMultiplierBox multiplier={multiplierValue} key={colIndex} />
    })
    return (
      <div className="flex" key={rowIndex}>
        {rowDiv}
      </div>
    )
  })

  const talbeRows = (
    <div className="flex flex-col">
      <div className="flex gap-x-px">{firstRow}</div>
      {otherRows}
    </div>
  )

  return (
    <div className="flex gap-x-px">
      <div className="flex flex-col gap-y-px">
        {cornerDiv}
        {firstColumnCards}
      </div>
      <div className="flex flex-col gap-y-px">{talbeRows}</div>
    </div>
  )
}

export default DualTypeChart
