import { Currency } from '../Currencies/Currencies'
import { VersionGroup } from '../Games/VersionGroups'
import { NamedApiResource } from '../utils/NamedResource'

export interface ItemPrice {
  currency: NamedApiResource<Currency>
  purchase_price: number
  sell_price: number
  version_group: NamedApiResource<VersionGroup>
}
