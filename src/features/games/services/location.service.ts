import Api from '@/services/MainApi'
import { Location, LocationArea, Region } from '@/types'

export class LocationService {
  static async getByName(name: string) {
    const response = await Api.location.getLocationByName(name)
    return response as Location
  }
  static async getAllNames() {
    const response = await Api.location.listLocations(0, 814)
    return response.results.map(location => location.name)
  }
}

export class RegionApi {
  static async getByIds(ids: Array<number>) {
    const requests = ids.map(id => Api.location.getRegionById(id))
    const responses = await Promise.all(requests)
    return responses as unknown as Region[]
  }
}

export class LocationAreaApi {
  static async getByNames(names: Array<string>) {
    const requests = names.map(name => Api.location.getLocationAreaByName(name))
    const responses = await Promise.all(requests)
    return responses as unknown as LocationArea[]
  }
}
