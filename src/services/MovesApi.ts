import { Move, NamedApiResourceList } from '@/types'
import stringifyUrl from '@/utils/stringifyUrl'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'

export const MovesApi = {
  get: async function (name: string) {
    const response = await fetchData<Move>(`/move/${name}`)
    return response
  },
  getAllUrls: async function () {
    const response = await fetchData<NamedApiResourceList<Move>>('/move?limit=721')
    const { results } = response
    const data = results.map((result) => {
      const { name, url } = result
      return stringifyUrl(url, name)
    })
    return data
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<Move>(trimmedUrls)
    return response
  },
}
