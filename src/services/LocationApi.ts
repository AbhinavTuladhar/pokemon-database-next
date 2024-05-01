import { Location, LocationArea, Region } from '@/types'

import Api from './MainApi'

export const LocationApi = {
  getByName: async function (name: string) {
    const response = await Api.location.getLocationByName(name)
    return response as Location
  },
  getAllNames: async function () {
    const response = await Api.location.listLocations(0, 814)
    return response.results.map(location => location.name)
  },
}

export const RegionApi = {
  getByIds: async function (ids: Array<number>) {
    const requests = ids.map(id => Api.location.getRegionById(id))
    const responses = await Promise.all(requests)
    return responses as unknown as Region[]
  },
}

export const LocationAreaApi = {
  getByNames: async function (names: Array<string>) {
    const requests = names.map(name => Api.location.getLocationAreaByName(name))
    const responses = await Promise.all(requests)
    return responses as unknown as LocationArea[]
  },
}
