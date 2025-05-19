import React, { FC } from 'react'

import { SectionTitle } from '@/components/ui/Title'
import { calculateDefensiveTypeEffectiveness } from '@/features/pokemon/helpers/type.helper'
import TypesService from '@/features/pokemon/services/types.service'
import { transformType } from '@/features/pokemon/transformers/transform-type'
import { PokemonType } from '@/types'
import { formatName } from '@/utils/string.utils'

import DynamicChart from './DynamicChart'

interface TypeChartProps {
  types: Array<PokemonType>
  pokemonName: string
  abilityNames: Array<string>
}

const getTypesData = async (names: Array<string>) => {
  const response = await TypesService.getByNames(names.map(name => name.toLowerCase()))
  return response.map(transformType)
}

export const TypeChart: FC<TypeChartProps> = async ({ types, pokemonName, abilityNames }) => {
  const typeNames = types.map(type => formatName(type.type.name))
  const typeNamesString = typeNames.join('/')

  const typeData = await getTypesData(typeNames)

  const typeDefenseInfo = Object.entries(calculateDefensiveTypeEffectiveness(typeData)).map(
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
