import {
  gameNameToGenerationMap,
  gameNameToGenerationMapInternal,
} from '@/data/gameNameToGenerationMap'
import { Encounter, PokemonEncounter } from '@/types'

const DetailedEncounterExtractor = (data: Encounter) => {
  const { chance, condition_values, max_level, min_level, method } = data
  // Make a string for the level range.
  const conditionValuesNames = condition_values.map(value => value.name)
  return { min_level, max_level, chance, condition_values: conditionValuesNames, method }
}

interface AdditionalEncounterInfo {
  iconSprite: string
  pokemonName: string
  gameName: string
  generation: string
  generationInternal: string
}

interface ModifiedEncounter extends Omit<Encounter, 'condition_values'> {
  condition_values: Array<string>
}
interface ReducedEncounterInterface extends ModifiedEncounter, AdditionalEncounterInfo {}

const EncounterExtractor = (encounterData: PokemonEncounter) => {
  const {
    pokemon: { name: pokemonName, url: pokemonUrl },
    version_details,
  } = encounterData

  // To get the icon url
  const idNumber = parseInt(pokemonUrl.match(/\/(\d+)\/$/)![1])
  const iconSprite = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-vii/ultra-sun-ultra-moon/${idNumber}.png`

  const toReturn = version_details.map(row => {
    const {
      version: { name: gameName },
      encounter_details,
    } = row
    const generation = gameNameToGenerationMap[gameName]
    // This is to keep track of the remakes
    const generationInternal = gameNameToGenerationMapInternal[gameName]

    const extractedEncounterInformation = encounter_details.map(DetailedEncounterExtractor)

    return {
      iconSprite,
      pokemonName,
      gameName,
      generation,
      generationInternal,
      extractedEncounterInformation,
    }
  })

  // A flatmap to attach the pokemon name and game nome to each object in the array
  const expandedDetails = toReturn.flatMap(
    ({
      iconSprite,
      pokemonName,
      gameName,
      generation,
      generationInternal,
      extractedEncounterInformation,
    }) => {
      return extractedEncounterInformation.map(({ ...rest }) => ({
        iconSprite,
        pokemonName,
        gameName,
        generation,
        generationInternal,
        ...rest,
      }))
    },
  )

  // Now reduce the array of object to reduce them into more compact entries.
  // Reduction is done on the basis of the Pokemon name and name of the game.
  const reducedEncounterInformation = expandedDetails.reduce((acc, obj) => {
    const existingObject = acc.find(
      item =>
        obj.pokemonName === item.pokemonName &&
        obj.gameName === item.gameName &&
        obj.generation === item.generation,
      // obj.condition_values.sort().toString() === item.condition_values.sort().toString(),
    )

    // If there's a matching object, find the lower value of minimum level, higher value of maximum level and accumulate the encounter chance.
    if (existingObject) {
      existingObject.min_level = Math.min(existingObject.min_level, obj.min_level)
      existingObject.max_level = Math.max(existingObject.max_level, obj.max_level)
      existingObject.chance += obj.chance
    } else {
      acc.push({ ...obj })
    }
    return acc
  }, [] as ReducedEncounterInterface[])

  // Further, combine min level and max level
  return reducedEncounterInformation.map(pokemonEncounter => {
    const { min_level, max_level, condition_values } = pokemonEncounter
    const levelRange = min_level === max_level ? min_level : `${min_level}-${max_level}`
    const encounterConditionnames = condition_values.map(value => value)
    return { ...pokemonEncounter, levelRange, condition_values: encounterConditionnames }
  })
}

export default EncounterExtractor
