import Api from '@/services/api'
import { Pokemon, PokemonForm } from '@/types'

class PokemonService {
  static async getByName(name: string) {
    const response = await Api.pokemon.getPokemonByName(name)
    return response as unknown as Pokemon
  }
  static async getByNames(names: Array<string>) {
    const fetchRequests = names.map(pokemon => Api.pokemon.getPokemonByName(pokemon))
    const responses = await Promise.all(fetchRequests)
    return responses as Pokemon[]
  }
  static async getByIds(ids: Array<number>) {
    const fetchRequests = ids.map(id => Api.pokemon.getPokemonById(id))
    const responses = await Promise.all(fetchRequests)
    return responses as Pokemon[]
  }
  static async getByOffsetAndLimit(offset: number, limit: number) {
    const response = await Api.pokemon.listPokemons(offset, limit)
    return response
  }
  static async getFormsByIds(numbers: Array<string>) {
    const requests = numbers.map(id => Api.pokemon.getPokemonFormById(+id))
    const responses = await Promise.all(requests)
    return responses as PokemonForm[]
  }
}

export default PokemonService
