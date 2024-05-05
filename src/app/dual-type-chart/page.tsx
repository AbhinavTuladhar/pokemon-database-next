import React from 'react'

import { TypeCard } from '@/components/cards'
import { PageTitle } from '@/components/containers'
import typeList from '@/data/typeList'
import TypeExtractor from '@/extractors/TypeExtractor'
import { TypesApi } from '@/services'
import findTypeEffectiveness from '@/utils/findTypeEffectiveness'

import DualTypeChart from './_components/DualTypeChart'

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

const DualTypePage = async () => {
  const typeData = await getAllTypeData()

  const cornerDiv = (
    <div className="-mb-px flex h-[36px] flex-col items-center justify-center rounded border border-[#292e38] text-[10px]">
      <span> ATTACK → </span>
      <span> DEFENCE ↴ </span>
    </div>
  )

  // Find all the possible type combinations
  const typeCombinations = typeList.flatMap(type => {
    return typeList.map(innerType => {
      return [type, innerType]
    })
  })

  const firstColumn = (
    <div className="flex w-min flex-col gap-y-px">
      <>{cornerDiv}</>
      {typeCombinations.map((type, index) => {
        const [firstType, secondType] = type
        return (
          <div className="flex gap-x-px" key={index}>
            <TypeCard key={index} typeName={firstType} />
            <TypeCard key={index} typeName={secondType} />
          </div>
        )
      })}
    </div>
  )

  return (
    <main>
      <PageTitle> Pokémon dual-type charts </PageTitle>
      {typeList.map(type => (
        <DualTypeChart key={type} baseType={type} />
      ))}
    </main>
  )
}

export default DualTypePage
