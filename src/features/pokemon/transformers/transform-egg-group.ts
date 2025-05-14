import type { EggGroup } from '@/types'
import filterGens from '@/utils/filterGens'

export const transformEggGroup = (data: EggGroup) => {
  const { name, pokemon_species, id } = data
  const filteredSpecies = pokemon_species.filter(species => {
    const { url } = species
    return filterGens(url)
  })
  return {
    name,
    id,
    pokemonSpecies: filteredSpecies,
  }
}

export default transformEggGroup
