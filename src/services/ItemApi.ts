import { Item } from '@/types'
import trimUrl from '@/utils/trimUrl'

import fetchData from './fetchData'
import fetchMultipleData from './fetchMultipleData'

export const ItemApi = {
  get: async function (url: string) {
    const trimmedUrl = trimUrl(url)
    const response = await fetchData<Item>(trimmedUrl)
    return response
  },
  getByUrls: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const response = await fetchMultipleData<Item>(trimmedUrls)
    return response
  },
}
