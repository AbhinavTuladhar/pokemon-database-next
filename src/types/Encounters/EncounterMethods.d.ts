import { Name } from '../utils/Common'

export interface EncounterMethod {
  id: number
  name: string
  order: number
  names: Array<Name>
}
