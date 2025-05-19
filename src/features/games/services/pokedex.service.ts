import Api from '@/services/api'

class PokedexService {
  static async getPokedexData(pokedex: string) {
    const response = await Api.game.getPokedexByName(pokedex)
    return response.pokemon_entries
  }
}

export default PokedexService
