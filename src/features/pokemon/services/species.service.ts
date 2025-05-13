import Api from '@/services/MainApi'
import { PokemonSpecies } from '@/types'

class SpeciesService {
  static async getById(id: number) {
    const response = await Api.pokemon.getPokemonSpeciesById(id)
    return response as unknown as PokemonSpecies
  }
  static async getByIds(ids: Array<number>) {
    const requests = ids.map(id => Api.pokemon.getPokemonSpeciesById(id))
    const responses = await Promise.all(requests)
    return responses as unknown as PokemonSpecies[]
  }
}

export default SpeciesService
