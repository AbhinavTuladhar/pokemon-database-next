import { EggGroup, NamedApiResourceList } from '@/types'
import { Berry } from '@/types'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'

export const EggGroupApi = {
  getAll: async function () {
    const response = await fetchData<NamedApiResourceList<EggGroup>>('/egg-group')
    return response
  },
  get: async function (url: string) {
    const trimmedUrl = trimUrl(url)
    const response = await fetchData<EggGroup>(trimmedUrl)
    return response
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const responses = await fetchMultipleData<EggGroup>(trimmedUrls)
    return responses
  },
}
