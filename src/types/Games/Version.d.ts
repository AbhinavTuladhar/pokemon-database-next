import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { TODO } from '../utils/TODO'

export interface Version {
  id: number
  name: string
  names: Array<Name>
  version_group: NamedApiResource<TODO>
}
