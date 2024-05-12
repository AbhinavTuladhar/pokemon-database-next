import React from 'react'

import { PageTitle } from '@/components/containers'
import GrowthRateExtractor from '@/extractors/GrowthRateExtractor'
import { GrowthRateApi } from '@/services'

import { GrowthRateSection } from './_components'

const getGrowthRateData = async () => {
  const response = await GrowthRateApi.getAllData()
  return response.map(GrowthRateExtractor)
}

const page = async () => {
  const data = await getGrowthRateData()

  return (
    <main>
      <PageTitle> Pokémon growth rates </PageTitle>
      <div className="space-y-4">
        {data.map(entry => (
          <GrowthRateSection
            formula={entry.formula}
            name={entry.name}
            pokemonNames={entry.pokemonSpecies}
            key={entry.name}
          />
        ))}
      </div>
    </main>
  )
}

export default page
