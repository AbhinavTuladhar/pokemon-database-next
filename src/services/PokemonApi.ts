import { Pokemon, PokemonForm } from '@/types'

import Api from './MainApi'

export const PokemonApi = {
  getByName: async function (name: string) {
    const response = await Api.pokemon.getPokemonByName(name)
    return response as unknown as Pokemon
  },
  getByNames: async function (names: Array<string>) {
    const fetchRequests = names.map(pokemon => Api.pokemon.getPokemonByName(pokemon))
    const responses = await Promise.all(fetchRequests)
    return responses as Pokemon[]
  },
  getByIds: async function (ids: Array<number>) {
    const fetchRequests = ids.map(id => Api.pokemon.getPokemonById(id))
    const responses = await Promise.all(fetchRequests)
    return responses as Pokemon[]
  },
  getByOffsetAndLimit: async function (offset: number, limit: number) {
    const response = await Api.pokemon.listPokemons(offset, limit)
    return response
  },
  getFormsByIds: async function (numbers: Array<string>) {
    const requests = numbers.map(id => Api.pokemon.getPokemonFormById(+id))
    const responses = await Promise.all(requests)
    return responses as PokemonForm[]
  },
}
