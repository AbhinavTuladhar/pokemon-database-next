import { Generation } from '../Games/Generations'
import { MoveDamageClass } from '../Moves/MoveDamageClasses'
import { Move } from '../Moves/Moves'
import { GenerationGameIndex, Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { Pokemon } from './Pokemon'

export interface Type {
  id: number
  name: string
  damage_relations: TypeRelations
  past_damage_relations: Array<TypeRelationsPast>
  game_indices: Array<GenerationGameIndex>
  generation: NamedApiResource<Generation>
  move_damage_class: NamedApiResource<MoveDamageClass>
  names: Array<Name>
  pokemon: Array<TypePokemon>
  moves: Array<NamedApiResource<Move>>
  sprites: TypeSprite
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

interface TypeSprite {
  'generation-iii': Generation3Sprite
  'generation-iv': Generation4Sprite
  'generation-v': Generation5Sprite
  'generation-vi': Generation6Sprite
  'generation-vii': Generation7Sprite
}

interface Generation3Sprite {
  'colosseum': { name_icon: string | null }
  'emerald': { name_icon: string | null }
  'firered-leafgreen': { name_icon: string | null }
  'ruby-saphire': { name_icon: string | null }
  'xd': { name_icon: string | null }
}

interface Generation4Sprite {
  'diamond-pearl': { name_icon: string | null }
  'heartgold-soulsilver': { name_icon: string | null }
  'platinum': { name_icon: string | null }
}

interface Generation5Sprite {
  'black-white': { name_icon: string | null }
  'black-2-white-2': { name_icon: string | null }
}

interface Generation6Sprite {
  'x-y': { name_icon: string | null }
  'omega-ruby-alpha-sapphire': { name_icon: string | null }
}

interface Generation7Sprite {
  'sun-moon': { name_icon: string | null }
  'ultra-sun-ultra-moon': { name_icon: string | null }
}
