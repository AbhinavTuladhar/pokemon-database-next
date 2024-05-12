import React from 'react'

import { PageTitle } from '@/components/containers'
import GrowthRateExtractor from '@/extractors/GrowthRateExtractor'
import { GrowthRateApi } from '@/services'

import { ComparisonChart, GrowthRateSection } from './_components'

const getGrowthRateData = async () => {
  const response = await GrowthRateApi.getAllData()
  return response.map(GrowthRateExtractor)
}

const page = async () => {
  const data = await getGrowthRateData()

  const levelData = data.map(({ name, levels }) => ({
    growthRate: name,
    levelData: levels,
  }))

  const cumulativeLevelData = data.map(({ name, levelsCumulative }) => ({
    growthRate: name,
    levelData: levelsCumulative,
  }))

  return (
    <main>
      <PageTitle> Pokémon growth rates </PageTitle>
      <div>
        <ComparisonChart data={levelData} title="Experience required for each level" />
        <ComparisonChart data={cumulativeLevelData} title="Experience required for each level" />
      </div>
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
