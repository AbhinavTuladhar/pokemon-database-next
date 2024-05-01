import React from 'react'

import AbilityExtractor from '@/extractors/AbilityExtractor'
import { AbilityApi } from '@/services/AbilityApi'

import AbilityTable from './AbilityTable'

const getAbilityList = async () => {
  const response = await AbilityApi.getAllNames()
  return response
}

const getAllAbilityData = async (names: Array<string>) => {
  const abilityData = await AbilityApi.getByNames(names)
  return abilityData.map(AbilityExtractor).sort((a, b) => (a.name > b.name ? 1 : -1))
}

const AbilityTableWrapper = async () => {
  const abilityNames = await getAbilityList()
  const allAbilityData = await getAllAbilityData(abilityNames)

  return <AbilityTable abilityData={allAbilityData} />
}

export default AbilityTableWrapper
