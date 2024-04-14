import { Effect } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { Item } from './Item'

export interface ItemFlingEffect {
  id: number
  name: string
  effect_entries: Array<Effect>
  items: Array<NamedApiResource<Item>>
}
