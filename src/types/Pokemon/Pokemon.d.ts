import { Resource } from '../utils/Resource'
import { NamedApiResource } from '../utils/NamedResource'
import { VersionGameIndex } from '../utils/Common'
import { TODO } from '../utils/TODO'
import { PokemonForm } from './PokemonForms'
import { PokemonSpecies } from './PokemonSpecies'
import { VersionGroup } from '../Games/VersionGroups'
import { Ability } from './Abilities'
import { Move } from '../Moves/Moves'
import { MoveLearnMethods } from '../Moves/MoveLearnMethod'
import { Generation } from '../Games/Generations'
import { Stats } from './Stats'
import { Type } from './Types'
import { Version } from '../Games/Version'
import { Item } from '../Items/Item'

export interface Pokemon {
  abilities: Array<PokemonAbility>,
  base_experience: number,
  cries: PokemonCries,
  forms: Array<NamedApiResource<PokemonForm>>,
  game_indices: Array<VersionGameIndex>,
  height: number,
  held_items: Array<PokemonHeldItem>,
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: Array<PokemonMove>,
  name: string,
  order: number,
  past_abilities: Array<TODO>,
  past_types: Array<PokemonPastType>,
  species: NamedApiResource<PokemonSpecies>,
  sprites: TODO,
  stats: PokemonStat,
  types: Array<PokemonType>,
  weight: number
}

export interface PokemonAbility {
  ability: NamedApiResource<Ability>,
  is_hidden: boolean,
  slot: number
}

export interface PokemonCries {
  latest?: string,
  legacy?: string,
}

export interface PokemonMove {
  move: NamedApiResource<Move>
  version_group_details: Array<PokemonMoveVersion>
}

export interface PokemonMoveVersion {
  move_learn_method: NamedApiResource<MoveLearnMethods>
  version_group: NamedApiResource<VersionGroup>,
  level_learned_at: number
}

export interface PokemonPastType {
  generation: NamedApiResource<Generation>,
  types: Array<PokemonType>
}

export interface PokemonStat {
  base_stat: number,
  effort: number,
  stat: NamedApiResource<Stats>
}

export interface PokemonType {
  slot: number,
  type: NamedApiResource<Type>
}

export interface PokemonFormType {
  slot: number,
  type: NamedApiResource<Type>
}

export interface PokemonHeldItem {
  item: NamedApiResource<Item>,
  version_details: Array<NamedApiResource<PokemonHeldItemVersion>>
}

export interface PokemonHeldItemVersion {
  rarity: number,
  version: NamedApiResource<Version>
}