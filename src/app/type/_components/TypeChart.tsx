import React, { Fragment } from 'react'

import { MiniTypeCard, TypeCard, TypeMultiplierBox } from '@/components/cards'
import typeList from '@/data/typeList'
import TypeExtractor from '@/extractors/TypeExtractor'
import { TypesApi } from '@/services'
import calculateOffensiveTypeEffectiveness from '@/utils/typeEffectivenessOffensive'

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

  // return newDataTransformedData
}

export const TypeChart = async () => {
  const typeData = await getAllTypeData()

  return (
    <div className="overflow-auto">
      <div className="inline-flex">
        <div className="grid-cols-type-chart grid grid-flow-row">
          {/* First row */}
          <div className="-mb-px flex h-[36px] w-16 flex-col items-center justify-center rounded border border-gray-100 text-[10px] dark:border-table-border">
            <span> DEFENCE → </span>
            <span> ATTACK ↴ </span>
          </div>
          {typeList.map(type => (
            <MiniTypeCard typeName={type} key={type} />
          ))}

          {/* Rest of the rows */}
          {typeData.map(attackingType => {
            const { type, attackInfo } = attackingType
            return (
              <Fragment key={type}>
                <TypeCard typeName={type} variant="big" key={type} />
                {typeList.map(defendingType => (
                  <TypeMultiplierBox
                    multiplier={
                      attackInfo.find(info => info.name === defendingType)?.multiplier as number
                    }
                    key={defendingType}
                  />
                ))}
              </Fragment>
            )
          })}
        </div>
      </div>
    </div>
  )
}
