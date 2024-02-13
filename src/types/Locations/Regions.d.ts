import { Generation } from '../Games/Generations'
import { Pokedex } from '../Games/Pokedexes'
import { VersionGroup } from '../Games/VersionGroups'
import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

export interface Region {
  id: number
  locations: Array<NamedApiResource<Location>>
  name: string
  names: Array<Name>
  main_generation: NamedApiResource<Generation>
  pokedexes: NamedApiResource<Pokedex>
  version_groups: NamedApiResource<VersionGroup>
}
