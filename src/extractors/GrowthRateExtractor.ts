import { GrowthRate, GrowthRateExperienceLevel } from '@/types'
import filterGens from '@/utils/filterGens'

export const GrowthRateExtractor = (data: GrowthRate) => {
  const { formula, levels, name, pokemon_species } = data

  // For finding out the experience required to gain that level
  const experienceDifferences: GrowthRateExperienceLevel[] = [{ level: 1, experience: 0 }]
  for (let i = 0; i < levels.length - 1; i++) {
    const difference = levels[i + 1].experience - levels[i].experience
    experienceDifferences.push({ level: levels[i + 1].level, experience: difference })
  }

  // Filter out pokemon after generation 7.
  const filteredPokemonSpecies = pokemon_species
    .filter(({ url }) => filterGens(url))
    .map(({ name }) => name)

  return {
    formula: `EXP = ${formula}`,
    levels,
    name,
    individualLevels: experienceDifferences,
    pokemonSpecies: filteredPokemonSpecies,
  }
}

export default GrowthRateExtractor
