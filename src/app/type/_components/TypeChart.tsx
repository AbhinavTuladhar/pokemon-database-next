import React, { FC, Fragment } from 'react'

import { MiniTypeCard, TypeCard, TypeMultiplierBox } from '@/components/cards'
import typeList from '@/data/typeList'
import TypeExtractor from '@/extractors/TypeExtractor'
import { TypesApi } from '@/services'
import formatName from '@/utils/formatName'
import multiplierToString from '@/utils/multiplierToString'
import calculateOffensiveTypeEffectiveness from '@/utils/typeEffectivenessOffensive'

const FirstRow = () => (
  <>
    <div className="-mb-px flex h-[36px] w-16 flex-col items-center justify-center rounded border border-bd-light text-[10px] dark:border-bd-dark">
      <span> DEFENCE → </span>
      <span> ATTACK ↴ </span>
    </div>
    {typeList.map(type => (
      <MiniTypeCard typeName={type} key={type} />
    ))}
  </>
)

interface AttackingInfo {
  name: string
  multiplier: number
}

interface RowProps {
  type: string
  attackInfo: Array<AttackingInfo>
}

const TypeChartRow: FC<RowProps> = ({ type, attackInfo }) => (
  <Fragment key={type}>
    <TypeCard typeName={type} variant="big" key={type} />
    {typeList.map(defendingType => {
      const multiplierValue = attackInfo.find(info => info.name === defendingType)
        ?.multiplier as number
      const tooltipContent = `${formatName(type)} → ${formatName(defendingType)} = ${multiplierToString(multiplierValue)}`
      return (
        <div key={defendingType} data-tooltip-id="my-tooltip" data-tooltip-content={tooltipContent}>
          <TypeMultiplierBox multiplier={multiplierValue} />
        </div>
      )
    })}
  </Fragment>
)

const getAllTypeData = async () => {
  const typeData = await TypesApi.getByNames(typeList)

  /**
   * Iterate over the fetched type data.
   * Then extract the information for each type.
   * For each type in the type list, calculate the effectiveness of each type against that type
   */
  const transformedData = typeData.map(outerType => {
    const extractedData = TypeExtractor(outerType)
    const attackInfo = typeList.map(innerType => {
      const newValue = calculateOffensiveTypeEffectiveness([innerType], extractedData)
      return { name: innerType, multiplier: newValue }
    })
    return { type: outerType.name, attackInfo: attackInfo }
  })

  return transformedData
}

export const TypeChart = async () => {
  const typeData = await getAllTypeData()

  return (
    <div className="overflow-auto">
      <div className="inline-flex">
        <div className="grid grid-flow-row grid-cols-type-chart">
          <FirstRow />
          {typeData.map(attackingType => {
            const { type, attackInfo } = attackingType
            return <TypeChartRow key={type} type={type} attackInfo={attackInfo} />
          })}
        </div>
      </div>
    </div>
  )
}
