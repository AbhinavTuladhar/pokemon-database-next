import { TransformedMove, TransformedMoveLevel } from '@/types'

export interface FinalMoveData {
  level: Array<TransformedMoveLevel>
  tutor: Array<TransformedMove>
  egg: Array<TransformedMove>
  machine: Array<TransformedMove>
}
