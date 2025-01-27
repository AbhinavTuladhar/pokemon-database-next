import React from 'react'
import { NextPage } from 'next'

import { PageTitle } from '@/components/containers'
import { SmogonApi } from '@/services/SmogonApi'
import { findPokemonAnalysis } from '@/utils/smogon.utils'

const getFormatAnalyses = async (formatCode: string) => {
  const response = await SmogonApi.getAnalysis(formatCode)
  return response
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
  const data = await getFormatAnalyses(formatCode)

  if (!data) {
    return <div>Format not found</div>
  }

  const pokemonData = findPokemonAnalysis(data, pokemon)

  return (
    <div>
      <PageTitle> {pokemon} Analysis</PageTitle>
      <pre>{JSON.stringify(pokemonData, null, 2)}</pre>
    </div>
  )
}

export default PokemonAnalysis
