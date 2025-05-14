import React from 'react'

import { AbilityExtractor } from '@/extractors'
import AbilityService from '@/features/battle/services/ability.service'

import { AbilityTable } from './AbilityTable'

const getAbilityList = async () => {
  const response = await AbilityService.getAllNames()
  return response
}

const getAllAbilityData = async (names: Array<string>) => {
  const abilityData = await AbilityService.getByNames(names)
  return abilityData.map(AbilityExtractor).sort((a, b) => (a.name > b.name ? 1 : -1))
}

export const AbilityTableWrapper = async () => {
  const abilityNames = await getAbilityList()
  const allAbilityData = await getAllAbilityData(abilityNames)

  return <AbilityTable abilityData={allAbilityData} />
}
