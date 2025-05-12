import Api from './MainApi'

export const PokedexApi = {
  getPokedexData: async function (pokedex: string) {
    const response = await Api.game.getPokedexByName(pokedex)
    return response.pokemon_entries
  },
}
