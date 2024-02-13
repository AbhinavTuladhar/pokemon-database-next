import { Version } from '../Games/Version'
import { Pokemon } from '../Pokemon/Pokemon'
import {
  APIResource,
  GenerationGameIndex,
  Name,
  VerboseEffect,
  VersionGroupFlavorText,
} from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { TODO } from '../utils/TODO'

export interface Item {
  id: number
  name: string
  cost: number
  fling_power: number
  fling_effect: NamedApiResource<TODO> // Item Fling Effect
  attributes: NamedApiResource<TODO> // Item Attribute
  category: NamedApiResource<TODO> // Item category
  effect_entries: Array<VerboseEffect>
  flavor_text_entries: Array<VersionGroupFlavorText>
  game_indices: Array<GenerationGameIndex>
  names: Array<Name>
  sprites: ItemSprites
  held_by_pokemon: Array<ItemHolderPokemon>
  baby_trigger_for: APIResource<TODO> // Evolution chain
  machines: Array<TODO> // Machine version detail
}

interface ItemSprites {
  default: string
}

interface ItemHolderPokemon {
  pokemon: NamedApiResource<Pokemon>
  version_details: Array<ItemHolderPokemonVersionDetail> // ItemHolder PokemonVersionDetail?
}

interface ItemHolderPokemonVersionDetail {
  rarity: number
  version: NamedApiResource<Version>
}
