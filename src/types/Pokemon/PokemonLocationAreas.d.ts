import { LocationArea } from '../Locations/LocationAreas'
import { VersionEncounterDetail } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

export interface LocationAreaEncounter {
  location_area: NamedApiResource<LocationArea>
  version_details: Array<VersionEncounterDetail>
}
