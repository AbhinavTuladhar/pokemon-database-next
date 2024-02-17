import React, { Fragment } from 'react'
import TypeCard from './TypeCard'
import MiniTypeCard from './MiniTypeCard'
import TypeMultiplierBox from './TypeMultiplierBox'
import TypeExtractor from '@/extractors/TypeExtractor'
import findTypeEffectiveness from '@/utils/findTypeEffectiveness'
import multiplierToString from '../utils/multiplierToString'
import formatName from '@/utils/formatName'
import fetchMultipleData from '@/services/fetchMultipleData'
// import { Tooltip } from 'react-tooltip'
import { Type } from '@/types'

const getData = async () => {
  const typeListing = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ]
  const typeUrls = typeListing.map((type) => `/type/${type}`)

  const data = await fetchMultipleData<Type>(typeUrls)

  // Step 1: Extract type information
  // Step 2: Calculate the type chart, and return an object containing the type chart with the defending
  // type name
  // Step 3: Properly format the type chart object.

  // Next we need to transform the data into a usable state.
  const transformedTypeData = data.map((type) => {
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

const TypeChartFull = async () => {
  const typeData = await getData()

  // To show the defending and attacking types.
  const cornerDiv = (
    <div className="flex h-[36px] -mb-px w-16 text-[10px] flex-col items-center justify-center rounded border border-slate-700">
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
      if (cellIndex === 0) {
        return (
          <div key={`cell-${cellIndex}`}>
            <MiniTypeCard typeName={defendingTypeName} />
            <div id={`${attackingTypeName}-${defendingTypeName}`}>
              <TypeMultiplierBox multiplier={multiplier} />
            </div>
          </div>
        )
      } else {
        return (
          <div id={`${attackingTypeName}-${defendingTypeName}`} key={`multiplier-${cellIndex}`}>
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

  // const tooltips = typeData?.map((type, index) => {
  //   const { typeName: defendingTypeName, typeDefenceInfo: defenceInfo } = type

  //   return defenceInfo?.map((defendingType, innerIndex) => {
  //     const { typeName: attackingTypeName, multiplier } = defendingType
  //     const effectString = multiplierToString(multiplier)
  //     return (
  //       <Tooltip
  //         anchorSelect={`#${attackingTypeName}-${defendingTypeName}`}
  //         key={`tooltip-${innerIndex}`}
  //         place="bottom"
  //       >
  //         <span className="text-xs">
  //           {`${formatName(attackingTypeName)} → ${formatName(defendingTypeName)} = ${effectString}`}
  //         </span>
  //       </Tooltip>
  //     )
  //   })
  // })

  return (
    <>
      <div className="overflow-auto">
        <div className="inline-flex">
          <div className="flex flex-col justify-start items-start gap-y-px">{finalTypeCards}</div>
          <div className="flex flex-row justify-center items-start">{tableColumns}</div>
        </div>
      </div>

      {/* <>{tooltips}</> */}
    </>
  )
}

export default TypeChartFull
