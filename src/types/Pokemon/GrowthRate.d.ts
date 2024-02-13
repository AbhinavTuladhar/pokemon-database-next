import { Description } from '../utils/Common'
import { NamedApiResource } from '../utils/NamedResource'
import { PokemonSpecies } from './PokemonSpecies'

export interface GrowthRate {
  id: number
  name: string
  formua: string
  descriptions: Array<Description>
  levels: Array<GrowthRateExperienceLevel>
  pokemon_species: NamedApiResource<PokemonSpecies>
}

interface GrowthRateExperienceLevel {
  level: number
  experience: number
}
