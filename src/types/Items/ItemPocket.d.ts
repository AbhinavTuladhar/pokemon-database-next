import { NamedApiResource } from '../utils/NamedResource'

import { ItemCategory } from './ItemCategory'

export interface ItemPocket {
  id: number
  name: string
  categories: Array<NamedApiResource<ItemCategory>>
}
