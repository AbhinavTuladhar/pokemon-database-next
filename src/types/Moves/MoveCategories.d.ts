import { Description } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { Move } from './Moves'

export interface MoveCategory {
  id: number
  name: string
  moves: Array<NamedApiResource<Move>>
  descriptions: Array<Description>
}
