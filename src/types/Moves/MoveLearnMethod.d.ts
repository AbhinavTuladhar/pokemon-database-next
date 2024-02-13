import { VersionGroup } from "../Games/VersionGroups";
import { Description, Name } from "../utils/Common";
import { NamedApiResource } from "../utils/NamedResource";

export interface MoveLearnMethods {
  id: number,
  name: string,
  descriptions: Array<Description>
  names: Array<Name>
  version_groups: NamedApiResource<VersionGroup>
}