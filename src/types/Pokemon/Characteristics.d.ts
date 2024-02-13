import { Description } from "../utils/Common"
import { NamedApiResource } from "../utils/NamedResource"
import { Stats } from './Stats'

export interface Characteristic {
  id: number,
  gene_modulo: number,
  possible_values: Array<number>
  highest_stat: NamedApiResource<Stats>,
  descriptions: Array<Description>
}