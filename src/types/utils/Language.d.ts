import { Name } from './Common'
import { Resource } from './Resource'

export interface Language {
  id: number
  iso3166: string
  iso639: string
  name: string
  names: Array<Name>
  official: boolean
}
