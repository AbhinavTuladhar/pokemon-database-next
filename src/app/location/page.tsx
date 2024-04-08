import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import RegionExtractor from '@/extractors/RegionExtractor'
import { RegionApi } from '@/services/LocationApi'
import { NamedApiResource } from '@/types'

import RegionTabs from './_components/RegionTabs'

export const metadata: Metadata = {
  title: 'Pokémon locations | Pokémon Database',
}

const getRegionData = async (urls: Array<string>) => {
  const responses = await RegionApi.getAll(urls)
  return responses.map(RegionExtractor)
}

const formatLocation = (location: NamedApiResource<Location>) => {
  const { name: locationName, url: actualUrl } = location
  const localUrl = `/location/${locationName}`
  const filteredRoute = locationName.match(/(route-.+)/)
  const properLocationName = filteredRoute !== null ? filteredRoute[1] : locationName
  return { locationName: properLocationName, actualUrl, localUrl }
}

const formatRegionResponse = (data: Awaited<ReturnType<typeof getRegionData>>) => {
  return data.map((region) => {
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
  const locationUrls = Array.from(
    { length: 7 },
    (_, index) => `https://pokeapi.co/api/v2/region/${index + 1}`,
  )

  const data = await getRegionData(locationUrls)
  const regionData = formatRegionResponse(data)

  return (
    <main>
      <PageTitle>Pokémon Locations</PageTitle>
      <RegionTabs regionData={regionData} />
    </main>
  )
}

export default LocationList
