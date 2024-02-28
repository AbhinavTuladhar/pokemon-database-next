import gameToGenerationMap from '@/data/gameToGenerationMap'
import numberMapper from '@/data/numberMapper'
import { Move, NamedApiResource } from '@/types'
import { VerboseEffect } from '@/types/utils/Common'

const MoveExtractor = (move: Move) => {
  const {
    accuracy,
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

  // Find all the English etnries.
  const englishDescriptions = flavor_text_entries
    .filter((entry) => entry.language.name === 'en')
    .map((version) => ({
      description: version.flavor_text,
      version: version.version_group.name,
      generation: gameToGenerationMap[version.version_group.name],
    }))

  // Find the English effect entry.
  const englishEffect = effect_entries.find(
    (entry) => entry.language.name === 'en',
  ) as VerboseEffect

  // Separate the long and short entries.
  const longEntry = englishEffect.effect
  const shortEntry = englishEffect.short_effect

  // Find the URLs of all the Pokemon that can learn the move.
  const pokemonUrls: Array<NamedApiResource<Move>> = learned_by_pokemon.map((pokemon) => {
    const { name, url } = pokemon
    const replacedUrl = url.replace(/\/pokemon\/\d+\//, `/pokemon/${name}/`)
    return { name, url: replacedUrl }
  })

  // Dealing with keys which might have null values.
  const realAccuracy = accuracy === null ? '-' : accuracy
  const realPower = power === null ? '-' : power
  const realEffectChance = effect_chance === null ? '-' : effect_chance

  const [generationString, generationNumber] = generation.split('-')
  const newGenerationString = generationString.charAt(0).toUpperCase() + generationString.slice(1)
  const generationIntroduced = `${newGenerationString} ${numberMapper[generationNumber]}`

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
    machines,
    pokemonUrls,
  }
}

export default MoveExtractor
