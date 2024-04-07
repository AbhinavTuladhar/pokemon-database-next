import { FC, Suspense } from 'react'
import { Metadata } from 'next'

import SectionTitle from '@/components/containers/SectionTitle'
import PokemonTableSkeleton from '@/components/Suspense/PokemonTableSkeleton'
import AbilityExtractor from '@/extractors/AbilityExtractor'
import { AbilityApi } from '@/services/AbilityApi'
import formatName from '@/utils/formatName'

import AbilityDescription from './_components/AbilityDescriptions'
import AbilityEffect from './_components/AbilityEffect'
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
  const { descriptions, longEntry, name, pokemon } = await getAbilityData(abilityName)

  return (
    <main>
      <h1 className="mt-4 text-center text-5xl font-bold">{formatName(abilityName)} (ability)</h1>
      <div className="grid grid-cols-1 gap-x-20 gap-y-4 lg:grid-cols-2">
        <div>
          <AbilityEffect entry={longEntry} />
          <AbilityDescription descriptions={descriptions} />
        </div>
        <div className="w-full lg:w-auto">
          <SectionTitle> Pokémon with {formatName(abilityName)} </SectionTitle>
          <div className="flex justify-center">
            <Suspense fallback={<PokemonTableSkeleton />}>
              <PokemonTable abilityName={name} pokemonList={pokemon} />
            </Suspense>
          </div>
        </div>
      </div>
    </main>
  )
}

export default AbilityDetail
