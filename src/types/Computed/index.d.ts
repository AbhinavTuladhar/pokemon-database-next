/**
 * Types that are derived from extractor functions and those that are used in intermediate values
 * during complex computations on array of objects
 */

import AbilityExtractor from '@/extractors/AbilityExtractor'
import EggGroupExtractor from '@/extractors/EggGroupExtractor'
import EncounterExtractor from '@/extractors/EncounterExtractor'
import GrowthRateExtractor from '@/extractors/GrowthRateExtractor'
import { ItemExtractor } from '@/extractors/ItemExtractors'
import LocationExtractor from '@/extractors/LocationExtractor'
import MoveExtractor from '@/extractors/MoveExtractor'
import PokemonExtractor from '@/extractors/PokemonExtractor'
import SpeciesExtractor from '@/extractors/SpeciesExtractor'
import SpriteExtractor from '@/extractors/SpriteExtractor'
import TypeExtractor from '@/extractors/TypeExtractor'

import { EvolutionDetail } from '../Evolution/EvolutionChains'
import type { PokemonType } from '../Pokemon/Pokemon'

type TransformedMove = ReturnType<typeof MoveExtractor>
type TransformedSpecies = ReturnType<typeof SpeciesExtractor>
type TransformedType = ReturnType<typeof TypeExtractor>
type TransformedEncounter = ReturnType<typeof EncounterExtractor>
type TransformedPokemon = ReturnType<typeof PokemonExtractor>
type TransformedLocation = ReturnType<typeof LocationExtractor>
type TransformedAbility = ReturnType<typeof AbilityExtractor>
type TransformedItem = ReturnType<typeof ItemExtractor>
type TransformedSprites = ReturnType<typeof SpriteExtractor>
type TransformedGrowthRate = ReturnType<typeof GrowthRateExtractor>
type TransformedEggGroup = ReturnType<typeof EggGroupExtractor>

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
  levelLearnedAt?: number
  versionGroupNames: Array<string>
}

interface GenerationSprite {
  generation: string
  frontSprite: string | null
  shinySprite: string | null
}

interface GenericNamedResource {
  name: string
  url: string
}

// First - the generation
// Second - the game name
// Third - the actual sprite key
interface SpriteDataType {
  [key: string]: {
    [key: string]: {
      [key: string]: string | null
    }
  }
}

// For pokedex entries
interface PokedexEntry {
  versionName: string
  description: string
  generationInternal: string
}

export type {
  EvolutionPokemon,
  GenerationSprite,
  GenericNamedResource,
  GroupedLocationArea,
  PokedexEntry,
  SpriteDataType,
  StatTable,
  TransformedAbility,
  TransformedEggGroup,
  TransformedEncounter,
  TransformedGrowthRate,
  TransformedItem,
  TransformedLocation,
  TransformedMove,
  TransformedMoveLevel,
  TransformedPokemon,
  TransformedSpecies,
  TransformedSprites,
  TransformedType,
}
