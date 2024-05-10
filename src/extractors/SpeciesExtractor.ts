import { gameBlackLists } from '@/data/blacklists'
import { gameNameToGenerationMapInternal } from '@/data/gameNameToGenerationMap'
import { Genus, PokemonSpecies } from '@/types'

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
    habitat,
    hatch_counter,
    id,
    names,
    pokedex_numbers,
    varieties,
    color: { name: colour },
    shape: { name: shape },
    form_descriptions,
  } = data

  // Find only the English genus name of the 'mon.
  const englishGenus = genera.find(entry => entry.language.name === 'en') as Genus
  const hatibatName = habitat?.name ?? ''

  const formDescriptions = form_descriptions.length > 0 ? form_descriptions[0].description : ''

  // Dealing with the pokedex entries
  const englishEntries = flavor_text_entries.filter(entry => {
    const {
      language: { name: languageName },
      version: { name: versionName },
    } = entry
    return languageName === 'en' && !gameBlackLists.includes(versionName)
  })

  // Find an object containing the version anme and the Pokedex entry.
  const englishInfo = englishEntries.map(entry => {
    const rawText = entry.flavor_text as string
    // This 'removes' the escape characters in the Pokedex entry. However, the escape characters are placed in very inconsitent places, so the text looks weird.
    const cleanedStr = rawText.replace(/\f/g, ' ').replace(/\n/g, ' ')
    const versionName = entry.version.name
    return {
      versionName,
      description: cleanedStr,
      generationInternal: gameNameToGenerationMapInternal[versionName],
    }
  })

  return {
    base_happiness,
    capture_rate,
    egg_groups,
    evolutionChainUrl,
    flavor_text_entries: englishInfo,
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
    colour,
    shape,
    formDescriptions,
    habitat: hatibatName,
  }
}

export default SpeciesExtractor
