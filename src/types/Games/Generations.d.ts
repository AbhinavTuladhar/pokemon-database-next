import { Region } from '../Locations/Regions'
import { Move } from '../Moves/Moves'
import { Ability } from '../Pokemon/Abilities'
import { PokemonSpecies } from '../Pokemon/PokemonSpecies'
import { Type } from '../Pokemon/Types'
import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { VersionGroup } from './VersionGroups'

export interface Generation {
  id: number
  name: string
  abilities: Array<NamedApiResource<Ability>>
  names: Array<Name>
  main_region: NamedApiResource<Region>
  moves: Array<NamedApiResource<Move>>
  pokemon_species: Array<NamedApiResource<PokemonSpecies>>
  types: Array<NamedApiResource<Type>>
  version_groups: Array<NamedApiResource<VersionGroup>>
}
