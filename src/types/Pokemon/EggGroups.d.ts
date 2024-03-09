import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

import { PokemonSpecies } from './PokemonSpecies'

export interface EggGroup {
  id: number
  name: string
  names: Array<Name>
  pokemon_species: Array<NamedApiResource<PokemonSpecies>>
}
