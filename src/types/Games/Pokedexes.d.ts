import { Region } from '../Locations/Regions'
import { PokemonSpecies } from '../Pokemon/PokemonSpecies'
import { Description, Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { VersionGroup } from './VersionGroups'

export interface Pokedex {
  id: number
  name: string
  is_main_series: boolean
  descriptions: Array<Description>
  names: Array<Name>
  pokemon_entries: Array<PokemonEntry>
  region: NamedApiResource<Region>
  version_groups: Array<NamedApiResource<VersionGroup>>
}

interface PokemonEntry {
  entry_number: number
  pokemon_species: NamedApiResource<PokemonSpecies>
}
