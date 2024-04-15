import React from 'react'
import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import AbilityExtractor from '@/extractors/AbilityExtractor'
import { AbilityApi } from '@/services/AbilityApi'

import AbilityTable from './_components/AbilityTable'

export const metadata: Metadata = {
  title: 'Pokémon Abilities | Pokémon Database',
}

const getAbilityList = async () => {
  const response = await AbilityApi.getAllNames()
  return response
}

const getAllAbilityData = async (names: Array<string>) => {
  const abilityData = await AbilityApi.getByNames(names)
  return abilityData.map(AbilityExtractor).sort((a, b) => (a.name > b.name ? 1 : -1))
}

const page = async () => {
  const abilityNames = await getAbilityList()
  const allAbilityData = await getAllAbilityData(abilityNames)

  return (
    <main>
      <PageTitle>Pokémon Abilities</PageTitle>
      <AbilityTable abilityData={allAbilityData} />
    </main>
  )
}

export default page
