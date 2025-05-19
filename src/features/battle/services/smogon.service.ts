import { PokemonAnalysis, PokemonSet } from '@/types'

class SmogonService {
  static async getAnalysis(formatCode: string) {
    try {
      const response = await fetch(
        `https://pkmn.github.io/smogon/data/analyses/${formatCode}.json`,
        {
          cache: 'force-cache',
        },
      )
      const data = (await response.json()) as PokemonAnalysis
      return data
    } catch (error) {
      console.error(error)
    }
  }

  static async getSets(formatCode: string) {
    try {
      const response = await fetch(`https://pkmn.github.io/smogon/data/sets/${formatCode}.json`, {
        cache: 'force-cache',
      })
      const data = (await response.json()) as PokemonSet
      return data
    } catch (error) {
      console.error(error)
    }
  }
}

export default SmogonService
