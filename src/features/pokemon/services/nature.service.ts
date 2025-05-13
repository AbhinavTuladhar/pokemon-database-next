import Api from '@/services/MainApi'
import { Nature } from '@/types'

class NatureService {
  static async getAllNames() {
    const response = await Api.pokemon.listNatures(0, 25)
    return response.results.map(nature => nature.name)
  }
  static async getByNames(names: Array<string>) {
    const requests = names.map(name => Api.pokemon.getNatureByName(name))
    const responses = await Promise.all(requests)
    return responses as Nature[]
  }
}

export default NatureService
