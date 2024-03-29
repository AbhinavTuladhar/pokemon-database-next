import EncounterExtractor from '@/extractors/EncounterExtractor'
import MoveExtractor from '@/extractors/MoveExtractor'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import SpeciesExtractor from '@/extractors/SpeciesExtractor'
import TypeExtractor from '@/extractors/TypeExtractor'

import { EvolutionDetail } from '../Evolution/EvolutionChains'
import type { PokemonType } from '../Pokemon/Pokemon'

type TransformedMove = ReturnType<typeof MoveExtractor>
type TransformedSpecies = ReturnType<typeof SpeciesExtractor>
type TransformedType = ReturnType<typeof TypeExtractor>
type TransformedEncounter = ReturnType<typeof EncounterExtractor>
type TransformedPokemon = ReturnType<typeof PokemonExtractor>

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
  EvolutionPokemon,
  GenerationSprite,
  GroupedLocationArea,
  StatTable,
  TransformedEncounter,
  TransformedMove,
  TransformedMoveLevel,
  TransformedPokemon,
  TransformedSpecies,
  TransformedType,
}
