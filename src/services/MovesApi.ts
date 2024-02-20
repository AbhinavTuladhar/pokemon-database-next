import { Move } from '@/types'
import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'
import trimUrl from '@/utils/trimUrl'

export const MovesApi = {
  get: async function (name: string) {
    const response = await fetchData<Move>(`/move/${name}`)
    return response
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<Move>(trimmedUrls)
    return response
  },
}
