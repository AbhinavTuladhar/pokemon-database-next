import { BerryFlavour } from '../Berries/BerryFlavour'
import { Language } from '../utils/Language'
import { NamedApiResource } from '../utils/NamedResource'

export interface ContestType {
  id: number
  name: string
  berry_flavor: NamedApiResource<BerryFlavour>
  names: Array<ContestName>
}

interface ContestName {
  name: string
  color: string
  language: NamedApiResource<Language>
}
