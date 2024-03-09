import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { Move } from './Moves'

export interface MoveAilment {
  id: number
  name: string
  moves: Array<NamedApiResource<Move>>
  names: Array<Name>
}
