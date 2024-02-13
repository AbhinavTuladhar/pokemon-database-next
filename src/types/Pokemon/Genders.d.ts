import { NamedApiResource } from '../utils/NamedResource'
import { PokemonSpecies } from './PokemonSpecies'

export interface Gender {
  id: number
  name: string
  pokemon_species_details: Array<PokemonSpeciesGender>
}

interface PokemonSpeciesGender {
  rate: number
  pokemon_species: NamedApiResource<PokemonSpecies>
}
