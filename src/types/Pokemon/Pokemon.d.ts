import { Resource } from '@/types/utils/Resource'
import { TODO } from '@/types/utils/TODO'

interface Pokemon {
  abilities: Array<PokemonAbility>,
  base_experience: number,
  cries: PokemonCries,
  forms: Array<Resource>,
  game_indices: Array<TODO>,
  height: number,
  held_items: Array<TODO>,
  id: number,
  is_default: boolean,
  location_area_encounters: string,
  moves: Array<TODO>,
  name: string,
  order: number,
  past_abilities: Array<TODO>,
  past_types: Array<PokemonPastType>,
  species: Resource,
  sprites: TODO,
  stats: PokemonStat,
  types: Array<PokemonType>,
  weight: number
}

interface PokemonAbility {
  ability: Resource,
  is_hidden: boolean,
  slot: number
}

interface PokemonCries {
  latest?: string,
  legacy?: string,
}

interface PokemonPastType {
  generation: Resource,
  types: Array<PokemonType>
}

interface PokemonStat {
  base_stat: number,
  effort: number,
  stat: Resource
}

interface PokemonType {
  slot: number,
  type: Resource
}