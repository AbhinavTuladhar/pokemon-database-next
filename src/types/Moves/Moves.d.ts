import { VersionGroup } from '../Games/VersionGroups'
import { AbilityEffectChange } from '../Pokemon/Abilities'
import { Pokemon } from '../Pokemon/Pokemon'
import { APIResource, Name, VerboseEffect } from '../utils/Common'
import { Language } from '../utils/Language'
import { NamedApiResource } from '../utils/NamedResource'
import { TODO } from '../utils/TODO'

export interface Move {
  id: number
  name: string
  accuracy: number
  effect_chance: number
  pp: number
  priority: number
  power: number
  contest_combos: TODO
  contest_type: TODO
  contest_Effect: APIResource<TODO>
  damage_class: NamedApiResource<TODO> // MoveDamageClass
  effect_entries: Array<VerboseEffect>
  effect_changes: Array<AbilityEffectChange>
  learned_by_pokemon: Array<NamedApiResource<Pokemon>>
  flavor_text_entries: Array<MoveFlavourText>
  generation: NamedApiResource<TODO> // Generation,
  machines: Array<TODO> // Machine Version Detail
  meta: MoveMetaData
  names: Array<Name>
  past_values: Array<PastMoveStatValues>
  stat_changes: Array<MoveStatChange>
  super_contest_effect: TODO
  target: NamedApiResource<TODO> // Move Target,
  type: NamedApiResource<TODO> // Type
}

interface MoveFlavourText {
  flavor_text: string
  language: NamedApiResource<Language>
  version_group: NamedApiResource<VersionGroup>
}

interface MoveMetaData {
  ailment: NamedApiResource<TODO> // Move Ailment
  category: NamedApiResource<TODO> // Move category
  min_hits: number
  max_hits: number
  min_turns: number
  max_turns: number
  drain: number
  healing: number
  crit_rate: number
  ailment_chance: number
  flinch_chance: number
  stat_chance: number
}

interface MoveStatChange {
  change: number
  stat: NamedApiResource<TODO> // Stat
}

interface PastMoveStatValues {
  accuracy: number
  effect_chance: number
  power: number
  pp: number
  effect_entries: Array<VerboseEffect>
  type: NamedApiResource<TODO> // Type
  version_group: NamedApiResource<VersionGroup>
}
