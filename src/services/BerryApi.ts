import { NamedApiResourceList } from '@/types'
import fetchData from './fetchData'
import { Berry } from '@/types'
import fetchMultipleData from './fetchMultipleData'
import trimUrl from '@/utils/trimUrl'

export const BerryApi = {
  getAll: async function () {
    const response = await fetchData<NamedApiResourceList<Berry>>('/berry?limit=64')
    return response
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const responses = await fetchMultipleData<Berry>(trimmedUrls)
    return responses
  },
}
