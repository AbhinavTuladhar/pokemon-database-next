import React, { FC, Suspense } from 'react'

import SectionTitle from '@/components/containers/SectionTitle'
import PokemonTableSkeleton from '@/components/Suspense/PokemonTableSkeleton'
import EggGroupExtractor from '@/extractors/EggGroupExtractor'
import { EggGroupApi } from '@/services/EggGroupApi'
import formatName from '@/utils/formatName'

import GroupList from './_components/GroupList'
import PokemonTable from './_components/PokemonTable'

interface PageProps {
  params: {
    eggGroup: string
  }
}

const getEggGroupData = async (name: string) => {
  const response = await EggGroupApi.get(name)
  return EggGroupExtractor(response)
}

const EggPage: FC<PageProps> = async ({ params: { eggGroup } }) => {
  const data = await getEggGroupData(eggGroup)

  const speciesUrls = data.pokemonSpecies.map((species) => species.url)

  return (
    <main>
      <h1 className="my-4 text-center text-5xl font-bold">
        <span> {formatName(eggGroup)} </span>
        <span className="text-gray-600"> (egg group) </span>
      </h1>
      <div className="flex flex-wrap gap-x-8">
        <div className="w-full lg:w-1/3">
          <GroupList />
        </div>
        <div className="mt-0 w-full overflow-x-auto lg:-mt-5 lg:w-auto">
          <Suspense fallback={<PokemonTableSkeleton />}>
            <SectionTitle> The Pokémon </SectionTitle>
            <div className="flex justify-center">
              <PokemonTable speciesUrls={speciesUrls} eggGroup={eggGroup} />
            </div>
          </Suspense>
        </div>
      </div>
    </main>
  )
}

export default EggPage
