import { Description, Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { Move } from './Moves'

export interface MoveTarget {
  id: number
  name: string
  descriptions: Array<Description>
  moves: Array<NamedApiResource<Move>>
  names: Array<Name>
}
