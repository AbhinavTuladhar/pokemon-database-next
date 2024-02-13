import { PokemonSpecies } from '../Pokemon/PokemonSpecies'
import { Name } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'

export interface PalParkArea {
  id: number
  name: string
  names: Array<Name>
  pokemon_encounters: Array<PalParkEncounterSpecies>
}

interface PalParkEncounterSpecies {
  base_score: number
  rate: number
  pokemon_species: NamedApiResource<PokemonSpecies>
}
