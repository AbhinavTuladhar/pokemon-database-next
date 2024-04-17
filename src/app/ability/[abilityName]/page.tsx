import { FC, Suspense } from 'react'
import { Metadata } from 'next'

import PageTitle from '@/components/containers/PageTitle'
import SectionTitle from '@/components/containers/SectionTitle'
import Description from '@/components/dynamicRoutes/Description'
import OtherLanguages from '@/components/dynamicRoutes/OtherLanguages'
import PokemonTableSkeleton from '@/components/Suspense/PokemonTableSkeleton'
import AbilityExtractor from '@/extractors/AbilityExtractor'
import { AbilityApi } from '@/services/AbilityApi'
import formatName from '@/utils/formatName'

import AbilityDescription from './_components/AbilityDescriptions'
import PokemonTable from './_components/PokemonTable'

interface AbilityPageParams {
  params: {
    abilityName: string
  }
}

export async function generateMetadata({ params }: AbilityPageParams): Promise<Metadata> {
  const { abilityName } = params
  return {
    title: `${formatName(abilityName)} | Pokémon abilities | Pokémon Database`,
  }
}

const getAbilityData = async (name: string) => {
  const response = await AbilityApi.getByName(name)
  return AbilityExtractor(response)
}

const AbilityDetail: FC<AbilityPageParams> = async ({ params: { abilityName } }) => {
  const { descriptions, longEntry, name, pokemon, names } = await getAbilityData(abilityName)

  return (
    <main>
      <PageTitle>
        <span>{formatName(abilityName)}</span>
        <span className="text-gray-400"> (ability) </span>
      </PageTitle>
      <div className="grid grid-cols-1 gap-x-20 gap-y-4 lg:grid-cols-2">
        <div>
          <Description entry={longEntry} />
          <AbilityDescription descriptions={descriptions} />
          <OtherLanguages names={names} />
        </div>
        <div>
          <SectionTitle> Pokémon with {formatName(abilityName)} </SectionTitle>
          <Suspense fallback={<PokemonTableSkeleton />}>
            <div className="flex w-full justify-center lg:justify-stretch">
              <PokemonTable abilityName={name} pokemonList={pokemon} />
            </div>
          </Suspense>
        </div>
      </div>
    </main>
  )
}

export default AbilityDetail
