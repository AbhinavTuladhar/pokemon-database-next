import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { EncounterConditionValue } from './EncounterConditionValues'

export interface EncounterCondition {
  id: number
  name: string
  name: Array<Name>
  values: Array<NamedApiResource<EncounterConditionValue>>
}
