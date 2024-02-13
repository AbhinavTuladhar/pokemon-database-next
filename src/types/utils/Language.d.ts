import { Resource } from './Resource'
import { Name } from './Common'

export interface Language {
  id: number
  iso3166: string
  iso639: string
  name: string
  names: Array<Name>
  official: boolean
}
