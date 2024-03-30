import type { EggGroup } from '@/types'
import filterGens from '@/utils/filterGens'
import stringifyUrl from '@/utils/stringifyUrl'

const EggGroupExtractor = (data: EggGroup) => {
  const { name, pokemon_species, id } = data
  const filteredSpecies = pokemon_species.filter((species) => {
    const { url } = species
    return filterGens(url)
  })
  // .map((species) => {
  //   const { name, url } = species
  //   const trueUrl = stringifyUrl(url, name)
  //   return {
  //     name,
  //     url: trueUrl,
  //   }
  // })
  return {
    name,
    id,
    pokemonSpecies: filteredSpecies,
  }
}

export default EggGroupExtractor
