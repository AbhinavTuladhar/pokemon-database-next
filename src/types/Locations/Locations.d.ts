import { GenerationGameIndex, Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { TODO } from '../utils/TODO'
import { Region } from './Regions'

export interface Location {
  id: number
  name: string
  region: NamedApiResource<Region>
  names: Array<Name>
  game_indices: Array<GenerationGameIndex>
  areas: Array<NamedApiResource<TODO>> // Location Area
}
