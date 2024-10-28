import { Ability } from '@/types'

import Api from './MainApi'

export const AbilityApi = {
  getAllNames: async function () {
    const response = await Api.pokemon.listAbilities(0, 233)
    const namesList = response.results.map(ability => ability.name)
    return namesList
  },
  getByName: async function (name: string) {
    const response = await Api.pokemon.getAbilityByName(name)
    return response as unknown as Ability
  },
  getByNames: async function (names: Array<string>) {
    const requests = names.map(name => Api.pokemon.getAbilityByName(name))
    const responses = await Promise.all(requests)
    return responses as unknown as Ability[]
  },
}
