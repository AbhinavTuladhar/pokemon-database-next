import gameToGenerationMap from '@/data/gameToGenerationMap'
import numberMapper from '@/data/numberMapper'
import { Move, NamedApiResource } from '@/types'
import { VerboseEffect } from '@/types/utils/Common'
import { getResourceId } from '@/utils/urlUtils'

import { isGen1to7 } from '../utils/pokemonUtils'

export const MoveExtractor = (move: Move) => {
  const {
    accuracy,
    contest_effect,
    contest_type,
    damage_class: { name: damageClass },
    effect_chance,
    effect_entries,
    flavor_text_entries,
    generation: { name: generation },
    learned_by_pokemon,
    meta: {
      ailment: { name: ailmentName },
      ailment_chance: ailmentChance,
      crit_rate: critRate,
      drain,
      flinch_chance: flinchChance,
      category: { name: moveCategory },
      stat_chance: statChance,
    },
    id,
    machines,
    name: moveName,
    names,
    power,
    pp: PP,
    priority,
    target: { name: targetType },
    type: { name: moveType },
  } = move

  const contestEffectUrl = contest_effect?.url as string | undefined
  const contestTypeName = contest_type?.name

  const contestEffectId = contestEffectUrl
    ? parseInt(contestEffectUrl.match(/\/(\d+)\/$/)![1])
    : null

  // Find all the English etnries.
  const englishDescriptions = flavor_text_entries
    .filter(entry => entry.language.name === 'en')
    .map(version => ({
      description: version.flavor_text,
      versionGroupName: version.version_group.name,
      generation: gameToGenerationMap[version.version_group.name],
    }))

  // Find the English effect entry.
  const englishEffect = effect_entries.find(entry => entry.language.name === 'en') as VerboseEffect

  // Separate the long and short entries.
  const longEntry = englishEffect?.effect
  const shortEntry = englishEffect?.short_effect

  // Find the URLs of all the Pokemon that can learn the move.
  const pokemonUrls: Array<NamedApiResource<Move>> = learned_by_pokemon.map(pokemon => {
    const { name, url } = pokemon
    const replacedUrl = url.replace(/\/pokemon\/\d+\//, `/pokemon/${name}/`)
    return { name, url: replacedUrl }
  })

  // Find the names of all the Pokemon that can learn the move fom gen 1 to 7 only.
  const pokemon = learned_by_pokemon
    .filter(pokemon => {
      const { url } = pokemon
      const resourceId = parseInt(getResourceId(url))
      return isGen1to7(resourceId)
    })
    .map(({ name }) => name)

  // Dealing with keys which might have null values.
  const realAccuracy = shortEntry.includes('Never miss') ? Infinity : (accuracy ?? 0)
  const realPower = power ?? 0
  const realEffectChance = effect_chance ?? '-'

  const [generationString, generationNumber] = generation.split('-')
  const newGenerationString = generationString.charAt(0).toUpperCase() + generationString.slice(1)
  const generationIntroduced = `${newGenerationString} ${numberMapper[generationNumber]}`

  // Filter out scarlet and violet tms from the machine list
  const filteredMachines = machines.filter(
    machine => machine.version_group.name !== 'scarlet-violet',
  )

  return {
    accuracy: realAccuracy,
    damageClass,
    effect_chance: realEffectChance,
    generationIntroduced,
    ailmentName,
    ailmentChance,
    critRate,
    drain,
    flinchChance,
    statChance,
    moveName,
    names,
    power: realPower,
    PP,
    priority,
    targetType,
    moveType,
    moveCategory,
    descriptions: englishDescriptions,
    longEntry,
    shortEntry,
    id,
    machines: filteredMachines,
    pokemonUrls,
    pokemon,
    contestTypeName,
    contestEffectId,
  }
}

export default MoveExtractor
