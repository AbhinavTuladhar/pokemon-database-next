import { Location } from '@/types'

export const transformLocation = (locationData: Location) => {
  const { areas, name: locationName } = locationData
  return { subLocations: areas, locationName }
}
