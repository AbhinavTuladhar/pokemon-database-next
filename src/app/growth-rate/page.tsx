import React from 'react'
import { Metadata } from 'next'

import { PageTitle, SectionTitle } from '@/components/ui/Title'
import GrowthRateService from '@/features/pokemon/services/growth-rate.service'
import { transformGrowthRate } from '@/features/pokemon/transformers/transform-growth-rate'

import { ComparisonChart, GrowthRateSection } from './_components'

export const metadata: Metadata = {
  title: 'Pokémon Growth Rates | Pokémon Database',
}

const getGrowthRateData = async () => {
  const response = await GrowthRateService.getAllData()
  return response.map(transformGrowthRate)
}

const page = async () => {
  const data = await getGrowthRateData()

  const levelData = data.map(({ name, levels }) => ({
    growthRate: name,
    levelData: [{ experience: 0, level: 0 }].concat(levels),
  }))

  const cumulativeLevelData = data.map(({ name, individualLevels }) => ({
    growthRate: name,
    levelData: [{ experience: 0, level: 0 }].concat(individualLevels),
  }))

  return (
    <>
      <PageTitle> Pokémon growth rates </PageTitle>
      <div className="space-y-4 lg:space-y-8">
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
      <SectionTitle> Growth Rate Formulae and Pokémon </SectionTitle>
      <div className="space-y-4 lg:space-y-8">
        {data.map(entry => (
          <GrowthRateSection
            formula={entry.formula}
            name={entry.name}
            pokemonNames={entry.pokemonSpecies}
            key={entry.name}
          />
        ))}
      </div>
    </>
  )
}

export default page
