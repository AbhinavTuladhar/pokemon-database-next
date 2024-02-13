import { MoveDamageClass } from '../Moves/MoveDamageClasses'
import { Move } from '../Moves/Moves'
import { APIResource, Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { Characteristic } from './Characteristics'
import { Nature } from './Natures'

export interface Stats {
  id: number
  name: string
  game_index: number
  is_battle_only: boolean
  affecting_moves: MoveStatAffectSets
  affecting_natures: NatureStatAffectSets
  characteristics: APIResource<Characteristic>
  move_damage_class: NamedApiResource<MoveDamageClass>
  names: Array<Name>
}

interface MoveStatAffectSets {
  increase: Array<MoveStatAffect>
  decrease: Array<MoveStatAffect>
}

interface MoveStatAffect {
  change: number
  move: NamedApiResource<Move>
}

interface NatureStatAffectSets {
  increase: Array<NamedApiResource<Nature>>
  decrease: Array<NamedApiResource<Nature>>
}
