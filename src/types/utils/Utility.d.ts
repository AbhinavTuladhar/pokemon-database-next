export type ResourceTypes =
  | 'pokedex'
  | 'move'
  | 'ability'
  | 'item'
  | 'location'
  | 'type'
  | 'egg-group'
  | 'sprites'
  | 'generation'

export interface ResourceList {
  data: string[]
  resourceType: ResourceTypes
}

export interface FlatResourceList {
  name: string
  resourceType: ResourceTypes
}
