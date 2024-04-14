import { NamedApiResource } from '../utils/NamedResource'

import { ItemPocket } from './ItemPocket'

export interface ItemCategory {
  id: number
  name: string
  items: NamedApiResource<Name>
  names: Array<Name>
  pocket: NamedApiResource<ItemPocket>
}
