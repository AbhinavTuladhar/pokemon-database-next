import { TransformedPokemon } from '@/types'

export interface CardProps
  extends Pick<TransformedPokemon, 'id' | 'name' | 'types' | 'front_default'> {}

export interface TableProps
  extends Pick<TransformedPokemon, 'id' | 'name' | 'gameSprite' | 'stats' | 'types'> {}

export interface TableData extends Pick<TransformedPokemon, 'id' | 'name' | 'gameSprite'> {
  types: Array<string>
  totalStats: number
  stats: [
    {
      name: 'HP'
      value: number
    },
    {
      name: 'Attack'
      value: number
    },
    {
      name: 'Defence'
      value: number
    },
    {
      name: 'Sp. Atk'
      value: number
    },
    {
      name: 'Sp. Def'
      value: number
    },
    {
      name: 'Speed'
      value: number
    },
  ]
}
