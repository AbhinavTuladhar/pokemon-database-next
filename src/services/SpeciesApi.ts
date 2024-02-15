import { PokemonSpecies } from '@/types'
import fetchData from './fetchData'
import baseURL from './baseUrl'
import trimUrl from '@/utils/trimUrl'

export const SpeciesApi = {
  getByFullUrl: async function (url: string) {
    // Species api is mainly used along with Pokemon API, and is usually not encountered on its own.
    const response = await fetchData<PokemonSpecies>(trimUrl(url))
    return response
  },
  get: async function (id: number | string) {
    const response = await fetchData<PokemonSpecies>(`/pokemon-species/${id}`)
    return response
  },
}
