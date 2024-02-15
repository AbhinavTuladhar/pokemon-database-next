import { PokemonSpecies } from '@/types'
import fetchData from './fetchData'
import baseURL from './baseUrl'

export const SpeciesApi = {
  getByFullUrl: async function (url: string) {
    // Species api is mainly used along with Pokemon API, and is usually not encountered on its own.
    const cutUrl = url.slice(baseURL.length)
    const response = await fetchData<PokemonSpecies>(cutUrl)
    return response
  },
  get: async function (id: number | string) {
    const response = await fetchData<PokemonSpecies>(`/pokemon-species/${id}`)
    return response
  },
}
