import { VersionGroup } from '../Games/VersionGroups'
import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { TODO } from '../utils/TODO'

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
  sprites: TODO
  version_group: NamedApiResource<VersionGroup>
  names: Array<Name>
  form_names: Array<Name>
}
