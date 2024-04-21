import { Generation } from '../Games/Generations'
import { Version } from '../Games/Version'
import { VersionGroup } from '../Games/VersionGroups'
import { Item } from '../Items/Item'
import { MoveLearnMethods } from '../Moves/MoveLearnMethod'
import { Move } from '../Moves/Moves'
import { VersionGameIndex } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { TODO } from '../utils/TODO'

import { Ability } from './Abilities'
import { PokemonForm } from './PokemonForms'
import { PokemonSpecies } from './PokemonSpecies'
import { Stats } from './Stats'
import { Type } from './Types'

export interface Pokemon {
  abilities: Array<PokemonAbility>
  base_experience: number
  cries: PokemonCries
  forms: Array<NamedApiResource<PokemonForm>>
  game_indices: Array<VersionGameIndex>
  height: number
  held_items: Array<PokemonHeldItem>
  id: number
  is_default: boolean
  location_area_encounters: string
  moves: Array<PokemonMove>
  name: string
  order: number
  past_abilities: Array<TODO>
  past_types: Array<PokemonPastType>
  species: NamedApiResource<PokemonSpecies>
  sprites: PokemonSprites
  stats: Array<PokemonStat>
  types: Array<PokemonType>
  weight: number
}

export interface PokemonAbility {
  ability: NamedApiResource<Ability>
  is_hidden: boolean
  slot: number
}

export interface PokemonCries {
  latest: string
  legacy: string | null
}

export interface PokemonMove {
  move: NamedApiResource<Move>
  version_group_details: Array<PokemonMoveVersion>
}

export interface PokemonMoveVersion {
  move_learn_method: NamedApiResource<MoveLearnMethods>
  version_group: NamedApiResource<VersionGroup>
  level_learned_at: number
}

export interface PokemonPastType {
  generation: NamedApiResource<Generation>
  types: Array<PokemonType>
}

export interface PokemonSprites {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
  other: PokemonSpritesOther
  versions: PokemonSpritesVersion
}

export interface PokemonSpritesVariant {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_gray: string | null
  back_shiny_female: string | null
  back_transparent: string | null
  back_shiny_transparent: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_gray: string | null
  front_shiny_female: string | null
  front_transparent: string | null
  front_shiny_transparent: string | null
}

export interface PokemonSpritesOther {
  'dream_world': Pick<PokemonSpritesVariant, 'front_default' | 'front_female'>
  'home': Pick<
    PokemonSpritesVariant,
    'front_default' | 'front_female' | 'front_shiny' | 'front_shiny_female'
  >
  'official-artwork': Pick<PokemonSpritesVariant, 'front_default' | 'front_shiny'>
  'showdown': Omit<PokemonSpritesVariant, 'back_gray' | 'front_gray'>
}

export interface PokemonStat {
  base_stat: number
  effort: number
  stat: NamedApiResource<Stats>
}

export interface PokemonType {
  slot: number
  type: NamedApiResource<Type>
}

export interface PokemonFormType {
  slot: number
  type: NamedApiResource<Type>
}

export interface PokemonHeldItem {
  item: NamedApiResource<Item>
  version_details: Array<PokemonHeldItemVersion>
}

export interface PokemonHeldItemVersion {
  rarity: number
  version: NamedApiResource<Version>
}

/**
 * --------------------------------------------------
 * --------------ALL SPRITE INTERFACES---------------
 * --------------------------------------------------
 */

export interface PokemonVersionSprites {
  'generation-i': Generation1Sprites
}
export interface Generation1Sprites {
  'red-blue': Pick<
    PokemonSpritesVariant,
    | 'back_default'
    | 'back_gray'
    | 'front_default'
    | 'front_gray'
    | 'back_transparent'
    | 'front_transparent'
  >
  'yellow': Pick<
    PokemonSpritesVariant,
    | 'back_default'
    | 'back_gray'
    | 'front_default'
    | 'front_gray'
    | 'back_transparent'
    | 'front_transparent'
  >
}

export interface Generation2Sprites {
  crystal: Pick<
    PokemonSpritesVariant,
    | 'back_default'
    | 'back_shiny'
    | 'back_shiny_transparent'
    | 'back_transparent'
    | 'front_default'
    | 'front_shiny'
    | 'front_shiny_transparent'
    | 'front_transparent'
  >
  gold: Pick<
    PokemonSpritesVariant,
    'back_default' | 'back_shiny' | 'front_default' | 'front_shiny' | 'front_transparent'
  >
  silver: Pick<
    PokemonSpritesVariant,
    'back_default' | 'back_shiny' | 'front_default' | 'front_shiny' | 'front_transparent'
  >
}

export interface Generation3Sprites {
  'emerald': Pick<PokemonSpritesVariant, 'front_default' | 'front_shiny'>
  'firered-leafgreen': Pick<
    PokemonSpritesVariant,
    'back_default' | 'back_shiny' | 'front_default' | 'front_shiny'
  >
  'ruby-sapphire': Pick<
    PokemonSpritesVariant,
    'back_default' | 'back_shiny' | 'front_default' | 'front_shiny'
  >
}

export interface Generation4Sprites {
  'diamond-pearl': Omit<PokemonSpritesVariant, 'back_shiny_transparent' | 'front_shiny_transparent'>
  'heartgold-soulsilver': Omit<
    PokemonSpritesVariant,
    'back_shiny_transparent' | 'front_shiny_transparent'
  >
  'platinum': Omit<PokemonSpritesVariant, 'back_shiny_transparent' | 'front_shiny_transparent'>
}

export interface Generation5Sprites {
  'black-white': {
    animated: Omit<PokemonSpritesVariant, 'back_shiny_transparent' | 'front_shiny_transparent'>
    back_default: string
    back_female: string
    back_shiny: string
    back_shiny_female: string
    front_default: string
    front_female: string
    front_shiny: string
    front_shiny_female: string
  }
}

export interface Generation6Sprites {
  'omegaruby-alphasapphire': Pick<
    PokemonSpritesVariant,
    'front_default' | 'front_female' | 'front_shiny' | 'front_shiny_female'
  >
  'x-y': Pick<
    PokemonSpritesVariant,
    'front_default' | 'front_female' | 'front_shiny' | 'front_shiny_female'
  >
}

export interface Generation7Sprites {
  'icons': {
    front_default: string | null
    front_female: string | null
  }
  'ultra-sun-ultra-moon': Pick<
    PokemonSpritesVariant,
    'front_default' | 'front_female' | 'front_shiny' | 'front_shiny_female'
  >
}

export interface Generation8Sprites {
  icons: {
    front_default: string | null
    front_female: string | null
  }
}

export interface PokemonSpritesVersion {
  'generation-i': Generation1Sprites
  'generation-ii': Generation2Sprites
  'generation-iii': Generation3Sprites
  'generation-iv': Generation4Sprites
  'generation-v': Generation5Sprites
  'generation-vi': Generation6Sprites
  'generation-vii': Generation7Sprites
  'generation-viii': Generation8Sprites
}
