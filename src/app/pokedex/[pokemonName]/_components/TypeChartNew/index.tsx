import React, { FC } from 'react'

import { SectionTitle } from '@/components/ui/Title'
import { TypeExtractor } from '@/extractors'
import { TypesApi } from '@/services'
import { PokemonType } from '@/types'
import findTypeEffectiveness from '@/utils/findTypeEffectiveness'
import formatName from '@/utils/formatName'

import DynamicChart from './DynamicChart'

interface TypeChartProps {
  types: Array<PokemonType>
  pokemonName: string
  abilityNames: Array<string>
}

const getTypesData = async (names: Array<string>) => {
  const response = await TypesApi.getByNames(names.map(name => name.toLowerCase()))
  return response.map(TypeExtractor)
}

export const TypeChart: FC<TypeChartProps> = async ({ types, pokemonName, abilityNames }) => {
  const typeNames = types.map(type => formatName(type.type.name))
  const typeNamesString = typeNames.join('/')

  const typeData = await getTypesData(typeNames)

  const typeDefenseInfo = Object.entries(findTypeEffectiveness(typeData)).map(
    ([type, multiplier]) => {
      return { type, multiplier }
    },
  )

  return (
    <section>
      <SectionTitle> Type Defences </SectionTitle>
      <span> {`The effectiveness of each type on ${formatName(pokemonName)}: `} </span>
      <DynamicChart
        typeDefenceInfo={typeDefenseInfo}
        defendingType={typeNamesString}
        abilityNames={abilityNames}
      />
    </section>
  )
}
