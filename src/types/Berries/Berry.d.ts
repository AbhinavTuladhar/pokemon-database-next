import { Item } from '../Items/Item'
import { Type } from '../Pokemon/Types'
import { NamedApiResource } from '../utils/NamedResource'
import { BerryFirmness } from './BerryFirmness'
import { BerryFlavour } from './BerryFlavour'

export interface Berry {
  id: number
  name: string
  growth_time: number
  max_harvest: number
  natural_gift_power: number
  size: number
  smoothness: number
  soil_dryness: number
  firmness: NamedApiResource<BerryFirmness>
  flavors: Array<BerryFlavourMap>
  item: NamedApiResource<Item>
  natural_gift_type: NamedApiResource<Type>
}

export interface BerryFlavourMap {
  potency: number
  flavor: NamedApiResource<BerryFlavour>
}
