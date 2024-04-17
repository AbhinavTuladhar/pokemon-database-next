import gameToGenerationMap from '@/data/gameToGenerationMap'
import numberMapper from '@/data/numberMapper'
import { Ability, VerboseEffect } from '@/types'

const AbilityExtractor = (data: Ability) => {
  const {
    effect_entries,
    flavor_text_entries,
    generation: { name: generationIntroducedRaw },
    id,
    name,
    pokemon,
    names,
  } = data

  // Find the English long and short entries.
  const englishDescEntries = effect_entries.find(
    entry => entry.language.name === 'en',
  ) as VerboseEffect
  const { short_effect: shortEntry, effect: longEntry } = englishDescEntries

  // Find the version-wise descriptions
  const descriptions = flavor_text_entries
    .filter(entry => entry.language.name === 'en')
    .map(entry => ({
      description: entry.flavor_text,
      versionName: entry.version_group.name,
      generation: gameToGenerationMap[entry.version_group.name],
    }))

  // The number of Pokemon that have the ability.
  const pokemonCount = pokemon.length

  const pokemonList = pokemon.map(pokemon => pokemon.pokemon.name)

  const [generationString, generationNumber] = generationIntroducedRaw.split('-')
  const newGenerationString = generationString.charAt(0).toUpperCase() + generationString.slice(1)
  const generationIntroduced = `${newGenerationString} ${numberMapper[generationNumber]}`

  return {
    shortEntry,
    longEntry,
    descriptions,
    generationIntroduced: generationIntroduced,
    id,
    name,
    pokemonCount,
    pokemon: pokemonList,
    names,
  }
}

export default AbilityExtractor
