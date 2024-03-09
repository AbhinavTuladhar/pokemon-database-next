import { Location, LocationArea, Region } from '@/types'
import fetchData from './fetchData'
import trimUrl from '@/utils/trimUrl'
import fetchMultipleData from './fetchMultipleData'

export const LocationApi = {
  getByName: async function (name: string) {
    const response = await fetchData<Location>(`/location/${name}`)
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

export const LocationAreaApi = {
  getByUrls: async function (urls: string[]) {
    const trimmedUrls = urls.map(trimUrl)
    const responses = await fetchMultipleData<LocationArea>(trimmedUrls)
    return responses
  },
}
