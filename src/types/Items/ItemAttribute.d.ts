import { Description, Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { Item } from './Item'

export interface ItemAttribute {
  id: number
  name: string
  items: NamedApiResource<Item>
  names: Array<Name>
  descriptions: Array<Description>
}
