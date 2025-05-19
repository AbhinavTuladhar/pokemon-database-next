import Api from '@/services/MainApi'

import { filterGens } from '../helpers/pokemon.helper'

class EggGroupService {
  static async getAll() {
    const response = await Api.pokemon.listEggGroups(0, 64)
    return response.results.map(group => group.name)
  }
  static async getByName(name: string) {
    const response = await Api.pokemon.getEggGroupByName(name)
    return response
  }
  static async getByNames(names: Array<string>) {
    const requests = names.map(name => Api.pokemon.getEggGroupByName(name))
    const responses = await Promise.all(requests)
    return responses.map(group => {
      const { pokemon_species } = group
      const reducedSpecies = pokemon_species.filter(species => {
        const { url } = species
        return filterGens(url)
      })
      return {
        ...group,
        pokemon_species: reducedSpecies,
      }
    })
  }
}

export default EggGroupService
