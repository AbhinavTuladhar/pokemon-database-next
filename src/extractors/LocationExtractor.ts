import { Location } from '@/types'

const LocationExtractor = (locationData: Location) => {
  const { areas, name: locationName } = locationData
  return { subLocations: areas, locationName }
}

export default LocationExtractor
