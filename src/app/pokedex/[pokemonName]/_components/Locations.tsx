import { FC } from 'react'

import GameWiseDescriptions from '@/components/game-wise-descriptions'
import { SectionTitle } from '@/components/ui/Title'
import EncounterService from '@/features/games/services/encounter.service'
import { LocationAreaEncounter } from '@/types'
import formatName from '@/utils/formatName'

interface LocationAndVersion {
  versionName: string
  locationName: string
}

interface EncountersByLocation {
  versionName: Array<string>
  locationName: string
}

const formatFields = (data: string) => {
  const newData = data.endsWith('area') ? data.replace('area', '') : data
  const wordList = newData.split('-')
  // Omit the region if it occurs.
  const wordListNew = wordList.includes('route') ? wordList.slice(1) : wordList
  // Capitalise the first letter of each word.
  const formattedWords = wordListNew.map(word => word.charAt(0).toUpperCase() + word.slice(1))
  // Now join them with spaces.
  return formattedWords.join(' ')
}

// Getting the location and version names.
const findLocationsAndVersions = (data: Array<LocationAreaEncounter>) => {
  const information = data.flatMap(encounter => {
    const {
      location_area: { name: locationName },
      version_details: encounterList,
    } = encounter
    const encounterData = encounterList?.map(version => {
      const {
        version: { name: versionName },
      } = version
      return {
        locationName: formatFields(locationName).trim(),
        versionName,
      }
    })
    return encounterData
  })
  return information
}

/*
For grouping the locations by games.
So, if a Pokemon can be found in multiple locations in the same game, they are grouped together, separated by commas
Platinum - route 201
Platinum - route 202
Becomes
Platinum - route 201, route 202
*/
const groupByGame = (data: Array<LocationAndVersion>) => {
  const info = data?.reduce((acc, current) => {
    const { versionName } = current
    const index = acc.findIndex(item => item.versionName === versionName)
    if (index !== -1) {
      acc[index].locationName += `, ${current.locationName}`
    } else {
      acc.push({
        versionName: current.versionName,
        locationName: current.locationName,
      })
    }
    return acc
  }, [] as Array<LocationAndVersion>)
  return info
}

const groupByLocation = (data: Array<LocationAndVersion>) => {
  const info = data.reduce((acc, current) => {
    const { locationName } = current
    const index = acc.findIndex(item => item.locationName === locationName)
    if (index !== -1) {
      acc[index].versionName.push(current.versionName)
    } else {
      acc.push({
        versionName: [current.versionName],
        locationName: current.locationName,
      })
    }
    return acc
  }, [] as Array<EncountersByLocation>)
  return info
}

const getLocationData = async (id: number) => {
  const locationData = await EncounterService.getById(id)
  const locationsAndVersions = findLocationsAndVersions(locationData)
  const groupedByGame = groupByGame(locationsAndVersions)
  const groupedByLocations = groupByLocation(groupedByGame)
  return groupedByLocations
}

interface LocationsProps {
  id: number
  name: string
}

export const Locations: FC<LocationsProps> = async ({ id, name }) => {
  const locationData = await getLocationData(id)

  const finalLocationData = locationData.map(entry => {
    const { locationName, versionName } = entry
    return { description: locationName, versionGroupNames: versionName }
  })

  // If there is no encounter data, then nothing is rendered.
  return (
    <>
      <SectionTitle>{`Where to find ${formatName(name)}`}</SectionTitle>
      {locationData.length > 0 ? (
        <GameWiseDescriptions descriptionData={finalLocationData} />
      ) : (
        <p> No locations were found. </p>
      )}
    </>
  )
}
