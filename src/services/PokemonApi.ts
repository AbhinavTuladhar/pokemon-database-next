import { PokemonClient } from 'pokenode-ts'

import { GenericNamedResource, NamedApiResourceList, Pokemon } from '@/types'
import stringifyUrl from '@/utils/stringifyUrl'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'
import Api from './MainApi'

export const PokemonApi = {
  getByGeneration: async function (offset: number, limit: number) {
    const response = await fetchData<NamedApiResourceList<Pokemon>>(
      `/pokemon?offset=${offset}&limit=${limit}`,
    )
    return response
  },
  get: async function (name: string) {
    const response = await Api.pokemon.getPokemonByName(name)
    const test = await Api.pokemon.listPokemonSpecies(1, 100)
    // const response = await fetchData<Pokemon>(`/pokemon/${name}`)
    return response
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<Pokemon>(trimmedUrls)
    return response
  },

  getByName: async function (name: string) {
    const response = await Api.pokemon.getPokemonByName(name)
    return response as unknown as Pokemon
  },
  getByNames: async function (names: Array<string>) {
    const fetchRequests = names.map((pokemon) => Api.pokemon.getPokemonByName(pokemon))
    const responses = await Promise.all(fetchRequests)
    return responses as Pokemon[]
  },
  getByOffsetAndLimit: async function (offset: number, limit: number) {
    const response = await Api.pokemon.listPokemons(offset, limit)
    return response
  },
}
