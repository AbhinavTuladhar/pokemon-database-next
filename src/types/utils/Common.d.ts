import { EncounterConditionValue } from '../Encounters/EncounterConditionValues'
import { EncounterMethod } from '../Encounters/EncounterMethods'
import { Generation } from '../Games/Generations'
import { Version } from '../Games/Version'
import { VersionGroup } from '../Games/VersionGroups'

import { Language } from './Language'
import { NamedApiResource } from './NamedResource'
import { TODO } from './TODO'

export interface APIResource {
  url: string
}

export interface Description {
  description: string
  language: Language
}

export interface Effect {
  effect: string
  language: Language
}

export interface Encounter {
  chance: number
  condition_values: Array<NamedApiResource<EncounterConditionValue>>
  max_level: number
  method: NamedApiResource<EncounterMethod>
  min_level: number
}

export interface FlavourText {
  flavor_text: string
  language: NamedApiResource<Language>
  version: NamedApiResource<Version>
}

export interface GenerationGameIndex {
  game_index: number
  generation: NamedApiResource<Generation>
}

export interface MachineVersionDetail {
  machine: APIResource
  version_group: NamedApiResource<VersionGroup>
}

export interface Name {
  name: string
  language: NamedApiResource<Language>
}

export interface VerboseEffect {
  effect: string
  short_effect: string
  language: NamedApiResource<Language>
}

export interface VersionEncounterDetail {
  version: NamedApiResource<Version>
  max_chance: number
  encounter_details: Array<Encounter>
}

export interface VersionGameIndex {
  game_index: number
  version: NamedApiResource<Version>
}

export interface VersionGroupFlavorText {
  text: string
  language: NamedApiResource<Language>
  version_group: NamedApiResource<TODO>
}
