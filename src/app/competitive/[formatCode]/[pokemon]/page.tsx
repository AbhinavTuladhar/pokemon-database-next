import React from 'react'
import { NextPage } from 'next'

import { PageTitle } from '@/components/containers'
import { SmogonApi } from '@/services/SmogonApi'
import { FlatPokemonSet, InnerAnalysis, InnerPokemonSet, MinimalSetAnalysis } from '@/types'
import { extractParts, findPokemonAnalysis, findPokemonSets } from '@/utils/smogon.utils'

import { CommentsSection, OverviewSection, SetSection } from './_components'

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
  const [analysisData, setsData] = await Promise.all([
    getFormatAnalyses(formatCode),
    getFormatSets(formatCode),
  ])

  if (!analysisData || !setsData) {
    return <div>Format not found</div>
  }

  const pokemonData = findPokemonAnalysis(analysisData, pokemon)
  const setData = findPokemonSets(setsData, pokemon)
  const { format, generation } = extractParts(formatCode)

  const overview = pokemonData?.overview
  const comments = pokemonData?.comments

  const finalSetsData = combineSetData(pokemonData, setData)

  return (
    <main>
      <PageTitle>
        {pokemon} - Gen {generation} {format.toUpperCase()}
      </PageTitle>
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
        <pre>{JSON.stringify(finalSetsData, null, 2)}</pre>
      </div>
    </main>
  )
}

export default PokemonAnalysis
