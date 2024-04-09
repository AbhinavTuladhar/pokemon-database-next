import { EncounterMethod } from '../Encounters/EncounterMethods'
import { Version } from '../Games/Version'
import { Pokemon } from '../Pokemon/Pokemon'
import { Name, VersionEncounterDetail } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { Location } from './Locations'

export interface LocationArea {
  id: number
  name: string
  game_index: number
  encounter_method_rates: Array<EncounterMethodRate>
  location: NamedApiResource<Location>
  names: Array<Name>
  pokemon_encounters: Array<PokemonEncounter>
}

interface EncounterMethodRate {
  encounter_method: NamedApiResource<EncounterMethod>
  version_Details: Array<EncounterVersionDetails>
}

interface EncounterVersionDetails {
  rate: number
  version: NamedApiResource<Version>
}

interface PokemonEncounter {
  pokemon: NamedApiResource<Pokemon>
  version_details: Array<VersionEncounterDetail>
}
