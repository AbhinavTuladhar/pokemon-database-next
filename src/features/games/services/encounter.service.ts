import Api from '@/services/api'
import { EncounterMethod, LocationAreaEncounter } from '@/types'

class EncounterService {
  static async getById(id: number) {
    const response = await Api.pokemon.getPokemonLocationAreaById(id)
    return response as LocationAreaEncounter[]
  }
  static async getAllMethodDescriptions() {
    const listResponse = await Api.encounter.listEncounterMethods(0, 31)
    const methodNames = listResponse.results.map(method => method.name)
    const requests = methodNames.map(name => Api.encounter.getEncounterMethodByName(name))
    const responses = await Promise.all(requests)
    return responses as EncounterMethod[]
  }
}

export default EncounterService
