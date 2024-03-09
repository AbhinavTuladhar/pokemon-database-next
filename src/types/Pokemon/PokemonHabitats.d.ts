import { Name } from '../utils/Common'

import { PokemonSpecies } from './PokemonSpecies'

export interface PokemonHabitat {
  id: number
  name: string
  names: Array<Name>
  pokemon_species: Array<NamedApiResource<PokemonSpecies>>
}
