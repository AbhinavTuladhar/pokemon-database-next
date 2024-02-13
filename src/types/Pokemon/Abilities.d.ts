import { Generation } from "../Games/Generations"
import { VersionGroup } from "../Games/VersionGroups"
import { Effect, Name, VerboseEffect } from "../utils/Common"
import { Language } from "../utils/Language"
import { NamedApiResource } from "../utils/NamedResource"
import { Pokemon } from "./Pokemon"

export interface Ability {
  id: number,
  name: string,
  is_main_series: boolean,
  generation: NamedApiResource<Generation>
  names: Array<Name>
  effect_entries: Array<VerboseEffect>
  effect_changes: Array<AbilityEffectChange>
  flavor_text_entries: Array<AbilityFlavourText>
  pokemon: Array<AbilityPokemon>
}

interface AbilityEffectChange {
  effect_entries: Array<Effect>
  version_group: NamedApiResource<VersionGroup>
}

interface AbilityFlavourText {
  flavor_text: string,
  language: NamedApiResource<Language>
  version_group: NamedApiResource<VersionGroup>,
}

interface AbilityPokemon {
  is_hidden: boolean,
  slot: integer,
  pokemon: NamedApiResource<Pokemon>
}