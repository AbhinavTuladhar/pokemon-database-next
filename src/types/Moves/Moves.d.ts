import { Generation } from '../Games/Generations'
import { VersionGroup } from '../Games/VersionGroups'
import { AbilityEffectChange } from '../Pokemon/Abilities'
import { Pokemon } from '../Pokemon/Pokemon'
import { Stats } from '../Pokemon/Stats'
import { Type } from '../Pokemon/Types'
import { APIResource, MachineVersionDetail, Name, VerboseEffect } from '../utils/Common'
import { Language } from '../utils/Language'
import { NamedApiResource } from '../utils/NamedResource'
import { TODO } from '../utils/TODO'
import { MoveAilment } from './MoveAilments'
import { MoveCategory } from './MoveCategories'
import { MoveDamageClass } from './MoveDamageClasses'
import { MoveTarget } from './MoveTargets'

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
  damage_class: NamedApiResource<MoveDamageClass>
  effect_entries: Array<VerboseEffect>
  effect_changes: Array<AbilityEffectChange>
  learned_by_pokemon: Array<NamedApiResource<Pokemon>>
  flavor_text_entries: Array<MoveFlavourText>
  generation: NamedApiResource<Generation>
  machines: Array<MachineVersionDetail>
  meta: MoveMetaData
  names: Array<Name>
  past_values: Array<PastMoveStatValues>
  stat_changes: Array<MoveStatChange>
  super_contest_effect: TODO
  target: NamedApiResource<MoveTarget>
  type: NamedApiResource<Type>
}

interface MoveFlavourText {
  flavor_text: string
  language: NamedApiResource<Language>
  version_group: NamedApiResource<VersionGroup>
}

interface MoveMetaData {
  ailment: NamedApiResource<MoveAilment>
  category: NamedApiResource<MoveCategory>
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
  stat: NamedApiResource<Stats>
}

interface PastMoveStatValues {
  accuracy: number
  effect_chance: number
  power: number
  pp: number
  effect_entries: Array<VerboseEffect>
  type: NamedApiResource<Type>
  version_group: NamedApiResource<VersionGroup>
}
