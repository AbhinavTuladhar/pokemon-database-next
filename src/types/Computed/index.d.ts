import MoveExtractor from '@/extractors/MoveExtractor'
import SpeciesExtractor from '@/extractors/SpeciesExtractor'
import TypeExtractor from '@/extractors/TypeExtractor'
import type { PokemonType } from '../Pokemon/Pokemon'
import { EvolutionDetail } from '../Evolution/EvolutionChains'

type TransformedMove = ReturnType<typeof MoveExtractor>
type TransformedSpecies = ReturnType<typeof SpeciesExtractor>
type TransformedType = ReturnType<typeof TypeExtractor>

interface StatTable {
  name: string
  value: number
  width: string
  colour: string
}

interface EvolutionPokemon {
  isSplitEvo: boolean
  nextEvoSplit: boolean | undefined
  id: number
  evolutionDetails?: Partial<EvolutionDetail>[] | undefined
  speciesName?: string | undefined
  speciesUrl?: string | undefined
  name: string
  homeSprite: string | null
  types: PokemonType[]
}

export type { TransformedMove, TransformedSpecies, TransformedType, StatTable, EvolutionPokemon }
