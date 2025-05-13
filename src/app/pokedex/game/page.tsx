import React, { Suspense } from 'react'
import { NextPage } from 'next'

import Loader from '@/components/loader'
import { PageTitle } from '@/components/ui/Title'
import { GameApi } from '@/services'
import { groupGamesByGeneration } from '@/utils/games.utils'

import GenerationGamesSection from './_components'

const getGameNames = async () => {
  const versionGroupNameData = await GameApi.getGames()
  return versionGroupNameData.map(game => game.name)
}

const PokedexPage: NextPage<{}> = async () => {
  const versionGroupNames = await getGameNames()

  const properData = groupGamesByGeneration(versionGroupNames)

  return (
    <main>
      <PageTitle> In-game Pokédexes</PageTitle>
      <Suspense fallback={<Loader />}>
        <section className="grid gap-y-4">
          {properData.map(({ generation, versionGroups }) => (
            <GenerationGamesSection
              key={generation}
              generationString={generation}
              versionGroups={versionGroups}
            />
          ))}
        </section>
      </Suspense>
    </main>
  )
}

export default PokedexPage
