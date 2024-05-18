import React from 'react'

import { MiniTypeCard, TypeCard, TypeMultiplierBox } from '@/components/cards'
import typeList from '@/data/typeList'
import TypeExtractor from '@/extractors/TypeExtractor'
import { TypesApi } from '@/services'
import calculateOffensiveTypeEffectiveness from '@/utils/typeEffectivenessOffensive'

const getAllTypeData = async () => {
  const typeData = await TypesApi.getByNames(typeList)

  // Step 1: Extract type information
  // Step 2: Calculate the type chart, and return an object containing the type chart with the defending
  // type name
  // Step 3: Properly format the type chart object.
  // Next we need to transform the data into a usable state.

  /**
   * Iterate over the fetched type data.
   * Then extract the information for each type.
   *
   */
  const transformedData = typeData.map(outerType => {
    const extractedData = TypeExtractor(outerType)
    const test3 = typeList.map(innerType => {
      const newValue = calculateOffensiveTypeEffectiveness([innerType], extractedData)
      return { name: innerType, multiplier: newValue }
    })
    return { type: outerType.name, attackInfo: test3 }
  })

  return transformedData

  // return newDataTransformedData
}

export const TypeChart = async () => {
  const typeData = await getAllTypeData()

  return (
    <div className="overflow-auto">
      <div className="grid grid-flow-row gap-y-px">
        <div className="grid grid-flow-col gap-x-px">
          {/* Corner div */}
          <div className="-mb-px flex h-[36px] w-16 flex-col items-center justify-center rounded border border-gray-100 text-[10px] dark:border-table-border">
            <span> DEFENCE → </span>
            <span> ATTACK ↴ </span>
          </div>
          {/* First row */}
          {typeList.map(type => (
            <MiniTypeCard typeName={type} key={type} />
          ))}
        </div>

        {typeData.map(attackingType => {
          const { type, attackInfo } = attackingType
          return (
            <div className="grid grid-flow-col gap-x-px" key={type}>
              <TypeCard typeName={type} variant="big" key={type} />
              {typeList.map(defendingType => {
                return (
                  <TypeMultiplierBox
                    multiplier={
                      attackInfo.find(info => info.name === defendingType)?.multiplier as number
                    }
                    key={defendingType}
                  />
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}
