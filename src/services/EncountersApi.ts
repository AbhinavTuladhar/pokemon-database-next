import { LocationAreaEncounter } from '@/types'

import Api from './MainApi'

export const EncountersApi = {
  getById: async function (id: number) {
    const response = await Api.pokemon.getPokemonLocationAreaById(id)
    return response as LocationAreaEncounter[]
  },
}
