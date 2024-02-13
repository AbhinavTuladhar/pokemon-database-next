import { PokemonSpecies } from '../Pokemon/PokemonSpecies'
import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

export interface EvolutionTrigger {
  id: number
  name: string
  names: Array<Name>
  pokemon_species: Array<NamedApiResource<PokemonSpecies>>
}
