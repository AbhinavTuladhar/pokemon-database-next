import { PokemonSpecies } from '@/types'

import Api from './MainApi'

export const SpeciesApi = {
  getById: async function (id: number) {
    const response = await Api.pokemon.getPokemonSpeciesById(id)
    return response as unknown as PokemonSpecies
  },
  getByIds: async function (ids: Array<number>) {
    const requests = ids.map(id => Api.pokemon.getPokemonSpeciesById(id))
    const responses = await Promise.all(requests)
    return responses as unknown as PokemonSpecies[]
  },
}
