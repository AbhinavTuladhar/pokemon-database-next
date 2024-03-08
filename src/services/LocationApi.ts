import { Region } from '@/types'
import fetchData from './fetchData'
import trimUrl from '@/utils/trimUrl'
import fetchMultipleData from './fetchMultipleData'

export const LocationApi = {
  getByName: async function (url: string) {
    const response = await fetchData<Location>(url)
    return response
  },
}

export const RegionApi = {
  get: async function (url: string) {
    const response = await fetchData<Region>(trimUrl(url))
    return response
  },
  getAll: async function (urls: Array<string>) {
    const trimmedUrls = urls.map(trimUrl)
    const responses = await fetchMultipleData<Region>(trimmedUrls)
    return responses
  },
}
