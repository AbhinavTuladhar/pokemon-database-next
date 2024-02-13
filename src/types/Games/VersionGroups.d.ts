import { Region } from '../Locations/Regions'
import { MoveLearnMethods } from '../Moves/MoveLearnMethod'
import { NamedApiResource } from '../utils/NamedResource'
import { Generation } from './Generations'
import { Pokedex } from './Pokedexes'
import { Version } from './Version'

export interface VersionGroup {
  id: number
  name: string
  order: number
  generation: NamedApiResource<Generation>
  move_learn_methods: Array<NamedApiResource<MoveLearnMethods>>
  pokedexes: Array<NamedApiResource<Pokedex>>
  regions: Array<NamedApiResource<Region>>
  versions: Array<NamedApiResource<Version>>
}
