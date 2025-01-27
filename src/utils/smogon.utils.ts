import { PokemonAnalysis, PokemonSet } from '@/types'

/**
 * Returns the generation number and format name on the basis of the given format code.
 */
export const extractParts = (formatCode: string) => {
  const match = formatCode.match(/gen(\d)([a-z]+)/i)
  if (!match) {
    return {
      generation: 0,
      format: '',
    }
  }

  return {
    generation: parseInt(match[1]),
    format: match[2],
  }
}

/**
 * Get the analysis data for the given pokemon from the mega object
 */
export const findPokemonAnalysis = (analysisData: PokemonAnalysis, pokemonName: string) => {
  const pokemonKey = pokemonName.toLowerCase()
  const foundKey = Object.keys(analysisData).find(key => key.toLowerCase() === pokemonKey)
  return foundKey ? analysisData[foundKey] : null
}

/**
 * Get the sets data for the given pokemon from the mega object
 */
export const findPokemonSets = (analysisData: PokemonSet, pokemonName: string) => {
  const pokemonKey = pokemonName.toLowerCase()
  const foundKey = Object.keys(analysisData).find(key => key.toLowerCase() === pokemonKey)
  return foundKey ? analysisData[foundKey] : null
}
