import { NamedApiResource } from '../utils/NamedResource'
import { Name } from '../utils/Common'
import { Berry } from './Berry'

export interface BerryFirmness {
  id: number
  name: string
  berries: Array<NamedApiResource<Berry>>
  names: Array<Name>
}
