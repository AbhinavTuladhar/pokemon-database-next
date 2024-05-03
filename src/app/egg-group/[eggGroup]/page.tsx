import React, { FC, Suspense } from 'react'
import { Metadata } from 'next'

import { PageTitle, SectionTitle } from '@/components/containers'
import { PokemonTableSkeleton } from '@/components/skeletons'
import EggGroupExtractor from '@/extractors/EggGroupExtractor'
import { EggGroupApi } from '@/services/EggGroupApi'
import formatName from '@/utils/formatName'
import { getResourceId } from '@/utils/urlUtils'

import { GroupList, PokemonTable } from './_components'

interface PageProps {
  params: {
    eggGroup: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { eggGroup } = params
  return {
    title: `${formatName(eggGroup)} egg group | Pokémon Database`,
  }
}

const getEggGroupData = async (name: string) => {
  const response = await EggGroupApi.getByName(name)
  return EggGroupExtractor(response)
}

const EggPage: FC<PageProps> = async ({ params: { eggGroup } }) => {
  const data = await getEggGroupData(eggGroup)

  const speciesIds = data.pokemonSpecies.map(species => {
    const { url } = species
    return Number(getResourceId(url))
  })

  return (
    <main>
      <PageTitle>
        <span> {formatName(eggGroup)} </span>
        <span className="text-gray-400"> (egg group) </span>
      </PageTitle>
      <div className="flex flex-wrap gap-x-8">
        <div className="w-full lg:w-1/3">
          <GroupList />
        </div>
        <Suspense fallback={<PokemonTableSkeleton />}>
          <div className="mt-0 w-full overflow-x-auto lg:-mt-5 lg:w-auto">
            <SectionTitle> The Pokémon </SectionTitle>
            <div className="flex justify-center">
              <PokemonTable eggGroup={eggGroup} speciesIds={speciesIds} />
            </div>
          </div>
        </Suspense>
      </div>
    </main>
  )
}

export default EggPage
