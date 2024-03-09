import { NamedApiResourceList, Nature } from '@/types'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'

export const NatureApi = {
  get: async function () {
    const response = await fetchData<NamedApiResourceList<Nature>>('/nature?limit=25')
    return response
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const responses = await fetchMultipleData<Nature>(trimmedUrls)
    return responses
  },
}
