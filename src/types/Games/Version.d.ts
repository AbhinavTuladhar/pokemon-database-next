import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { VersionGroup } from './VersionGroups'

export interface Version {
  id: number
  name: string
  names: Array<Name>
  version_group: NamedApiResource<VersionGroup>
}
