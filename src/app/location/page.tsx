import { Metadata } from 'next'

import { PageTitle } from '@/components/ui/Title'
import { RegionApi } from '@/features/games/services/location.service'
import { transformRegion } from '@/features/games/transformers/transform-region'
import { NamedApiResource } from '@/types'

import { IconKeys, RegionTabs } from './_components'

export const metadata: Metadata = {
  title: 'Pokémon locations | Pokémon Database',
}

const getRegionData = async (ids: Array<number>) => {
  const responses = await RegionApi.getByIds(ids)
  return responses.map(transformRegion)
}

const formatLocation = (location: NamedApiResource<Location>) => {
  const { name: locationName, url: actualUrl } = location
  const localUrl = `/location/${locationName}`
  const filteredRoute = locationName.match(/(route-.+)/)
  const properLocationName = filteredRoute !== null ? filteredRoute[1] : locationName
  return { locationName: properLocationName, actualUrl, localUrl }
}

const formatRegionResponse = (data: Awaited<ReturnType<typeof getRegionData>>) => {
  return data.map(region => {
    const { locations, regionName } = region
    const newLocations = locations.map(formatLocation).sort((prev, curr) =>
      prev.locationName.localeCompare(curr.locationName, undefined, {
        numeric: true,
        sensitivity: 'base',
      }),
    )

    return { regionName, locations: newLocations }
  })
}

const LocationList = async () => {
  const locationIds = Array.from({ length: 7 }, (_, index) => index + 1)

  const data = await getRegionData(locationIds)
  const regionData = formatRegionResponse(data)

  return (
    <>
      <PageTitle>Pokémon Locations</PageTitle>
      <RegionTabs regionData={regionData} />
      <IconKeys />
    </>
  )
}

export default LocationList
