import Api from '@/services/MainApi'
import { Type } from '@/types'

class TypesService {
  static async getByNames(names: Array<string>) {
    const requests = names.map(name => Api.pokemon.getTypeByName(name))
    const responses = await Promise.all(requests)
    return responses as Type[]
  }
  static async getByName(name: string) {
    const response = await Api.pokemon.getTypeByName(name)
    return response as Type
  }
  static async getAll() {
    const response = await Api.pokemon.listTypes(0, 15)
    return response.results.map(type => type.name)
  }
}

export default TypesService
