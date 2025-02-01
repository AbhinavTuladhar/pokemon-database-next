import React from 'react'
import { NextPage } from 'next'

import { PageTitle } from '@/components/containers'
import StatBarTable from '@/components/stat-bar-table'
import { PokemonExtractor } from '@/extractors'
import { PokemonApi } from '@/services'
import { SmogonApi } from '@/services/SmogonApi'
import {
  FlatPokemonSet,
  InnerAnalysis,
  InnerPokemonSet,
  MinimalSetAnalysis,
  TransformedPokemon,
} from '@/types'
import { extractParts, findPokemonAnalysis, findPokemonSets } from '@/utils/smogon.utils'

import { AbilityAndType } from './_components/AbilityAndType'
import { CommentsSection, OverviewSection, PokemonImage, SetSection } from './_components'

const getPokemonData = async (pokemonName: string) => {
  const response = await PokemonApi.getByName(pokemonName)
  return PokemonExtractor(response)
}

const getMinifiedData = (pokemonData: TransformedPokemon, generation: number) => {
  const { abilities, spriteCollection, stats, types } = pokemonData

  const sprite = spriteCollection.find(
    obj => obj.generation === `Generation ${generation}`,
  )?.frontSprite

  return { abilities, stats, types, sprite }
}

const getFormatAnalyses = async (formatCode: string) => {
  const response = await SmogonApi.getAnalysis(formatCode)
  return response
}

const getFormatSets = async (formatCode: string) => {
  const response = await SmogonApi.getSets(formatCode)
  return response
}

interface SetsType {
  [key: string]: InnerPokemonSet
}

const combineSetData = (pokemonData: InnerAnalysis | null, setsData: SetsType | null) => {
  // Detailed explanation of all sets, obtained from analysis endpoint
  const setDescriptions: Array<MinimalSetAnalysis> = pokemonData
    ? Object.entries(pokemonData.sets).map(([key, value]) => ({
        set: key,
        description: value.description,
      }))
    : []

  // Technical information of the sets, obtained from set endpoint
  const setDetails: Array<FlatPokemonSet> = setsData
    ? Object.entries(setsData).map(([key, value]) => ({
        set: key,
        ...value,
      }))
    : []

  // Now combine the two arrays
  return setDescriptions.map(obj1 => {
    const foundObj = setDetails.find(obj2 => obj2.set === obj1.set) as FlatPokemonSet
    return { ...obj1, ...foundObj }
  })
}

interface PokemonAnalysisParams {
  params: {
    formatCode: string
    pokemon: string
  }
}

const PokemonAnalysis: NextPage<PokemonAnalysisParams> = async ({
  params: { pokemon, formatCode },
}) => {
  const { format, generation } = extractParts(formatCode)

  const [analysisData, setsData, extractedPokemonData] = await Promise.all([
    getFormatAnalyses(formatCode),
    getFormatSets(formatCode),
    getPokemonData(pokemon),
  ])

  if (!analysisData || !setsData) {
    return <div>Format not found</div>
  }

  // Data from the actual pokemon api.
  const { abilities, sprite, stats, types } = getMinifiedData(extractedPokemonData, generation)

  const pokemonData = findPokemonAnalysis(analysisData, pokemon)
  const setData = findPokemonSets(setsData, pokemon)

  const overview = pokemonData?.overview
  const comments = pokemonData?.comments

  const finalSetsData = combineSetData(pokemonData, setData)

  return (
    <main>
      <PageTitle>
        {pokemon} - Gen {generation} {format.toUpperCase()}
      </PageTitle>
      <div className="grid items-center gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-[auto,0.5fr,1fr]">
        <PokemonImage pokemonName={pokemon} source={sprite} />
        <AbilityAndType abilities={abilities} types={types} generation={generation} />
        <div className="overflow-x-auto *:overflow-hidden sm:col-span-2 lg:col-span-1">
          <StatBarTable stats={stats} showMinMax={false} />
        </div>
      </div>
      <div className="smogon-analysis max-w-4xl space-y-2">
        <OverviewSection overview={overview} />
        {finalSetsData.map(set => (
          <SetSection
            key={set.set}
            set={set.set}
            ability={set.ability}
            description={set.description}
            evs={set.evs}
            item={set.item}
            nature={set.nature}
            moves={set.moves}
          />
        ))}
        <CommentsSection comment={comments} />
      </div>
    </main>
  )
}

export default PokemonAnalysis
