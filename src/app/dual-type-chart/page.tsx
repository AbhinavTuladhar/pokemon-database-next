import React from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/ui/Title'
import { typeList } from '@/features/pokemon/data/type.data'
import TypesService from '@/features/pokemon/services/types.service'
import { transformType } from '@/features/pokemon/transformers/transform-type'

import { DualTypeChart, SideDescription } from './_components'

export const metadata: Metadata = {
  title: 'Pokémon dual-type charts | Pokémon Database',
}

const getAllTypeData = async () => {
  const typeData = await TypesService.getByNames(typeList)

  const transformedTypeData = typeData.map(type => {
    const extractedInfo = transformType(type)
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
      <div className="grid grid-cols-12 justify-between gap-x-8 gap-y-6">
        <div className="lg-xl:col-span-3 col-span-12">
          <SideDescription />
        </div>
        <div className="lg-xl:col-span-9 lg-xl:items-end col-span-12 flex w-full flex-col gap-y-4">
          {typeList.map((type, index) => (
            <DualTypeChart
              key={type}
              baseType={type}
              attackingTypeInfo={typeData.map(data => data.attackingTypeInfo)}
              sectionTitleFlag={index === 0}
            />
          ))}
        </div>
      </div>
    </main>
  )
}

export default DualTypePage
