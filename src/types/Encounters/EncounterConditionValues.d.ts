import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { EncounterCondition } from './EncounterConditions'

export interface EncounterConditionValue {
  id: number
  name: string
  condition: NamedApiResource<EncounterCondition>
  names: Array<Name>
}
