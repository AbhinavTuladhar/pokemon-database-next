import { Item } from '../Items/Item'
import { Move } from '../Moves/Moves'
import { PokemonSpecies } from '../Pokemon/PokemonSpecies'
import { Type } from '../Pokemon/Types'
import { NamedApiResource } from '../utils/NamedResource'
import { TODO } from '../utils/TODO'

export interface EvolutionChain {
  id: number
  baby_trigger_item: NamedApiResource<Item>
  chain: ChainLink
}

interface ChainLink {
  is_baby: boolean
  species: NamedApiResource<PokemonSpecies>
  evolution_details: Array<TODO>
  volves_to: Array<ChainLink>
}

interface EvolutionDetail {
  item: NamedApiResource<Item>
  trigger: NamedApiResource<TODO> // Evolution trigger
  gender: number
  held_item: NamedApiResource<Item>
  known_move: NamedApiResource<Move>
  known_move_type: NamedApiResource<Type>
  location: NamedApiResource<TODO> // Location
  min_level: number
  min_happiness: number
  min_beauty: number
  min_affection: number
  needs_overworld_rain: boolean
  party_species: NamedApiResource<PokemonSpecies>
  party_type: NamedApiResource<Type>
  relative_physical_stats: number
  time_of_day: string
  trade_species: NamedApiResource<PokemonSpecies>
  turn_upside_down: boolean
}
