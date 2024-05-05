import React, { Fragment } from 'react'

import { MiniTypeCard, TypeCard, TypeMultiplierBox } from '@/components/cards'
import { Tooltip } from '@/components/client-components'
import typeList from '@/data/typeList'
import TypeExtractor from '@/extractors/TypeExtractor'
import { TypesApi } from '@/services'
import findTypeEffectiveness from '@/utils/findTypeEffectiveness'
import formatName from '@/utils/formatName'
import multiplierToString from '@/utils/multiplierToString'

const getAllTypeData = async () => {
  const typeData = await TypesApi.getByNames(typeList)

  // Step 1: Extract type information
  // Step 2: Calculate the type chart, and return an object containing the type chart with the defending
  // type name
  // Step 3: Properly format the type chart object.
  // Next we need to transform the data into a usable state.
  const transformedTypeData = typeData.map(type => {
    const extractedInfo = TypeExtractor(type)
    const { name: typeName } = extractedInfo
    const typeChart = findTypeEffectiveness([extractedInfo])
    const typeDefenceInfo = Object.entries(typeChart).map(([typeName, multiplier]) => ({
      typeName,
      multiplier,
    }))
    return { typeName, typeDefenceInfo }
  })

  return transformedTypeData
}

export const TypeChart = async () => {
  const typeData = await getAllTypeData()

  // To show the defending and attacking types.
  const cornerDiv = (
    <div className="-mb-px flex h-[36px] w-16 flex-col items-center justify-center rounded border border-[#292e38] text-[10px]">
      <span> DEFENCE → </span>
      <span> ATTACK ↴ </span>
    </div>
  )

  const firstTypeCardData: typeof typeData = [
    {
      typeName: '',
      typeDefenceInfo: [{ typeName: '', multiplier: 1 }],
    },
  ]

  // An empty array at the beginning for a div containing info about the axes.
  const fullTypeCards = [...firstTypeCardData, ...typeData].map((type, index) => {
    if (index === 0) {
      return cornerDiv
    } else {
      return (
        <Fragment key={index}>
          <TypeCard typeName={type?.typeName} variant="big" />
        </Fragment>
      )
    }
  })

  const finalTypeCards = fullTypeCards.map((typeCard, index) => (
    <div className="flex items-center justify-center" key={`card-${index}`}>
      {typeCard}
    </div>
  ))

  const tableColumns = typeData.map((type, index) => {
    const { typeName: defendingTypeName, typeDefenceInfo: defenceInfo } = type

    const tableCells = defenceInfo?.map((defendingType, cellIndex) => {
      const { typeName: attackingTypeName, multiplier } = defendingType
      const effectString = multiplierToString(multiplier)
      const tooltipContent = `${formatName(attackingTypeName)} → ${formatName(defendingTypeName)} = ${effectString}`

      if (cellIndex === 0) {
        return (
          <div key={`cell-${cellIndex}`}>
            <MiniTypeCard typeName={defendingTypeName} />
            <div data-tooltip-id="my-tooltip" data-tooltip-content={tooltipContent} key={cellIndex}>
              <TypeMultiplierBox multiplier={multiplier} />
            </div>
          </div>
        )
      } else {
        return (
          <div data-tooltip-id="my-tooltip" data-tooltip-content={tooltipContent} key={cellIndex}>
            <TypeMultiplierBox multiplier={multiplier} />
          </div>
        )
      }
    })

    return (
      <div className="flex flex-col" key={`table-cell-${index}`}>
        {tableCells}
      </div>
    )
  })

  return (
    <>
      <div className="overflow-auto">
        <div className="inline-flex">
          <div className="flex flex-col items-start justify-start gap-y-px">{finalTypeCards}</div>
          <div className="flex flex-row items-start justify-center">{tableColumns}</div>
        </div>
      </div>

      <Tooltip id="my-tooltip" className="text-lg" style={{ fontSize: '0.75rem' }} />
    </>
  )
}
