import { ContestType } from '../Contests/ContestType'
import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { Berry } from './Berry'

export interface BerryFlavour {
  id: number
  name: string
  berries: Array<FlavourBerryMap>
  contest_type: NamedApiResource<ContestType>
  names: Array<Name>
}

interface FlavourBerryMap {
  potency: number
  berry: NamedApiResource<Berry>
}
