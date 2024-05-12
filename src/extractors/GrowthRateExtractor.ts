import { GrowthRate } from '@/types'
import filterGens from '@/utils/filterGens'

const GrowthRateExtractor = (data: GrowthRate) => {
  const { formula, levels, name, pokemon_species } = data

  // For storing the cumulative sum of the experience value
  let cumulativeSum = 0

  const levelsCumulative = levels.map(({ level, experience }) => {
    cumulativeSum += experience
    return { level, experience: cumulativeSum }
  })

  // Filter out pokemon after generation 7.
  const filteredPokemonSpecies = pokemon_species
    .filter(({ url }) => filterGens(url))
    .map(({ name }) => name)

  return {
    formula,
    levels,
    name,
    levelsCumulative,
    pokemonSpecies: filteredPokemonSpecies,
  }
}

export default GrowthRateExtractor
