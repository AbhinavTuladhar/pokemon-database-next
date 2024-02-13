import { APIResource, Description, FlavourText, Name } from "../utils/Common";
import { Language } from "../utils/Language";
import { NamedApiResource } from "../utils/NamedResource";
import { TODO } from "../utils/TODO";
import { Pokemon } from "./Pokemon";

export interface PokemonSpecies {
  id: number,
  name: string,
  order: number,
  gender_rate: number,
  capture_rate: number,
  base_happiness: number,
  is_baby: boolean,
  is_legendary: boolean,
  is_mythical: boolean,
  hatch_counter: number,
  has_gender_differences: boolean,
  forms_switchable: boolean,
  growth_rate: NamedApiResource<TODO>, // Growth Rate
  pokedex_numbers: Array<TODO>, // Pokemon Species Dex Entry
  egg_groups: Array<NamedApiResource<TODO>>, // Egg Group
  color: NamedApiResource<TODO> // Pokemon Colour
  shape: NamedApiResource<TODO>, // PokemonShape
  evolves_from_species: NamedApiResource<PokemonSpecies>,
  evolution_chain: APIResource<TODO>, // EvolutionChain,
  habitat: NamedApiResource<TODO>, // PokemonHabitat,
  generation: NamedApiResource<TODO>, // Generation,
  names: Array<Name>,
  pal_park_encounters: Array<PalParkEncounterArea>,
  flavor_text_entries: Array<FlavourText>,
  from_descriptions: Array<Description>,
  genera: Array<Genus>
  varieties: Array<PokemonSpeciesVariety>
}


export interface Genus {
  genus: string,
  language: NamedApiResource<Language>
}

export interface SpeciesDexEntry {
  entry_number: number,
  pokedex: NamedApiResource<TODO> // Pokedex
}

export interface PalParkEncounterArea {
  base_score: number,
  rate: number,
  area: NamedApiResource<TODO> // PalParkArea
}

export interface PokemonSpeciesVariety {
  is_default: boolean,
  pokemon: NamedApiResource<Pokemon>
}