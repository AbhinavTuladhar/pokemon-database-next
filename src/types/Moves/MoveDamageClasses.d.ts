import { Description, Name } from "../utils/Common";
import { NamedApiResource } from "../utils/NamedResource";
import { Move } from "./Moves";

export interface MoveDamageClass {
  id: number,
  name: string,
  descriptions: Array<Description>
  moves: NamedApiResource<Move>
  names: Array<Name>
}