import { NamedApiResource } from '../utils/NamedResource'
import { TODO } from '../utils/TODO'
import { Version } from './Version'

export interface VersionGroup {
  id: number
  name: string
  order: number
  generation: NamedApiResource<TODO>
  move_learn_methods: Array<NamedApiResource<TODO>>
  pokedexes: Array<NamedApiResource<TODO>>
  regions: Array<NamedApiResource<TODO>>
  versions: Array<NamedApiResource<Version>>
}
