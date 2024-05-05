import React from 'react'

import { PageTitle } from '@/components/containers'
import typeList from '@/data/typeList'
import TypeExtractor from '@/extractors/TypeExtractor'
import { TypesApi } from '@/services'

import DualTypeChart from './_components/DualTypeChart'

const getAllTypeData = async () => {
  const typeData = await TypesApi.getByNames(typeList)

  const transformedTypeData = typeData.map(type => {
    const extractedInfo = TypeExtractor(type)
    const { name: typeName, doubleDamageTo, halfDamageTo, noDamageTo } = extractedInfo
    const attackingTypeInfo = {
      doubleDamageTo,
      halfDamageTo,
      noDamageTo,
    }
    return { typeName, attackingTypeInfo }
  })

  return transformedTypeData
}

const DualTypePage = async () => {
  const typeData = await getAllTypeData()

  return (
    <main>
      <PageTitle> Pokémon dual-type charts </PageTitle>
      {typeList.map(type => (
        <DualTypeChart
          key={type}
          baseType={type}
          attackingTypeInfo={typeData.map(data => data.attackingTypeInfo)}
        />
      ))}
    </main>
  )
}

export default DualTypePage
