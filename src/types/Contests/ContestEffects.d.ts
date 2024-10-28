import { Effect, FlavourText } from '../utils/Common'

export interface ContestEffect {
  id: number
  appeal: number
  jam: number
  effect_entries: Array<Effect>
  flavor_test_entries: Array<FlavourText>
}
