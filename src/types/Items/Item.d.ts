import { EvolutionChain } from '../Evolution/EvolutionChains'
import { Version } from '../Games/Version'
import { Pokemon } from '../Pokemon/Pokemon'
import {
  APIResource,
  GenerationGameIndex,
  MachineVersionDetail,
  Name,
  VerboseEffect,
  VersionGroupFlavorText,
} from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { ItemAttribute } from './ItemAttribute'
import { ItemCategory } from './ItemCategory'
import { ItemFlingEffect } from './ItemFlingEffect'

export interface Item {
  id: number
  name: string
  cost: number
  fling_power: number
  fling_effect: NamedApiResource<ItemFlingEffect>
  attributes: NamedApiResource<ItemAttribute>
  category: NamedApiResource<ItemCategory>
  effect_entries: Array<VerboseEffect>
  flavor_text_entries: Array<VersionGroupFlavorText>
  game_indices: Array<GenerationGameIndex>
  names: Array<Name>
  sprites: ItemSprites
  held_by_pokemon: Array<ItemHolderPokemon>
  baby_trigger_for: APIResource<EvolutionChain>
  machines: Array<MachineVersionDetail>
}

interface ItemSprites {
  default: string
}

interface ItemHolderPokemon {
  pokemon: NamedApiResource<Pokemon>
  version_details: Array<ItemHolderPokemonVersionDetail>
}

interface ItemHolderPokemonVersionDetail {
  rarity: number
  version: NamedApiResource<Version>
}
