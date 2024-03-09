import { PokemonSpecies } from '@/types'
import trimUrl from '@/utils/trimUrl'

import baseURL from './baseUrl'
import fetchData from './fetchData'

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
}
