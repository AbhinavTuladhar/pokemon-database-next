import Api from '@/services/MainApi'
import { Ability } from '@/types'

class AbilityService {
  static async getAllNames() {
    const response = await Api.pokemon.listAbilities(0, 233)
    const namesList = response.results.map(ability => ability.name)
    return namesList
  }
  static async getByName(name: string) {
    const response = await Api.pokemon.getAbilityByName(name)
    return response as unknown as Ability
  }
  static async getByNames(names: Array<string>) {
    const requests = names.map(name => Api.pokemon.getAbilityByName(name))
    const responses = await Promise.all(requests)
    return responses as unknown as Ability[]
  }
}

export default AbilityService
