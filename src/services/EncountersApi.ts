import { EncounterMethod, LocationAreaEncounter } from '@/types'

import Api from './MainApi'

export const EncountersApi = {
  getById: async function (id: number) {
    const response = await Api.pokemon.getPokemonLocationAreaById(id)
    return response as LocationAreaEncounter[]
  },
  getAllMethodDescriptions: async function () {
    const listResponse = await Api.encounter.listEncounterMethods(0, 31)
    const methodNames = listResponse.results.map(method => method.name)
    const requests = methodNames.map(name => Api.encounter.getEncounterMethodByName(name))
    const responses = await Promise.all(requests)
    return responses as EncounterMethod[]
  },
}
