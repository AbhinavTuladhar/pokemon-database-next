import { Name } from '../utils/Common'
import { Language } from '../utils/Language'
import { NamedApiResource } from '../utils/NamedResource'
import { PokemonSpecies } from './PokemonSpecies'

export interface PokemonShape {
  id: number
  name: string
  awesome_names: Array<AwesomeName>
  names: Array<Name>
  pokemon_species: Array<NamedApiResource<PokemonSpecies>>
}

interface AwesomeName {
  awesome_name: string
  language: NamedApiResource<Language>
}
