import { PokemonClient } from 'pokenode-ts'

import { PokemonSpecies } from '@/types'
import trimUrl from '@/utils/trimUrl'

import baseURL from './baseUrl'
import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'

const api = new PokemonClient({ cacheOptions: {} })

export const SpeciesApi = {
  getByFullUrl: async function (url: string) {
    // Species api is mainly used along with Pokemon API, and is usually not encountered on its own.
    const response = await fetchData<PokemonSpecies>(trimUrl(url))
    return response
  },
  get: async function (url: string) {
    const response = await fetchData<PokemonSpecies>(trimUrl(url))
    return response
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<PokemonSpecies>(trimmedUrls)
    return response
  },

  getById: async function (id: number) {
    const response = await api.getPokemonSpeciesById(id)
    return response as unknown as PokemonSpecies
  },
}
