import { PokemonClient } from 'pokenode-ts'

import { GenericNamedResource, NamedApiResourceList, Pokemon } from '@/types'
import stringifyUrl from '@/utils/stringifyUrl'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'

const api = new PokemonClient()

export const PokemonApi = {
  getByGeneration: async function (offset: number, limit: number) {
    const response = await fetchData<NamedApiResourceList<Pokemon>>(
      `/pokemon?offset=${offset}&limit=${limit}`,
    )
    return response
  },
  get: async function (name: string) {
    const response = await api.getPokemonByName(name)
    const test = await api.listPokemonSpecies(1, 100)
    // const response = await fetchData<Pokemon>(`/pokemon/${name}`)
    return response
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<Pokemon>(trimmedUrls)
    return response
  },

  getByName: async function (name: string) {
    const response = await api.getPokemonByName(name)
    return response as unknown as Pokemon
  },
  getByNames: async function (urls: Array<GenericNamedResource>) {
    const pokemonNames = urls.map((url) => url.name)
    const fetchRequests = pokemonNames.map((pokemon) => api.getPokemonByName(pokemon))
    const responses = await Promise.all(fetchRequests)
    return responses as Pokemon[]
  },
}
