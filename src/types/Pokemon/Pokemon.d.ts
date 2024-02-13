import { Resource } from '../utils/Resource'
import { NamedApiResource } from '../utils/NamedResource'
import { VersionGameIndex } from '../utils/Common'
import { TODO } from '../utils/TODO'

interface Pokemon {
  abilities: Array<PokemonAbility>,
  base_experience: number,
  cries: PokemonCries,
  forms: Array<NamedApiResource<TODO>>,
  game_indices: Array<VersionGameIndex>,
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
  species: NamedApiResource<TODO>,
  sprites: TODO,
  stats: PokemonStat,
  types: Array<PokemonType>,
  weight: number
}

interface PokemonAbility {
  ability: NamedApiResource<TODO>,
  is_hidden: boolean,
  slot: number
}

interface PokemonCries {
  latest?: string,
  legacy?: string,
}

interface PokemonPastType {
  generation: NamedApiResource<TODO>,
  types: Array<PokemonType>
}

interface PokemonStat {
  base_stat: number,
  effort: number,
  stat: NamedApiResource<TODO>
}

interface PokemonType {
  slot: number,
  type: NamedApiResource<TODO>
}