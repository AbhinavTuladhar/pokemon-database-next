import { NamedApiResourceList } from '@/types'
import { Berry } from '@/types'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'

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
