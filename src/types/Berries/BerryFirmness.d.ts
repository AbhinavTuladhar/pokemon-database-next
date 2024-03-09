import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { Berry } from './Berry'

export interface BerryFirmness {
  id: number
  name: string
  berries: Array<NamedApiResource<Berry>>
  names: Array<Name>
}
