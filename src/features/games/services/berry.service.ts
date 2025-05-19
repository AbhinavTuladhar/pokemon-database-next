import Api from '@/services/api'
import { Berry } from '@/types'

class BerryService {
  static async getAll() {
    const response = await Api.berry.listBerries(0, 64)
    return response.results.map(berry => berry.name)
  }
  static async getByNames(names: Array<string>) {
    const requests = names.map(name => Api.berry.getBerryByName(name))
    const responses = await Promise.all(requests)
    return responses as Berry[]
  }
  static async getByName(name: string) {
    const response = await Api.berry.getBerryByName(name)
    return response as Berry
  }
}

export default BerryService
