import { VersionGroup } from '../Games/VersionGroups'
import { Item } from '../Items/Item'
import { Move } from '../Moves/Moves'
import { NamedApiResource } from '../utils/NamedResource'

export interface Machine {
  id: number
  item: NamedApiResource<Item>
  move: NamedApiResource<Move>
  version_group: NamedApiResource<VersionGroup>
}
