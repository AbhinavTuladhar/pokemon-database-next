import { PokemonAnalysis, PokemonSet } from '@/types'

export const SmogonApi = {
  getAnalysis: async function (formatCode: string) {
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
  },
  getSets: async function (formatCode: string) {
    try {
      const response = await fetch(`https://pkmn.github.io/smogon/data/sets/${formatCode}.json`, {
        cache: 'force-cache',
      })
      const data = (await response.json()) as PokemonSet
      return data
    } catch (error) {
      console.error(error)
    }
  },
}
