import { NamedApiResourceList, Pokemon } from '@/types'
import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'
import trimUrl from '@/utils/trimUrl'

export const PokemonApi = {
  getByGeneration: async function (offset: number, limit: number) {
    const response = await fetchData<NamedApiResourceList<Pokemon>>(
      `/pokemon?offset=${offset}&limit=${limit}`,
    )
    return response
  },
  get: async function (name: string) {
    const response = await fetchData<Pokemon>(`/pokemon/${name}`)
    return response
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<Pokemon>(trimmedUrls)
    return response
  },
}
