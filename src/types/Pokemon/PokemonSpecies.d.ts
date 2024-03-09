import { EvolutionChain } from '../Evolution/EvolutionChains'
import { Generation } from '../Games/Generations'
import { Pokedex } from '../Games/Pokedexes'
import { PalParkArea } from '../Locations/PalParkAreas'
import { APIResource, Description, FlavourText, Name } from '../utils/Common'
import { Language } from '../utils/Language'
import { NamedApiResource } from '../utils/NamedResource'

import { EggGroup } from './EggGroups'
import { GrowthRate } from './GrowthRate'
import { Pokemon } from './Pokemon'
import { PokemonColour } from './PokemonColours'
import { PokemonHabitat } from './PokemonHabitats'
import { PokemonShape } from './PokemonShapes'

export interface PokemonSpecies {
  id: number
  name: string
  order: number
  gender_rate: number
  capture_rate: number
  base_happiness: number
  is_baby: boolean
  is_legendary: boolean
  is_mythical: boolean
  hatch_counter: number
  has_gender_differences: boolean
  forms_switchable: boolean
  growth_rate: NamedApiResource<GrowthRate>
  pokedex_numbers: Array<PokemonSpeciesDexEntry>
  egg_groups: Array<NamedApiResource<EggGroup>>
  color: NamedApiResource<PokemonColour>
  shape: NamedApiResource<PokemonShape>
  evolves_from_species: NamedApiResource<PokemonSpecies>
  evolution_chain: APIResource<EvolutionChain>
  habitat: NamedApiResource<PokemonHabitat>
  generation: NamedApiResource<Generation>
  names: Array<Name>
  pal_park_encounters: Array<PalParkEncounterArea>
  flavor_text_entries: Array<FlavourText>
  from_descriptions: Array<Description>
  genera: Array<Genus>
  varieties: Array<PokemonSpeciesVariety>
}

export interface Genus {
  genus: string
  language: NamedApiResource<Language>
}

export interface PokemonSpeciesDexEntry {
  entry_number: number
  pokedex: NamedApiResource<Pokedex>
}

export interface PalParkEncounterArea {
  base_score: number
  rate: number
  area: NamedApiResource<PalParkArea>
}

export interface PokemonSpeciesVariety {
  is_default: boolean
  pokemon: NamedApiResource<Pokemon>
}
