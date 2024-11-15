import React from 'react'
import { Metadata } from 'next'

import { PageTitle } from '@/components/containers'
import { GrowthRateExtractor } from '@/extractors'
import { GrowthRateApi } from '@/services'

import { ComparisonChart, GrowthRateSection } from './_components'

export const metadata: Metadata = {
  title: 'Pokémon Growth Rates | Pokémon Database',
}

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

  const cumulativeLevelData = data.map(({ name, individualLevels }) => ({
    growthRate: name,
    levelData: individualLevels,
  }))

  return (
    <main>
      <PageTitle> Pokémon growth rates </PageTitle>
      <div>
        <ComparisonChart
          data={levelData}
          title="Experience required to reach each level"
          subTitle="A graph of the experience required for a Pokémon to be a certain level, colour-coded by experience types. "
        />
        <ComparisonChart
          data={cumulativeLevelData}
          title="Experience required for each level"
          subTitle="Graph showing experience needed to gain a single level, for each level up to 100."
        />
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
