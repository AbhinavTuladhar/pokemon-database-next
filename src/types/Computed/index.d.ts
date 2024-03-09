import MoveExtractor from '@/extractors/MoveExtractor'
import SpeciesExtractor from '@/extractors/SpeciesExtractor'
import TypeExtractor from '@/extractors/TypeExtractor'
import EncounterExtractor from '@/extractors/EncounterExtractor'
import type { PokemonType } from '../Pokemon/Pokemon'
import { EvolutionDetail } from '../Evolution/EvolutionChains'

type TransformedMove = ReturnType<typeof MoveExtractor>
type TransformedSpecies = ReturnType<typeof SpeciesExtractor>
type TransformedType = ReturnType<typeof TypeExtractor>
type TransformedEncounter = ReturnType<typeof EncounterExtractor>

// TransformedEncounter returns an array of objects.
// We need to find the interface of the objects in the array
type ElementType<T extends any[]> = T extends (infer E)[] ? E : never
type EncounterInstance = ElementType<TransformedEncounter>

// Gamename is used as an array instead of a string.
interface GroupedLocationArea extends Omit<EncounterInstance, 'gameName'> {
  gameName: Array<string>
}

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

interface TransformedMoveLevel extends TransformedMove {
  levelLearnedAt: number
}

interface GenerationSprite {
  generation: string
  frontSprite: string | null
  shinySprite: string | null
}

export type {
  TransformedMove,
  TransformedSpecies,
  TransformedType,
  TransformedEncounter,
  StatTable,
  EvolutionPokemon,
  TransformedMoveLevel,
  GenerationSprite,
  GroupedLocationArea,
}
