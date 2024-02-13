import { Move } from "../Moves/Moves"
import { APIResource, Name } from "../utils/Common"
import { NamedApiResource } from "../utils/NamedResource"
import { TODO } from "../utils/TODO"

export interface Stats {
  id: number,
  name: string,
  game_index: number,
  is_battle_only: boolean,
  affecting_moves: MoveStatAffectSets,
  affecting_natures: NatureStatAffectSets,
  characteristics: APIResource<TODO> // Characteristic
  move_damage_class: NamedApiResource<TODO> // Move damage class
  names: Array<Name>
}

interface MoveStatAffectSets {
  increase: Array<MoveStatAffect>
  decrease: Array<MoveStatAffect>
}

interface MoveStatAffect {
  change: number,
  move: NamedApiResource<Move>
}

interface NatureStatAffectSets {
  increase: Array<NamedApiResource<TODO>> // nature
  decrease: Array<NamedApiResource<TODO>> // nature
}