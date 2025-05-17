import { numberMapper } from '@/data/number.data'
import { versionToGeneration } from '@/features/games/data/game-generation.data'
import { Ability, VerboseEffect } from '@/types'
import { isGen1to7 } from '@/utils/pokemonUtils'
import { getResourceId } from '@/utils/urlUtils'

export const transformAbility = (data: Ability) => {
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
      versionGroupName: entry.version_group.name,
      generation: versionToGeneration[entry.version_group.name],
    }))

  const pokemonList = pokemon
    .filter(pokemon => {
      const { url } = pokemon.pokemon
      const pokemonId = getResourceId(url)
      return isGen1to7(parseInt(pokemonId))
    })
    .map(pokemon => pokemon.pokemon.name)

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
    pokemon: pokemonList,
    pokemonCount: pokemonList.length,
    names,
  }
}
