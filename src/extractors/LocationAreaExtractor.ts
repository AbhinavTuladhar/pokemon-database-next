import { GroupedLocationArea, LocationArea, Name } from '@/types'

import EncounterExtractor from './EncounterExtractor'

const LocationAreaExtractor = (locationAreaData: LocationArea) => {
  const { names, pokemon_encounters, name } = locationAreaData
  // For getting the 'proper' sub location name. Some locations don't have a proper English name,
  // so we use the raw name as a fallback.
  const properLocationAreaName =
    (names.find((name) => name.language.name === 'en') as Name)?.name || name
  // Use a flat map to convert the array of array of objects to just an array of objects.
  const encounterDetails = pokemon_encounters.map(EncounterExtractor).flatMap((row) => row)

  // Group the encounter information on the basis of the game names.
  const groupedEncounterDetailsByGame = encounterDetails.reduce((acc, encounter) => {
    const {
      chance,
      gameName,
      generationInternal,
      levelRange,
      method: { name: methodName },
      pokemonName,
    } = encounter
    const foundEncounter = acc.find(
      (obj) =>
        obj.chance === chance &&
        obj.generationInternal === generationInternal &&
        obj.levelRange === levelRange &&
        obj.method.name === methodName &&
        obj.pokemonName === pokemonName,
    )
    if (foundEncounter) {
      foundEncounter.gameName.push(gameName)
    } else {
      acc.push({ ...encounter, gameName: [gameName] })
    }
    return acc
  }, [] as GroupedLocationArea[])

  // console.log('goupred encounter details by game is')
  // console.log(groupedEncounterDetailsByGame)

  return {
    subLocationName: properLocationAreaName,
    encounterDetails: groupedEncounterDetailsByGame,
  }
}

export default LocationAreaExtractor
