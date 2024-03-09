import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { TODO } from '../utils/TODO'

import { Berry } from './Berry'

export interface BerryFlavour {
  id: number
  name: string
  berries: Array<FlavourBerryMap>
  contest_type: NamedApiResource<TODO>
  names: Array<Name>
}

interface FlavourBerryMap {
  potency: number
  berry: NamedApiResource<Berry>
}
