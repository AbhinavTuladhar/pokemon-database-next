import { FC } from 'react'

import SectionTitle from '@/components/containers/SectionTitle'
import TableCell from '@/components/containers/TableCell'
import TableCellHeader from '@/components/containers/TableCellHeader'
import TableRow from '@/components/containers/TableRow'
import { EncountersApi } from '@/services/EncountersApi'
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
        versionName: formatFields(versionName),
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
  const locationData = await EncountersApi.getById(id)
  const locationsAndVersions = findLocationsAndVersions(locationData)
  const groupedByGame = groupByGame(locationsAndVersions)
  const groupedByLocations = groupByLocation(groupedByGame)
  return groupedByLocations
}

interface LocationsProps {
  id: number
  name: string
}

const Locations: FC<LocationsProps> = async ({ id, name }) => {
  const locationData = await getLocationData(id)

  // some formatting of the data
  const preFinalTable = locationData?.map(entry => {
    const listItems = entry.versionName.map((version, index) => {
      return <li key={index}> {version} </li>
    })
    const gameList = <ul className="list-inside list-none"> {listItems} </ul>
    return { versionName: gameList, locationName: entry.locationName }
  })

  // Now render the final data.
  const finalTable = preFinalTable?.map((row, rowIndex) => {
    return (
      <TableRow key={rowIndex}>
        <TableCellHeader type="row">{row.versionName}</TableCellHeader>
        <TableCell>{row.locationName}</TableCell>
      </TableRow>
    )
  })

  // If there is no encounter data, then nothing is rendered.
  return (
    <>
      <SectionTitle>{`Where to find ${formatName(name)}`}</SectionTitle>
      {finalTable.length > 0 ? (
        <div className="table w-full border-b border-gray-200">
          <tbody>{finalTable}</tbody>
        </div>
      ) : (
        <p> No locations were found. </p>
      )}
    </>
  )
}

export default Locations
