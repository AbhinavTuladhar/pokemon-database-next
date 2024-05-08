import { EncounterMethod, GroupedLocationArea } from '@/types'

export type EncounterConditionName = 'season' | 'time' | null
export type ConditionArray = [string, string, string] | [string, string, string, string]

export interface MethodGroup {
  method: string
  encounterDetails: Array<GroupedLocationArea>
}

export interface SubLocationGroup {
  subLocationName: string
  methods: Array<MethodGroup>
}

export interface LocationGroup {
  generation: string
  subLocations: Array<SubLocationGroup>
}

export interface GenerationSectionProps {
  locationData: LocationGroup
  methodData: Array<EncounterMethod>
}
