import { Item } from '../Items/Item'
import { Location } from '../Locations/Locations'
import { Move } from '../Moves/Moves'
import { PokemonSpecies } from '../Pokemon/PokemonSpecies'
import { Type } from '../Pokemon/Types'
import { NamedApiResource } from '../utils/NamedResource'

import { EvolutionTrigger } from './EvolutionTriggers'

export interface EvolutionChain {
  id: number
  baby_trigger_item: NamedApiResource<Item>
  chain: ChainLink
}

export interface ChainLink {
  is_baby: boolean
  species: NamedApiResource<PokemonSpecies>
  evolution_details: Array<EvolutionDetail>
  evolves_to: Array<ChainLink>
}

export interface EvolutionDetail {
  item: NamedApiResource<Item> | null
  trigger: NamedApiResource<EvolutionTrigger>
  gender: number | null
  held_item: NamedApiResource<Item> | null
  known_move: NamedApiResource<Move> | null
  known_move_type: NamedApiResource<Type> | null
  location: NamedApiResource<Location> | null
  min_level: number | null
  min_happiness: number | null
  min_beauty: number | null
  min_affection: number | null
  needs_overworld_rain: boolean | null
  party_species: NamedApiResource<PokemonSpecies> | null
  party_type: NamedApiResource<Type> | null
  relative_physical_stats: number | null
  time_of_day: string | null
  trade_species: NamedApiResource<PokemonSpecies> | null
  turn_upside_down: boolean | null
}
