import { PokemonSpecies } from '@/types'

const SpeciesExtractor = (data: PokemonSpecies) => {
  const {
    base_happiness,
    capture_rate,
    egg_groups,
    evolution_chain: { url: evolutionChainUrl },
    flavor_text_entries,
    gender_rate,
    genera,
    generation: { name: generationIntroduced },
    growth_rate: { name: growthRateType },
    hatch_counter,
    id,
    names,
    pokedex_numbers,
    varieties,
  } = data

  // Find only the English genus name of the 'mon.
  const englishGenus = genera.find((entry) => entry.language.name === 'en')
  return {
    base_happiness,
    capture_rate,
    egg_groups,
    evolutionChainUrl,
    flavor_text_entries,
    gender_rate,
    generationIntroduced,
    genera,
    genus: englishGenus?.genus,
    growth_rate: growthRateType,
    hatch_counter,
    id,
    names,
    pokedex_numbers,
    varieties,
  }
}

export default SpeciesExtractor
