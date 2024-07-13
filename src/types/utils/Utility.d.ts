export type ResourceTypes =
  | 'pokedex'
  | 'move'
  | 'ability'
  | 'item'
  | 'location'
  | 'type'
  | 'egg-group'
  | 'sprites'

export interface ResourceList {
  data: string[]
  resourceType: ResourceTypes
}

export interface FlatResourceList {
  name: string
  resourceType: ResourceTypes
}
