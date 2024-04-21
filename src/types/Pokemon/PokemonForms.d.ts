import { VersionGroup } from '../Games/VersionGroups'
import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { Pokemon, PokemonFormType } from './Pokemon'

export interface PokemonForm {
  id: number
  name: string
  order: number
  form_order: number
  is_default: boolean
  is_battle_only: boolean
  is_mega: boolean
  form_name: string
  pokemon: NamedApiResource<Pokemon>
  types: Array<PokemonFormType>
  sprites: PokemonFormSprites
  version_group: NamedApiResource<VersionGroup>
  names: Array<Name>
  form_names: Array<Name>
}

interface PokemonFormSprites {
  back_default: string | null
  back_female: string | null
  back_shiny: string | null
  back_shiny_female: string | null
  front_default: string | null
  front_female: string | null
  front_shiny: string | null
  front_shiny_female: string | null
}
