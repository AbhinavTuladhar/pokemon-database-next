import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { PokemonSpecies } from './PokemonSpecies'

export interface PokemonColour {
  id: number
  name: string
  name: Array<Name>
  pokemon_species: Array<NamedApiResource<PokemonSpecies>>
}
