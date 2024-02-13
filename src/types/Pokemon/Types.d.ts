import { Generation } from '../Games/Generations'
import { Move } from '../Moves/Moves'
import { Pokemon } from './Pokemon'
import { GenerationGameIndex, Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

export interface Type {
  id: number
  name: string
  damage_relations: TypeRelations
  past_damage_relations: Array<TypeRelationsPast>
  game_indices: Array<GenerationGameIndex>
  generation: NamedApiResource<Generation>
  move_damage_class: NamedApiResource<TODO> // MoveDamageClass
  names: Array<Name>
  pokemon: Array<TypePokemon>
  moves: NamedApiResource<Move>
}

interface TypePokemon {
  slot: number
  pokemon: NamedApiResource<Pokemon>
}

interface TypeRelations {
  no_damage_to: Array<NamedApiResource<Type>>
  half_damage_to: Array<NamedApiResource<Type>>
  double_damage_to: Array<NamedApiResource<Type>>
  no_damage_from: Array<NamedApiResource<Type>>
  half_damage_from: Array<NamedApiResource<Type>>
  double_damage_from: Array<NamedApiResource<Type>>
}

interface TypeRelationsPast {
  generation: NamedApiResource<Generation>
  damage_relations: TypeRelations
}
