import { FlavourText } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

export interface SuperContestEffect {
  id: number
  appeal: number
  flavor_text_entries: Array<FlavourText>
  moves: Array<NamedApiResource<Move>>
}
