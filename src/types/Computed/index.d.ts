/**
 * Types that are derived from extractor functions and those that are used in intermediate values
 * during complex computations on array of objects
 */

import { transformAbility } from '@/features/battle/transformers/transform-ability'
import { transformMove, transformPastValues } from '@/features/battle/transformers/transform-move'
import { transformBerry } from '@/features/games/transformers/transform-berry'
import { transformEncounter } from '@/features/games/transformers/transform-encounter'
import { transformItem } from '@/features/games/transformers/transform-item'
import { transformLocation } from '@/features/games/transformers/transform-location'
import { transformEggGroup } from '@/features/pokemon/transformers/transform-egg-group'
import { transformGrowthRate } from '@/features/pokemon/transformers/transform-growth-rate'
import { transformPokemon } from '@/features/pokemon/transformers/transform-pokemon'
import { transformSpecies } from '@/features/pokemon/transformers/transform-species'
import { transformSprites } from '@/features/pokemon/transformers/transform-sprites'
import { transformType } from '@/features/pokemon/transformers/transform-type'

import { EvolutionDetail } from '../Evolution/EvolutionChains'
import type { PokemonType } from '../Pokemon/Pokemon'

type TransformedMove = ReturnType<typeof transformMove>
type TransformedSpecies = ReturnType<typeof transformSpecies>
type TransformedType = ReturnType<typeof transformType>
type TransformedEncounter = ReturnType<typeof transformEncounter>
type TransformedPokemon = ReturnType<typeof transformPokemon>
type TransformedLocation = ReturnType<typeof transformLocation>
type TransformedAbility = ReturnType<typeof transformAbility>
type TransformedItem = ReturnType<typeof transformItem>
type TransformedSprites = ReturnType<typeof transformSprites>
type TransformedGrowthRate = ReturnType<typeof transformGrowthRate>
type TransformedEggGroup = ReturnType<typeof transformEggGroup>
type TransformedBerry = ReturnType<typeof transformBerry>
type TransformedPastMoveValue = ReturnType<typeof transformPastValues>

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

// Utility type for having all partial values except one
type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>

// For combined berry and item information
type CombinedBerryItem = TransformedBerry & TransformedItem

// For the type coverage tool
interface AttackingTypeInfo {
  typeName: string
  attackingTypeInfo: AttackingType
}

interface AttackingType {
  doubleDamageTo: TransformedType['doubleDamageTo']
  halfDamageTo: TransformedType['halfDamageTo']
  noDamageTo: TransformedType['noDamageTo']
}

export type {
  AttackingType,
  AttackingTypeInfo,
  CombinedBerryItem,
  ElementType,
  EvolutionPokemon,
  GenerationSprite,
  GenericNamedResource,
  GroupedLocationArea,
  PartialExcept,
  PokedexEntry,
  SpriteDataType,
  StatTable,
  TransformedAbility,
  TransformedBerry,
  TransformedEggGroup,
  TransformedEncounter,
  TransformedGrowthRate,
  TransformedItem,
  TransformedLocation,
  TransformedMove,
  TransformedMoveLevel,
  TransformedPastMoveValue,
  TransformedPokemon,
  TransformedSpecies,
  TransformedSprites,
  TransformedType,
}
